import React, { Component } from 'react';
import {
    Table,
    ButtonToolbar,
    Button
    } from 'react-bootstrap';

export default class Data extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export class Data  = (props) => (
    <tr>
        <td>{ props.value[2] }</td>
        <td>{ props.value[0] }</td>
        <td>{ props.value[1] }</td>
        <td>
            <ButtonToolbar>
                <Button href="http://localhost:8080/">Enter</Button>
                <Button 
                    href={ props.value[3] }
                    onClick={  }
                >Delete</Button>
            </ButtonToolbar>
        </td>
     </tr>
)
