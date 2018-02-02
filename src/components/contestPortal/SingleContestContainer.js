import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SingleContest from './SingleContest.js';

class SingleContestContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [], // Array of standings
    };

    this.deleteStandings = this.deleteStandings.bind(this);
  }

  async deleteStandings(contestId) {
    try {
      const api = `/api/v1/contests/${contestId}`;
      let resp = await fetch(api, {
        method: 'DELETE',
        credentials: 'same-origin',
      });
      resp = await resp.json();
      if (resp.status !== 200) throw resp;
      alert('All standings have been removed');
      this.setState({data: []});
    } catch (err) {
      if (err.status) alert(err.message);
      console.log(err);
    }
  }

  async componentWillMount() {
    const {contestId} = this.props.match.params;
    try {
      let resp = await fetch(`/api/v1/standings?contestId=${contestId}`, {
        credentials: 'same-origin',
      });
      resp = await resp.json();

      if (resp.status !== 200) throw resp;
      this.setState({
        data: resp.data,
      });
    } catch (err) {
      if (err.status) alert(err.message);
      else console.log(err);
    }
  }

  render() {
    const {classId, contestId} = this.props.match.params;
    return (
      <SingleContest
        classId={classId}
        contestId={contestId}
        data={this.state.data}
        deleteStandings={this.deleteStandings}
      />
    );
  }
}

SingleContestContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      contestId: PropTypes.string.isRequired,
      classId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};


export default SingleContestContainer;
