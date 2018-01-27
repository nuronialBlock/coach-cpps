import React, {Component} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import PropTypes from 'prop-types';
import StandingsPreview from './StandingsPreview';

class AddContest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classId: this.props.match.params.classId,
      contestName: '',
      contestUrl: '',
      contestStandings: '1, forthright48\n2, aminul',
      verified: false,
      modal: false,
      rawData: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.createContest = this.createContest.bind(this);
  }

  async createContest(standings) {
    const data = {
      name: this.state.contestName,
      link: this.state.contestUrl,
      classroomId: this.state.classId,
      standings,
    };
    try {
      const api = '/api/v1/contests';
      let resp = await fetch(api, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
        credentials: 'same-origin',
      });
      resp = await resp.json();
      if (resp.status !== 201) throw resp;
    } catch (err) {
      console.log(err);
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      rawData: this.state.contestStandings,
    });
    this.toggle();
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    return (
      <div>
        <h1>Add Contest</h1>

        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label>Contest Name</Label>
            <Input
              name='contestName'
              placeholder='Contest Name'
              onChange={ this.handleInputChange }
            />
          </FormGroup>
          <FormGroup>
            <Label>Contest Url</Label>
            <Input
              type='url'
              name='contestUrl'
              placeholder='Contest Url'
              onChange={ this.handleInputChange }
            />
          </FormGroup>
          <FormGroup>
            <Label>Contest Standings</Label>
            <Input
              type='textarea'
              name='contestStandings'
              onChange={ this.handleInputChange }
              placeholder='position, username'
              value={this.state.contestStandings}
            />
          </FormGroup>
          <Button color='primary' type='submit'>Preview</Button>
          <LinkContainer to={`/classroom/${this.state.classId}`}>
            <Button className='ml-1'> Cancel</Button>
          </LinkContainer>
        </Form>

        <StandingsPreview
          modalState={this.state.modal}
          toggle={this.toggle}
          rawData={this.state.rawData}
          classId={this.state.classId}
          createContest={this.createContest}
        />
      </div>
    );
  }
}

AddContest.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      classId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default AddContest;
