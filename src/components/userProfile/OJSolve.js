import React, {Component} from 'react';
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
    const {displayUser, updateOjStats} = this.props;
    const username = displayUser.username;

    try {
      this.setState({
        loading: true,
      });
      let resp = await fetch(`/api/v1/users/${username}/sync-solve-count`, {
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
    const {displayUser} = this.props;
    const ojSolve = displayUser.ojStats? (
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
                <td>{oj.userIds[0]}</td>
                <td>{oj.solveCount}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    ): (
      <span>Loading</span>
    );

    return (
      <div>
        <Row>
          <Col xs="2"></Col>
          <Col xs="8">
            <h4>Solve Count</h4>
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
};
