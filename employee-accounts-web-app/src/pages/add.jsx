import React, { useState, useEffect, useRef } from 'react';
import { Form, Row, Col, Button, Alert, Card } from 'react-bootstrap';
import { useLoadScript } from '@react-google-maps/api';

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

const libraries = ['places'];

export function Add() {
  const [validated, setValidated] = useState(false);
  const [list, setList] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [create, setCreate] = useState('No Employee Added');
  const [responseMessage, setResponseMessage] = useState('');
  const [address, setAddress] = useState('');
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'Your-API-key', // Replace with your API key
    libraries,
  });

  const inputRef = useRef();

  useEffect(() => {
    if (isLoaded) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['address'],
        fields: ['address_components', 'formatted_address'],
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.address_components) {
          const addressComponents = place.address_components;
          const streetNumber = addressComponents.find(component => component.types.includes('street_number'))?.long_name || '';
          const route = addressComponents.find(component => component.types.includes('route'))?.long_name || '';
          const formattedAddress = `${streetNumber} ${route}`;
          
          setAddress(formattedAddress);
          setFormData(prev => ({
            ...prev,
            address: formattedAddress,
            city: addressComponents.find(component => component.types.includes('locality'))?.long_name,
            state: addressComponents.find(component => component.types.includes('administrative_area_level_1'))?.short_name || '',
            zip: addressComponents.find(component => component.types.includes('postal_code'))?.long_name || ''
          }));
        }
      });
    }
  }, [isLoaded]);


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
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

    const params = {
      method: 'POST',
      //headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        employeeID: (formData.zip).substring(3, 4),
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
        console.log(data);
        setResponseMessage('Employee created successfully');
      })
      .catch(error => {
        console.error(error);
        setResponseMessage('Error in creating Employee');
      });
  };

  const updateList = () => {
    if (Object.values(formData).every(value => value !== "")) {
      const newEmployee = `${formData.firstName} ${formData.lastName}, ${formData.email}, ${formData.phone}, ${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}, ${formData.position}`;
      setList([...list, newEmployee]);
      setFormData(initialFormData);
      setCreate('Employee Added');
    } else {
      setValidated(false);
      setCreate('No Employee Added, field(s) missing');
    }
 
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="my-3">
        <Form.Group as={Col} md="6" controlId="firstName">
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleChange}
            
          />
          <Form.Control.Feedback type="invalid">Please enter a first name.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="lastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
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
            type="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={handleChange}
            
          />
          <Form.Control.Feedback type="invalid">Please enter an email address.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="phone">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            
          />
          <Form.Control.Feedback type="invalid">Please enter a phone number.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="position">
          <Form.Label>Position</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter employee's position"
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
            ref={inputRef}
            type="text"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
            
          />
          <Form.Control.Feedback type="invalid">Please enter a street address.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={formData.city}
            onChange={handleChange}
            
          />
          <Form.Control.Feedback type="invalid">Please enter a city.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="2" controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter state"
            value={formData.state}
            onChange={handleChange}
            
          />
          <Form.Control.Feedback type="invalid">Please enter a state.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="2" controlId="zip">
          <Form.Label>Zip</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter zip-code"
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

