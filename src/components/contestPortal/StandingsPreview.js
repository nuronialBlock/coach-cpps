import React, {Component} from 'react';
import {Table, Modal, ModalHeader, ModalBody, ModalFooter,
Button} from 'reactstrap';
import PropTypes from 'prop-types';
import qs from 'qs';
import {asyncUsernameToUserId} from 'components/utility/index';
import {getNewRatings} from 'codeforces-rating-system';

export default class StandingsPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      standings: [],
      rawData: [],
    };
    this.formatStandings = this.formatStandings.bind(this);
  }

  async componentWillReceiveProps(nextProps) {
    const {rawData, classId} = nextProps;
    if (this.state.rawData === rawData) return;

    let standings = rawData.split('\n').filter((x)=> x);

    standings = await Promise.all(standings.map(async (s) => {
      const arr = s.split(',').map((x) => x.trim());
      const position = parseInt(arr[0], 10);
      const username = arr[1];
      let userId;
      let previousRating;
      try {
        userId = await asyncUsernameToUserId(username);
        const ratingApiQs = qs.stringify({
          classroomId: classId,
          userId,
        });
        const ratingApi = `/api/v1/ratings?${ratingApiQs}`;
        let resp = await fetch(ratingApi, {
          credentials: 'same-origin',
        });
        resp = await resp.json();
        if (resp.status === 200 || resp.status === 202) {
          previousRating = resp.data.currentRating;
        } else throw resp;
      } catch (err) {
        console.log(err);
      }
      if (previousRating === -1) previousRating = 1500;
      return {position, username, userId, previousRating};
    }));

    standings = getNewRatings(standings);
    this.setState({standings, rawData});
  }

  formatStandings() {
    const standings = this.state.standings;
    const tr = standings.map((s)=>{
      return (
        <tr key={s.username}>
          <td>{s.position}</td>
          <td>{s.username}</td>
          <td>{s.userId}</td>
          <td>{s.newRating}</td>
          <td>{s.previousRating}</td>
          <td>{s.delta}</td>
        </tr>
      );
    });
    return (
      <Table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Username</th>
            <th>UserId</th>
            <th>New Rating</th>
            <th>Previous Rating</th>
            <th>Delta</th>
          </tr>
        </thead>
        <tbody>
          {tr}
        </tbody>
      </Table>
    );
  }

  render() {
    const {modalState, toggle, createContest} = this.props;
    return (
      <Modal isOpen={modalState} toggle={toggle} className='modal-lg'>
        <ModalHeader>Standings Preview</ModalHeader>
        <ModalBody style={{
          overflowX: 'auto',
        }}>{this.formatStandings()}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={()=>{
            createContest(this.state.standings);
          }}>
            Insert Contest</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}
StandingsPreview.propTypes = {
  modalState: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  rawData: PropTypes.string.isRequired,
  classId: PropTypes.string.isRequired,
  createContest: PropTypes.func.isRequired,
};
