import React from 'react';
import {
    Table, Row, Col, UncontrolledDropdown, DropdownToggle, DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';

/** Setting List */

async function applyRating(contestId) {
  try {
    const api = `/api/v1/ratings/apply/contest/${contestId}`;
    let resp = await fetch(api, {
      method: 'PUT',
      credentials: 'same-origin',
    });
    resp = await resp.json();
    if (resp.status !== 200) throw resp;
    alert('Successfully updated ratings');
  } catch (err) {
    if (err.status) alert(err.message);
    console.log(err);
  }
}

function SettingsList({contestId, deleteStandings}) {
  return (
    <UncontrolledDropdown>
     <DropdownToggle className='fa fa-lg fa-cog' color='light'></DropdownToggle>
     <DropdownMenu>

      <DropdownItem>
         <div className='btn btn-block btn-primary'
           onClick={()=>applyRating(contestId)}>
           Apply Rating </div>
      </DropdownItem>

      <DropdownItem>
         <div className='btn btn-block btn-danger'
           onClick={()=>deleteStandings(contestId)}>
           Delete Standings</div>
      </DropdownItem>

      {/* <LinkContainer to={`/classroom/${classId}/contest/add-contest`}>
        <DropdownItem>
           <Button color='danger' className='btn-block'>
            Rollback Rating </Button>
        </DropdownItem>
      </LinkContainer> */}

     </DropdownMenu>
   </UncontrolledDropdown>
 );
}

SettingsList.propTypes = {
  contestId: PropTypes.string.isRequired,
  deleteStandings: PropTypes.func.isRequired,
};

/** Standings List */

function SingleContest(props) {
  const {contestId, data, deleteStandings} = props;
  let tabulatedContestList = data.map((s, ind) => (
    <tr key={s._id}>
      <td>{s.position}</td>
      <td>{s.username}</td>
      <td>{s.previousRating}</td>
      <td>{s.newRating}</td>
    </tr>
  ));
  return (
    <div className='text-center'>
      <Row>
        <Col>
          <h1>Contest Details</h1>
        </Col>
        <Col className='text-right'>
          <SettingsList
            contestId={contestId} deleteStandings={deleteStandings}
          />
        </Col>
      </Row>
      <Table>
        <thead>
          <tr>
            <th> Position </th>
            <th> Username </th>
            <th> Previous Rating </th>
            <th> New Rating </th>
          </tr>
        </thead>
        <tbody>
          { tabulatedContestList }
        </tbody>
      </Table>
    </div>
  );
}

SingleContest.propTypes = {
  classId: PropTypes.string.isRequired,
  contestId: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    previousRating: PropTypes.number.isRequired,
    newRating: PropTypes.number.isRequired,
  })).isRequired,
  deleteStandings: PropTypes.func.isRequired,
};

export default SingleContest;
