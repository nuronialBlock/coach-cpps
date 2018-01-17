import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Dashboard from './Dashboard';

import ClassroomContainer from './components/classroom/ClassroomContainer.js';
import AddClassroom from './components/classroom/AddClassroom.js';

export default class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/coach' component={Dashboard}/>
          <Route exact path='/coach/addClassroom' component={AddClassroom}/>

          <Route path='/classroom/:classId' component={ClassroomContainer}/>
        </Switch>
      </main>
    );
  }
}
