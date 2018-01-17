import React, {Component} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {
  Row,
  Col,
  ButtonToolbar,
  Button,
} from 'reactstrap';
import {asyncUsernameToUserId} from './utility.js';

import Landing from './Landing';

const classroute = '/api/v1/classrooms';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.addNewStudent = this.addNewStudent.bind(this);
    this.deleteClass = this.deleteClass.bind(this);
    this.getData = this.getData.bind(this);
    this.refreshData = this.refreshData.bind(this);
  }

  async addNewStudent(data) {
    const id = await asyncUsernameToUserId(data.student);
    const url = `/api/v1/classrooms/${data.classId}/students`;
    const body = {
      student: id,
    };
    try {
      let resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        credentials: 'same-origin',
      });
      resp = await resp.json();
      if ( resp.status !== 201 ) {
        throw resp;
      }
      await this.refreshData();
    } catch (err) {
      console.log(err);
    }
  }

  async getData() {
    let resp = await fetch(classroute, {
      method: 'get',
      headers: {'Content-Type': 'application/json'},
      credentials: 'same-origin',
    });
    try {
      const data = await resp.json();
      if (data === undefined || data === null) {
        return null;
      }
      if (data.status !== 200) {
        throw data;
      }
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidMount() {
    await this.refreshData();
  }

  async refreshData() {
    let data = await this.getData();
    this.setState({
      data,
    });
  }

  async deleteClass(id) {
    let url = `${classroute}/${id}`;
    await fetch( url, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      credentials: 'same-origin',
    });
    await this.refreshData();
  }

  render() {
    return (
      <div>
        <ButtonToolbar>
          <LinkContainer to='/coach/addClassroom'>
            <Button color='primary'>ADD Class</Button>
          </LinkContainer>
        </ButtonToolbar>

        <Row>
          <Col>
            <Landing
              onAddStudent={this.addNewStudent}
              classData={this.state.data}
              onDelete= {this.deleteClass}
              refreshData= {this.refreshData}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
