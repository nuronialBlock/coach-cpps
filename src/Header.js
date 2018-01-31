import React, {Component} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {
  Container,
  Navbar,
  NavbarBrand,
} from 'reactstrap';
import PropTypes from 'prop-types';

export default class Header extends Component {
  render() {
    return (
      <Navbar color='faded' light>
        <Container>
          <LinkContainer to='/coach'>
            <NavbarBrand>{this.props.title}</NavbarBrand>
          </LinkContainer>
        </Container>
      </Navbar>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
