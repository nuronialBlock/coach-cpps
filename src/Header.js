import React, {Component} from 'react';
import {connect} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import {
  Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink,
} from 'reactstrap';

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  render() {
    return (
      <div>
        <h1 className='text-center'> CPPS </h1>
        <Nav tabs>
          <NavItem>
            <LinkContainer to='/coach'>
              <NavLink>Dashboard</NavLink>
            </LinkContainer>
          </NavItem>

          {/* Tools */}
          <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle nav caret>
              Tools
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Who Solved It?</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <NavItem className="ml-auto">
            <NavLink>{this.props.user.username}</NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
