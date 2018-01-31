import React, {Component} from 'react';
import {Container} from 'reactstrap';
import Header from './Header.js';
import Main from './Main.js';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Container>
          <Header/>
          <Main/>
        </Container>
      </div>
    );
  }
}
