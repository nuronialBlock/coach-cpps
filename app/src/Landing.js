import React, { Component } from 'react';
import {
    Table,
    ButtonToolbar,
    Button
    } from 'react-bootstrap';
  
export const DataHTML = (props) => (
    <tr>
        <td>{ props.value[2] }</td>
        <td>{ props.value[0] }</td>
        <td>{ props.value[1] }</td>
        <td>
            <ButtonToolbar>
                <Button href="http://localhost:8080/">Enter</Button>
                <Button href={ props.value[3] }>Delete</Button>
            </ButtonToolbar>
        </td>
     </tr>
)


function landingDataRepresentation(data) {
    console.log("here is the data:" + data);
    if (data === null) {
        return null
    }
    let rows = [];
    for (let i = 0; i < data.length; i++) {
        const obj = data[i];
        const element = [ obj.name, obj._id];
        let delURL = `https://localhost:8080/api/v1/classroom/${obj._id}`
        element.push(i+1)
        element.push(delURL)

        rows.push(<DataHTML value={ element } />);
    }
    return rows;
}


class Landing extends Component {
    // constructor(props) {
    //     super(props);
        
    //     // this.state = {
    //     //     dataLanding : [],
    //     // };
    // }
    // componentWillReceiveProps(){
    //     this.state = {
    //        dataLanding: this.props.classData,
    //     }
    // }
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
                        { landingDataRepresentation(this.props.classData) }  
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Landing;