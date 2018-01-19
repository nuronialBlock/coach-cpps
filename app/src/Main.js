import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import Dashboard from './components/dashboard/Dashboard';

import ClassroomContainer from './components/classroom/ClassroomContainer.js';
import AddClassroom from './components/classroom/AddClassroom.js';
import AddStudent from './components/classroom/AddStudent.js';
import DeleteClass from './components/classroom/DeleteClass.js';

export default class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/coach' component={Dashboard}/>
          <Route exact path='/coach/addClassroom' component={AddClassroom}/>

          <Route exact path='/classroom/:classId'
            component={ClassroomContainer}/>
          <Route exact path='/classroom/:classId/addStudent'
            component={AddStudent}/>
          <Route exact path='/classroom/:classId/deleteClass'
            component={DeleteClass}/>
        </Switch>
      </main>
    );
  }
}
