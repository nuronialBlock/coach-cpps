import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Navbar
  } from 'react-bootstrap';

import Landing from "./Landing";


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
    };
  }

  getData() {
    return {
      "status": 200,
      "data": [
          {
              "_id": "5a512051b9b5b1011ea37d78",
              "updatedAt": "2018-01-06T19:15:29.636Z",
              "createdAt": "2018-01-06T19:15:29.636Z",
              "name": "test1",
              "coach": "5a1ab54d82611e04f286ebc4",
              "__v": 0,
              "students": [
                  "5a202786eb57d50081a4f999",
                  "5a21d23f883d3e0016b5a9e4"
              ]
          },
          {
              "_id": "5a5120b1b9b5b1011ea37d79",
              "updatedAt": "2018-01-06T19:17:05.692Z",
              "createdAt": "2018-01-06T19:17:05.692Z",
              "name": "test2",
              "coach": "5a1ab54d82611e04f286ebc4",
              "__v": 0,
              "students": [
                  "5a336decec09d70015c8785e"
              ]
          }
      ]
    };
  }
  
  componentDidMount(){
    // fetch the response here.
    let resp = this.getData();
    this.setState({
      data: resp.data,
    })
  }
  
  render() {
    return (
      <div> 
        <CustomNavBar value={"Coach Dashboard"} />
        <Grid>
          <Row>
            <Col>
                  <Landing classData={ this.state.data } />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}