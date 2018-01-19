import React, {Component} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Row, Col, ButtonToolbar, Button} from 'reactstrap';

import Landing from './Landing';

const classroute = '/api/v1/classrooms';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.deleteClass = this.deleteClass.bind(this);
    this.getData = this.getData.bind(this);
    this.refreshData = this.refreshData.bind(this);
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
