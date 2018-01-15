import React, {Component} from 'react';
import {
  Navbar,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class Header extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            {this.props.title}
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
