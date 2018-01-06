import React, { Component } from 'react';
import {
    Table,
    ButtonToolbar,
    Button
    } from 'react-bootstrap';

// Name Solved Tried Upsolve
const dataClassroom = [["Student1", "10", "12", "5"], ["Student2", "15", "20", "2"], ["Student3", "30", "40", "15"], ["Student4", "20", "22", "12"], ["Student5", "10", "12", "5"]];

export const DataHTML = (props) => (
    <tr>
        <td>{ props.value[4] }</td>
        <td>{ props.value[0] }</td>
        <td>{ props.value[1] }</td>
        <td>{ props.value[2] }</td>
        <td>{ props.value[3] }</td>
        <td>
            <ButtonToolbar>
                <Button href="http://localhost:3002">Stats</Button>
                <Button>Delete</Button>
            </ButtonToolbar>
        </td>
     </tr>
)


function classroomDataRepresentation(data) {
    let rows = [];
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        element.push(i+1)

        rows.push(<DataHTML value={element} />);
    }
    return rows;
}


class Classroom extends Component {
    render() {
        return (
            <div>
                <h3> Leaderboard </h3>
                <hr />
                <Table class="table table-hover" hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Solved</th>
                            <th>Tried</th>
                            <th>Upsolve</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>  
                        { classroomDataRepresentation(dataClassroom) }  
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Classroom;