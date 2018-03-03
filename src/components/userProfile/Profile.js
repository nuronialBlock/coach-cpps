import React from 'react';
import {Row, Col, ListGroup, ListGroupItem} from 'reactstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {PropTypes} from 'prop-types';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer,
} from 'recharts';

import {OJSolve} from './OJSolve.js';

function DrawRadarChart({userRootStats}) {
  if ( !userRootStats ) {
    return (
      <span>Loading</span>
    );
  }

  const children = userRootStats.children;
  const data = children.map((child)=>{
    const value = child.total? child.user/child.total: 0;
    return {
      subject: child.title,
      A: value,
    };
  });

  return (
    <ResponsiveContainer width='100%' aspect={4.0/3.0}>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis domain={[0, 1]}/>
        <Radar dataKey="A" stroke='#8884d8' fill='#8884d8'
          fillOpacity={0.6} />
        </RadarChart>
    </ResponsiveContainer>
  );
}

DrawRadarChart.propTypes = {
  userRootStats: PropTypes.shape(),
};

export function Profile({user, classrooms, displayUser, updateOjStats}) {
  const loadingInfo = displayUser.username === undefined;
  const owner = user.username === displayUser.username;
  const {userRootStats} = displayUser;

  const personalInfo = loadingInfo? <span>Loading</span>: (
    <ListGroup className="d-inline-flex">
      {
        owner?
        <ListGroupItem>
          <i className="fa fa-envelope"></i> {user.email}
        </ListGroupItem>: ''
      }
      <ListGroupItem>
        <i className="fa fa-user"></i> {displayUser.username}
      </ListGroupItem>
      {
        owner?
        <ListGroupItem>
          <i className="fa fa-key"></i> Change Password
        </ListGroupItem>: ''
      }
      <ListGroupItem>
        <i className="fa fa-users"></i> {
          displayUser.status[0].toUpperCase().slice(0, 1) +
          displayUser.status.slice(1)
        }
      </ListGroupItem>
    </ListGroup>
  );

  const classroomPortal = classrooms.length ? (
    <ListGroup className="d-inline-flex">
      {classrooms.map((val, index)=>{
        return (
          <LinkContainer to={`/classroom/${val._id}`} key={val._id}>
            <ListGroupItem className="btn-link">
              {`${val.coach.username}/${val.name}`}
            </ListGroupItem>
          </LinkContainer>
        );
      })}
    </ListGroup>):
    <span>Not enrolled in any class</span>;

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
        </Col>
        <Col className="text-center">
          <div>
            <h4>Classrooms</h4>
            {classroomPortal}
          </div>
        </Col>
        <Col className="text-center" xs={12}>
          <div>
            <h4>Overview</h4>
            <DrawRadarChart userRootStats={userRootStats}/>
          </div>
        </Col>
        <Col className="text-center">
          <OJSolve displayUser={displayUser} updateOjStats={updateOjStats}
            owner={owner}
          />
        </Col>
      </Row>
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.shape(),
  classrooms: PropTypes.arrayOf(PropTypes.shape()),
  displayUser: PropTypes.shape(),
  updateOjStats: PropTypes.func.isRequired,
};
