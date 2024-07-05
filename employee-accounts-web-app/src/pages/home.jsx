import './home.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import React, { useState, useEffect } from 'react';

export function Home() {
   
    return(
        <>
        <div className="background-image">

        <Alert style={{boxShadow: '0 30px 20px 10px #152235', borderRadius: '0', backgroundColor: 'white',borderTop: '5px solid',borderBottom: '5px solid',color: '#5D9D67', borderColor: '#5D9D67', opacity: '90%'}}>
            <h1 style={{opacity:"100%", textShadow: '1px 1px 2px #152235', fontSize: '40px', fontWeight: 'bold',  fontFamily: 'Times-New-Roman', letterSpacing: '100 px', textTransform: 'uppercase'}}>Welcome to Employee Accounts</h1>
        </Alert>
        
        
        <Container>
        <div className="row">

        <Row  style={{padding: '30px', height: '550px'}}>

            <Col>
            <Card style={{ width: '100%', height: '95%', margin: '10px', padding: '30px', backgroundColor: 'white', opacity: '90%', border: '5px solid', boxShadow: '1px 1px 20px white'}}>
                <div background='primary'>
                    <Card.Img variant="top" src="https://img.icons8.com/?size=100&id=60953&format=png&color=000000" width="50%" style={{paddingTop: "10%"}}/>
                </div>
            
                <div style={{background:'dark'}}>
                <Card.Body>
                <Card.Text>
                    Add a new employee's profile to the system.
                </Card.Text>
                <a href="add">
                <Button class="mt-auto btn btn-primary" variant="primary" style={{backgroundColor: '#152235', color: 'white', borderColor: '#152235', width: '90px'}}>Add</Button>   
                </a>
                </Card.Body>
                </div>
            </Card>
            </Col>

            <Col>
            <Card style={{ width: '100%', height: '95%', margin: '10px', padding: '30px', opacity: '90%', border: '5px solid', boxShadow: '1px 1px 20px white'}}>
            <Card.Img variant="top" src="https://img.icons8.com/?size=100&id=7695&format=png&color=000000" style={{paddingTop: "10%"}}/>
                <Card.Body>
                    <Card.Text>
                        View an existing employee's profile.

                    </Card.Text>
                    <a href="retrieve">
                    <Button class="mt-auto btn btn-primary" variant="primary" style={{backgroundColor: '#152235', color: 'white', borderColor: '#152235', width: '90px'}}>Retrieve</Button>   
                    </a>
                </Card.Body>
               </Card>
            </Col>

            <Col>
            <Card style={{ width: '100%', height: '95%', margin: '10px', padding: '30px', opacity: '90%', border: '5px solid', boxShadow: '1px 1px 20px white'}}>
            <Card.Img variant="top" src="https://img.icons8.com/?size=100&id=35635&format=png&color=000000" style={{paddingTop: "10%"}} />
            <Card.Body>
                <Card.Text>
                    Update an existing employee's profile.
                </Card.Text>
                <a href="update">
                <Button class="mt-auto btn btn-primary" variant="primary" style={{backgroundColor: '#152235', color: 'white', borderColor: '#152235', width: '90px'}}>Update</Button>   
                </a>
            </Card.Body>
            </Card>
            </Col>

            <Col>
            <Card style={{ width: '100%', height: '95%', margin: '10px', padding: '30px', opacity: '90%', border: '5px solid', boxShadow: '1px 1px 20px white'}}>
                    <Card.Img variant="top" src="https://img.icons8.com/?size=100&id=67884&format=png&color=000000"style={{paddingTop: "10%"}} />
                    <Card.Body>
                        <Card.Text>
                            Delete an existing employee's profile.
                        </Card.Text>
                        <a href="delete">
                        <Button class="mt-auto btn btn-primary" variant="primary" style={{backgroundColor: '#152235', color: 'white', borderColor: '#152235', width: '90px'}}>Delete</Button>   
                        </a>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <Row>
            <h1> </h1>
        </Row>
        </div>

        </Container>

        </div>
      </>
)}


