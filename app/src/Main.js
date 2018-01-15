import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Dashboard from './Dashboard';
import ClassroomContainer from './ClassroomContainer';

export default class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route path='/coach' component={Dashboard}/>
          <Route path='/classroom/:classId' component={ClassroomContainer}/>
        </Switch>
      </main>
    );
  }
}
