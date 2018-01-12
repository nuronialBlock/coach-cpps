import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class Students extends Component {
    constructor(props){
        super(props);
        // this.state = {
        //     showStudents : this.props.showStudents,
        //     studentsList: this.props.studentsList,
        // }
        this.DataHTML = this.DataHTML.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
    }

    DataHTML(){
        const data = this.props.studentsList;
        if (data === undefined || data === null) {
            return
        }
        let tabulatedStudentsList = data.map(id => <p><b> { id } </b></p >); 
        return tabulatedStudentsList;
    }

    toggleShow(){
        this.props.onShow();
    }

    render() {
        return (
            
                <Modal show={this.props.showModal}>
                    <Modal.Header>
                        <Modal.Title>Students</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        { this.DataHTML() }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.toggleShow}>Close</Button>
                    </Modal.Footer>
                </Modal>
            
        );
    }
}

export default Students;