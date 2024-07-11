import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import React, { useState, useEffect } from 'react';
// import { Collapse } from 'bootstrap';



export function Home() {
   
    return(
        <>

        <Alert>
            <h1>Welcome to Employee Accounts</h1>
 
        </Alert>
        
        
        <Container>
        <div className="row">

        <Row>

            <Col>
            <Card style={{ width: '100%', height: '95%', margin: '10px', padding: '30px'}}>
                <div background='primary'>
                    <Card.Img variant="top" src="https://img.icons8.com/?size=100&id=60953&format=png&color=000000" width="50%"/>
                </div>
            
                <div style={{background:'dark'}}>
                <Card.Body>
                <Card.Title>Add</Card.Title>
                <Card.Text>
                    Add a new employee's profile to the system.
                </Card.Text>
                <a href="add">
                <Button class="mt-auto btn btn-primary" variant="primary">Select</Button>   
                </a>
                </Card.Body>
                </div>
            </Card>
            </Col>

            <Col>
            <Card style={{ width: '100%', height: '95%', margin: '10px', padding: '30px'}}>
            <Card.Img variant="top" src="https://img.icons8.com/?size=100&id=7695&format=png&color=000000" />
                <Card.Body>
                    <Card.Title>Retrieve</Card.Title>
                    <Card.Text>
                        View an existing employee's profile.

                    </Card.Text>
                    <a href="retrieve">
                    <Button class="mt-auto btn btn-primary" variant="primary">Select</Button>   
                    </a>
                </Card.Body>
               </Card>
            </Col>

            <Col>
            <Card style={{ width: '100%', height: '95%', margin: '10px', padding: '30px'}}>
            <Card.Img variant="top" src="https://img.icons8.com/?size=100&id=35635&format=png&color=000000" />
            <Card.Body>
                <Card.Title>Update</Card.Title>
                <Card.Text>
                    Update an existing employee's profile.
                </Card.Text>
                <a href="update">
                <Button class="mt-auto" variant="primary">Select</Button>   
                </a>
            </Card.Body>
            </Card>
            </Col>

            <Col>
            <Card style={{ width: '100%', height: '95%', margin: '10px', padding: '30px'}}>
                    <Card.Img variant="top" src="https://img.icons8.com/?size=100&id=67884&format=png&color=000000" />
                    <Card.Body>
                        <Card.Title>Delete</Card.Title>
                        <Card.Text>
                            Delete an existing employee's profile.
                        </Card.Text>
                        <a href="delete">
                        <Button variant="primary">Select</Button>   
                        </a>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        </div>

        </Container>


      </>
)}


