import React, {Component} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Row, Col, ButtonToolbar, Button} from 'reactstrap';

import ClassroomList from './ClassroomList';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classDetails: [],
    };
  }

  async componentDidMount() {
    try {
      const api = '/api/v1/classrooms';
      let resp = await fetch(api, {
        method: 'get',
        headers: {'Content-Type': 'application/json'},
        credentials: 'same-origin',
      });
      resp = await resp.json();
      if (resp.status !== 200) {
        throw resp;
      }
      this.setState({
        classDetails: resp.data,
      });
      return;
    } catch (err) {
      if (err.status) alert(err.message);
      console.log(err);
      return;
    }
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
            <ClassroomList classrooms={this.state.classDetails}/>
          </Col>
        </Row>
      </div>
    );
  }
}
