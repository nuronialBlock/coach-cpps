import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Navbar,
  ButtonToolbar,
  Button
  } from 'react-bootstrap';
import axios from 'axios';

import Landing from "./Landing";
import AddClassroom from './AddClassroom';

const classroute = "/api/v1/classrooms";


function CustomNavBar(props) {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          {props.value}
        </Navbar.Brand>
      </Navbar.Header>
    </Navbar>
  );
}
  

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      showClassModal: false
    };
    this.deleteClass = this.deleteClass.bind(this);
    this.addClassroom = this.addClassroom.bind(this);
    this.getData = this.getData.bind(this);
    this.showClassroomModal = this.showClassroomModal.bind(this);
  }

  async addClassroom(e){
    let students = new Array();
    students = e.students.split(',')
    let data = {
      name : e.className,
      students
    };
    let resp = await fetch(classroute, {
      method: 'POST',
      body: JSON.stringify(data), 
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      credentials: 'same-origin'
    });
    data = await this.getData();
    this.setState({
      data
    })
  }

  showClassroomModal() {
    let show = this.state.showClassModal;
    this.setState({
      showClassModal: !show
    });
  }

  async getData() {
    let resp = await fetch(classroute, {
      method: 'get',
      headers: {'Content-Type': 'application/json'},
      credentials: 'same-origin'
    });
    try {
      const data = await resp.json();  
      if (data === undefined || data === null) {
        return null
      }
      return data.data;    
    } catch (error) {
      console.log(error);
    }
  }
  
  async componentDidMount(){
    let data = await this.getData();
    this.setState({
      data
    })
  }

  async deleteClass(id) {
    let url = `${classroute}/${id}`
    await fetch( url, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      credentials: 'same-origin'
    })
    let data = await this.getData();
    this.setState({
      data
    })
  }
  
  render() {
    return (
      <div> 
        <CustomNavBar value={"Coach Dashboard"} />
        <Grid>
          <ButtonToolbar>
            <Button 
              onClick = { this.showClassroomModal }
              > ADD Class
            </Button>
            <AddClassroom 
              showModal={ this.state.showClassModal }
              onShow={ this.showClassroomModal }
              onSave={ this.addClassroom }
            />
          </ButtonToolbar>

          <Row>
            <Col>
                  <Landing 
                    classData={ this.state.data }
                    onDelete= { this.deleteClass }
                  />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}