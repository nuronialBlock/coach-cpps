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

  import Classroom from "./Classroom";

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
  render() {
    return (
      <div> 
        <CustomNavBar value={"Coach Dashboard"} />
        <Grid>
          <Row>
            <Col>
              <Classroom />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}