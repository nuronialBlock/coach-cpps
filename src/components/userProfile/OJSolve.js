import React, {Component} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Row, Col, Table} from 'reactstrap';
import {PropTypes} from 'prop-types';
import Spinner from 'react-spinkit';

export class OJSolve extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  async updateSolveCount() {
    const {displayUser, updateOjStats, owner} = this.props;
    const username = displayUser.username;

    try {
      this.setState({
        loading: true,
      });
      let resp = await fetch(`/api/v1/users/${username}/sync-solve-count`, {
        method: 'PUT',
        credentials: 'same-origin',
      });
      resp = await resp.json();

      updateOjStats(resp.data);
    } catch (err) {
      if (err.status) alert(err.message);
      console.error(err);
    } finally {
      this.setState({
        loading: false,
      });
    }
  }
  render() {
    const {displayUser, owner} = this.props;
    const {username} = displayUser;
    const ojStats = displayUser.ojStats;
    const ojSolve = ojStats? (
      <Table>
        <thead>
          <tr>
            <th>Index</th>
            <th>OJ</th>
            <th>UID</th>
            <th>Solve</th>
          </tr>
        </thead>
        <tbody>
          {displayUser.ojStats.map((oj, index)=>{
            return (
              <tr key={oj._id}>
                <td>{index}</td>
                <td>{oj.ojname}</td>
                <td>{oj.userIds[0]?oj.userIds[0]:(
                  <div>
                    {
                      owner?
                      <LinkContainer to={`/users/profile/${username}/set-oj-username/${oj.ojname}`}>
                        <span className="btn-link">
                          Set Username
                        </span>
                      </LinkContainer>:
                      <span>Not Set</span>
                    }
                  </div>
                )}</td>
                <td>{oj.solveCount}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    ): (
      <span>Loading</span>
    );

    const totalSolve = ojStats?
      ojStats
        .map((oj)=>oj.solveCount?oj.solveCount:0)
        .reduce((total, current)=>{
          return total+current;
        }, 0):
      0;

    return (
      <div>
        <Row>
          <Col xs="2"></Col>
          <Col xs="8">
            <h4>Solve Count: {totalSolve}</h4>
          </Col>
          <Col xs="2">
            {
              this.state.loading?
              <Spinner name="circle"/>:
              <i className="fa fa-refresh btn" title="Sync All OJ"
                onClick={()=>this.updateSolveCount()}/>
            }
          </Col>
        </Row>
        {ojSolve}
      </div>
    );
  }
}

OJSolve.propTypes = {
  displayUser: PropTypes.shape(),
  updateOjStats: PropTypes.func.isRequired,
  owner: PropTypes.bool.isRequired,
};
