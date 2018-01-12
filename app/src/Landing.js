import React, { Component } from 'react';
import {
    Table,
    ButtonToolbar,
    Button
    } from 'react-bootstrap';

const classroute = "api/v1/classroom";

class Landing extends Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     dataLanding : [],
        // };
        // this.delButton = this.delButton.bind(this)
        this.handleDelete = this.handleDelete.bind(this);
        this.DataHTML = this.DataHTML.bind(this);
        this.landingDataRepresentation = this.landingDataRepresentation.bind(this);
    }

    handleDelete(e){
        this.props.onDelete(e);
    }

    DataHTML(data) {
        return (
            <tr>
            <td>{ data[2] }</td>
            <td>{ data[0] }</td>
            <td>{ data[1] }</td>
            <td>
                <ButtonToolbar>
                    <Button href="http://localhost:8080/">Enter</Button>
                    <Button onClick={ () => this.handleDelete(data[1]) }>Delete</Button>
                </ButtonToolbar>
            </td>
         </tr>
        );
    }

    landingDataRepresentation(data) {
        // console.log("here is the data:" + data);
        if (data === null || data === undefined) {
            return null
        }
        let rows = [];
        for (let i = 0; i < data.length; i++) {
            const obj = data[i];
            const element = [ obj.name, obj._id];
            element.push(i+1)
            let dataX = this.DataHTML(element)
            rows.push(dataX);
        }
        return rows;
    }

    render() {
        return (
            <div>
                <Table class="table table-hover" hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Classroom</th>
                            <th>Class ID</th>
                        </tr>
                    </thead>
                    <tbody>  
                        { this.landingDataRepresentation(this.props.classData) }  
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Landing;