
import React, { useState } from 'react';
import { Form, Row, Col, Button, Alert, Card } from 'react-bootstrap';

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  position: ''
};

export function Add() {
  const [validated, setValidated] = useState(false);
  const [list, setList] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [create, setCreate] = useState('No Employee Added');
  const [responseMessage, setResponseMessage] = useState();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    updateList();

    setResponseMessage({});
    const params = {
      method: 'POST',
      body: JSON.stringify({
          employeeID: (formData.zip).substring(3,4),
          lastName: formData.lastName,
          firstName: formData.firstName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          position: formData.position
      })
  };
  fetch('https://zx814esxf6.execute-api.us-east-1.amazonaws.com/CORS-Enabled/addAccount', params)
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      console.log(data)
      setResponseMessage('Employee created successfully' );
      console.log(responseMessage);
  })
  .catch(error => {

      setResponseMessage('Error in creating Employee' );
      console.log(responseMessage);
  });
  };

  const updateList = () => {
    if (formData.firstName !== "" && formData.lastName !== "" && formData.email !== "" && formData.phone !== "" && formData.address !== "" && formData.city !== "" && formData.state !== "" && formData.zip !== "" && formData.position !== "")
      {
        const newEmployee = `${formData.firstName} ${formData.lastName}, ${formData.email}, ${formData.phone}, ${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}, ${formData.position}`;
    setList([...list, newEmployee]);

    setFormData(initialFormData);

    setCreate('Employee Added');
      }
      else{
        setValidated(false)
        setCreate('No Employee Added, feild(s) missing');
      }
    
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="my-3">
        <Form.Group as={Col} md="6" controlId="firstName">
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Mark"
            value={formData.firstName}
            onChange={handleChange}
            
          />
          <Form.Control.Feedback type="invalid">Please enter a first name.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="lastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Otto"
            value={formData.lastName}
            onChange={handleChange}
            
          />
          <Form.Control.Feedback type="invalid">Please enter a last name.</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="my-3">
        <Form.Group as={Col} md="4" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="markotto@gmail.com"
            value={formData.email}
            onChange={handleChange}
            
          />
          <Form.Control.Feedback type="invalid">Please enter an email address.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="phone">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            type="text"
            placeholder="123-456-7890"
            value={formData.phone}
            onChange={handleChange}
            
          />
          <Form.Control.Feedback type="invalid">Please enter a phone number.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="position">
          <Form.Label>Position</Form.Label>
          <Form.Control
            type="text"
            placeholder="Manager"
            value={formData.position}
            onChange={handleChange}
            
          />
          <Form.Control.Feedback type="invalid">Please enter a position.</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="my-3">
        <Form.Group as={Col} md="5" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="123 North street"
            value={formData.address}
            onChange={handleChange}
            
          />
          <Form.Control.Feedback type="invalid">Please enter a street address.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Baltimore"
            value={formData.city}
            onChange={handleChange}
            
          />
          <Form.Control.Feedback type="invalid">Please enter a city.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="2" controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            placeholder="MD"
            value={formData.state}
            onChange={handleChange}
            
          />
          <Form.Control.Feedback type="invalid">Please enter a state.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="2" controlId="zip">
          <Form.Label>Zip</Form.Label>
          <Form.Control
            type="text"
            placeholder="21215"
            value={formData.zip}
            onChange={handleChange}
            
          />
          <Form.Control.Feedback type="invalid">Please enter a zip code.</Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Button type="submit">Submit Employee Information</Button>

      <Row className="my-3">
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
      <Row className="my-3">
        <Col>
          <Alert variant="primary">{create}</Alert>
        </Col>
      </Row>
    </Form>
  );
}
