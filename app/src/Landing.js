import React, { Component } from 'react';
import {
    Table,
    ButtonToolbar,
    Button
    } from 'react-bootstrap';
  

const dataLanding = [["ClassRoom1", "Slug1", "Uni1"], ["ClassRoom2", "Slug2", "Uni2"], ["ClassRoom3", "Slug3", "Uni3"]];

export const DataHTML = (props) => (
    <tr>
        <td>{ props.value[3] }</td>
        <td>{ props.value[0] }</td>
        <td>{ props.value[1] }</td>
        <td>{ props.value[2] }</td>
        <td>
            <ButtonToolbar>
                <Button href="http://localhost:3001">Enter</Button>
                <Button>Delete</Button>
            </ButtonToolbar>
        </td>
     </tr>
)


function landingDataRepresentation(data) {
    let rows = [];
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        element.push(i+1)

        rows.push(<DataHTML value={element} />);
    }
    return rows;
}


class Landing extends Component {
    render() {
        return (
            <div>
                <Table class="table table-hover" hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Classroom</th>
                            <th>Slug</th>
                            <th>University</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>  
                        { landingDataRepresentation(dataLanding) }  
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Landing;