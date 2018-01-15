import React, {Component} from 'react';
import {Grid} from 'react-bootstrap';
import Header from './Header.js';
import Main from './Main.js';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Header title='Coach Dashboard'/>
        <Grid>
          <Main/>
        </Grid>
      </div>
    );
  }
}
