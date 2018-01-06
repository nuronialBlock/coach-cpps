import React, { Component } from 'react';
import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis, 
    CartesianGrid, 
    Tooltip
} from 'recharts';

import {
    Grid,
    Row,
    Col
} from 'react-bootstrap';
  

const dataRadar = [
    { subject: 'Number Theory', A: 120, B: 110, fullMark: 150 },
    { subject: 'Geometry', A: 98, B: 130, fullMark: 150 },
    { subject: 'Graph', A: 86, B: 130, fullMark: 150 },
    { subject: 'DS', A: 99, B: 100, fullMark: 150 },
    { subject: 'DP', A: 85, B: 90, fullMark: 150 },
    { subject: 'String', A: 65, B: 85, fullMark: 150 },
];

const dataBar = [
    {name: 'NumThr', Taranga: 4000, Team_Mate: 2400, amt: 2400},
    {name: 'Geometry', Taranga: 3000, Team_Mate: 1398, amt: 2210},
    {name: 'Graph', Taranga: 2000, Team_Mate: 9800, amt: 2290},
    {name: 'DS', Taranga: 2780, Team_Mate: 3908, amt: 2000},
    {name: 'DP', Taranga: 1890, Team_Mate: 4800, amt: 2181},
    {name: 'String', Taranga: 2390, Team_Mate: 3800, amt: 2500},
];

class Stat extends Component {
    render() {
        return (
            <div>
                <Grid>
                    <h3>Taranga's Stat</h3>
                    <hr/>    
                </Grid>
                
                <Grid >
                    <Row>
                    <Col md={4}>
                            <BarChart width={600} height={300} data={dataBar}
                                        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Tooltip/>
                                <Legend />
                                <Bar dataKey="Taranga" fill="#8884d8" />
                                <Bar dataKey="Team_Mate" fill="#82ca9d" />
                            </BarChart>
                        </Col>
                        <Col md={2}></Col>
                        <Col md={4}>
                            <RadarChart outerRadius={90} width={730} height={250} data={dataRadar}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="subject" />
                                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                                <Radar name="Taranga" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                <Radar name="Class Avg." dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                                <Legend />
                            </RadarChart>
                        </Col>
                    </Row>
                </Grid >
            </div>
        );
    }
}

export default Stat;