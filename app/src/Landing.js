import React, { Component } from 'react';
import {
    Table,
    ButtonToolbar,
    Button
    } from 'react-bootstrap';
import Students from './Students';

const classroute = "api/v1/classroom";

class Landing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showStudents : false,
            students: []
        };
        
        this.handleShowStudents = this.handleShowStudents.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.DataHTML = this.DataHTML.bind(this);
        this.landingDataRepresentation = this.landingDataRepresentation.bind(this);
    }

    handleDelete(e){
        this.props.onDelete(e);
    }
    
    handleShowStudents(students){
        this.setState({
            students,
            showStudents: !this.state.showStudents
        });
    }

    DataHTML(data) {
        return (
            <tr>
            <td>{ data[2] }</td>
            <td>{ data[0] }</td>
            <td>{ data[1] }</td>
            <td>
                <ButtonToolbar>
                    <Button onClick={ () => this.handleShowStudents(data[3]) }>Enter</Button>
                    <Button onClick={ () => this.handleDelete(data[1]) }>Delete</Button>
                </ButtonToolbar>
            </td>
         </tr>
        );
    }

    landingDataRepresentation(data) {
        if (data === null || data === undefined) {
            return null
        }
        let rows = [];
        for (let i = 0; i < data.length; i++) {
            const obj = data[i];
            const element = [ obj.name, obj._id];
            element.push(i+1);
            element.push(obj.students);
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
                        <Students
                            onShow={ this.handleShowStudents }
                            showModal={ this.state.showStudents }
                            studentsList= { this.state.students }
                        />
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Landing;