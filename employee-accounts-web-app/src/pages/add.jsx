
import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';

export function Add() {
  const [validated, setValidated] = useState(false);
  const [list, setList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [position, setPosition] = useState('');
  const [create, setCreate] = useState('No Employee Added');

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault(); // Prevent default form submission

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    if (form.checkValidity()) {
      updateList();
    }
  };

  const updateList = () => {
    const newEmployee = `${firstName} ${lastName}, ${email}, ${phone}, ${address}, ${city}, ${state} ${zip}, ${position}`;
    setList([...list, newEmployee]);

    // Reset form fields and feedback
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setCity('');
    setState('');
    setZip('');
    setPosition('');

    setCreate('Employee Added');
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="my-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            
            type="text"
            placeholder="Mark"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">Please enter a first name.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            
            type="text"
            placeholder="Otto"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">Please enter a last name.</Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="5" controlId="validationCustom03">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="1234 North Street"
            
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">Please provide a valid street address.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Baltimore"
            
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">Please provide a valid city.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="2" controlId="validationCustom05">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            placeholder="MD"
            
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">Please provide a valid state.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="2" controlId="validationCustom06">
          <Form.Label>Zip</Form.Label>
          <Form.Control
            type="text"
            placeholder="21215"
            
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">Please provide a valid zip code.</Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom07">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            type="text"
            placeholder="012-345-6789"
            
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">Please provide a valid phone number.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom08">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="markotto@gmail.com"
            
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">Please provide a valid email address.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom09">
          <Form.Label>Position</Form.Label>
          <Form.Control
            type="text"
            placeholder="Manager"
            
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">Please provide the employee's position.</Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Button type="submit">Submit Employee Information</Button>

      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Employee List</Card.Title>
              {list.map((employee, index) => (
                <Card.Text key={index}>{employee}</Card.Text>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Alert variant="primary">{create}</Alert>
        </Col>
      </Row>
    </Form>
  );
}



