import React from 'react';
import {Row, Col, ListGroup, ListGroupItem, Table} from 'reactstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {PropTypes} from 'prop-types';

export function Profile({user, classrooms, displayUser}) {
  const loadingInfo = displayUser.username === undefined;
  const owner = user.username === displayUser.username;

  const personalInfo = loadingInfo? <span>Loading</span>: (
    <div>
      <ListGroup className="d-inline-flex">
        {
          owner?
          <ListGroupItem>
            <i className="fa fa-envelope"></i> {user.email}
          </ListGroupItem>:
          <span></span>
        }
        <ListGroupItem>
          <i className="fa fa-user"></i> {displayUser.username}
        </ListGroupItem>
        <ListGroupItem>
          <i className="fa fa-key"></i> Change Password
        </ListGroupItem>
        <ListGroupItem>
          <i className="fa fa-users"></i> {
            displayUser.status[0].toUpperCase().slice(0, 1) +
            displayUser.status.slice(1)
          }
        </ListGroupItem>
      </ListGroup>
    </div>
  );

  const classroomPortal = classrooms.length ? (
    <ListGroup>
      {classrooms.map((val, index)=>{
        return (
          <LinkContainer to={`/classroom/${val._id}`} key={val._id}>
            <ListGroupItem>
              {`${val.coach.username}/${val.name}`}
            </ListGroupItem>
          </LinkContainer>
        );
      })}
    </ListGroup>):
    <span>Not enrolled in any class</span>;

  const ojSolve = displayUser.ojStats? (
    <Table>
      <thead>
        <tr>
          <th>Index</th>
          <th>OJ</th>
          <th>UID</th>
          <th>Solve</th>
        </tr>
      </thead>
      <tbody>
        {displayUser.ojStats.map((oj, index)=>{
          return (
            <tr key={oj._id}>
              <td>{index}</td>
              <td>{oj.ojname}</td>
              <td>{oj.userIds[0]}</td>
              <td>{oj.solveCount}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  ): (
    <span>Loading</span>
  );

  return (
    <div>
      <div className="text-center">
        <h3> Profile Page </h3>
      </div>
      <Row className="align-items justify-content-center">
        <Col className="text-center">
          <div>
            <h4>Personal Info</h4>
            {personalInfo}
          </div>
          <div className="mt-2">
            <h4>Classrooms</h4>
            {classroomPortal}
          </div>
        </Col>
        <Col className="text-center">
          <Row>
            <Col xs="2"></Col>
            <Col xs="8">
              <h4>Solve Count</h4>
            </Col>
            <Col xs="2">
              <i className="fa fa-refresh" title="Sync All OJ"></i>
            </Col>
          </Row>
          {ojSolve}
        </Col>
      </Row>
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.shape(),
  classrooms: PropTypes.arrayOf(PropTypes.shape()),
  displayUser: PropTypes.shape(),
};
