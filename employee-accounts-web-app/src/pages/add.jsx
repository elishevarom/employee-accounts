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
  const [formData, setFormData] = useState(initialFormData);
  const [create, setCreate] = useState('No Employee Added');
  const [responseMessage, setResponseMessage] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    setIsSubmitted(true); // Indicate that form has been submitted

    updateList();

    setResponseMessage({});
    const params = {
      method: 'POST',
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
        setResponseMessage('Error in creating Employee');
      });
  };

  const updateList = () => {
    if (formData.firstName !== "" && formData.lastName !== "" && formData.email !== "" && formData.phone !== "" && formData.address !== "" && formData.city !== "" && formData.state !== "" && formData.zip !== "" && formData.position !== "") {
      const newEmployee = `${formData.firstName} ${formData.lastName}, ${formData.email}, ${formData.phone}, ${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}, ${formData.position}`;
      setFormData(initialFormData);

      setCreate(formData.firstName + ' ' + formData.lastName + 'has been added to the system.');
    } else {
      setValidated(false);
      setCreate('No Employee Added, field(s) missing');
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 add-background-image">
      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        <Card className='border-secondary border-2 bg-primary p-4' style={{ width: '100%', maxWidth: '900px' }}>
          <h1 className='text-light fs-0'>add an employee</h1>
          <Form className='mx-auto p-2' noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="my-3">
              <Form.Group as={Col} md="6" controlId="firstName">
                <Form.Label className='text-light fs-5'>First name</Form.Label>
                <Form.Control
                  className='bg-primary border-secondary text-light'
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">Please enter a first name.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="lastName">
                <Form.Label className='text-light fs-5'>Last name</Form.Label>
                <Form.Control
                  className='bg-primary border-secondary text-light'
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">Please enter a last name.</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="my-3">
              <Form.Group as={Col} md="4" controlId="email">
                <Form.Label className='text-light fs-5'>Email</Form.Label>
                <Form.Control
                  className='bg-primary border-secondary text-light'
                  type="text"
                  placeholder="johndoe@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">Please enter an email address.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="phone">
                <Form.Label className='text-light fs-5'>Phone number</Form.Label>
                <Form.Control
                  className='bg-primary border-secondary text-light'
                  type="text"
                  placeholder="123-456-7890"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">Please enter a phone number.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="position">
                <Form.Label className='text-light fs-5'>Position</Form.Label>
                <Form.Control
                  className='bg-primary border-secondary text-light'
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
                <Form.Label className='text-light fs-5'>Address</Form.Label>
                <Form.Control
                  className='bg-primary border-secondary text-light'
                  type="text"
                  placeholder="123 North Street"
                  value={formData.address}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">Please enter a street address.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="3" controlId="city">
                <Form.Label className='text-light fs-5'>City</Form.Label>
                <Form.Control
                  className='bg-primary border-secondary text-light'
                  type="text"
                  placeholder="Baltimore"
                  value={formData.city}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">Please enter a city.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="2" controlId="state">
                <Form.Label className='text-light fs-5'>State</Form.Label>
                <Form.Control
                  className='bg-primary border-secondary text-light'
                  type="text"
                  placeholder="MD"
                  value={formData.state}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">Please enter a state.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="2" controlId="zip">
                <Form.Label className='text-light fs-5'>Zip</Form.Label>
                <Form.Control
                  className='bg-primary border-secondary text-light'
                  type="text"
                  placeholder="21215"
                  value={formData.zip}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">Please enter a zip code.</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Button className="bg-light text-primary my-4 w-100" type="submit">Submit Employee Information</Button>

            {isSubmitted && (
              <Row className="my-3">
                <Col>
                  <Alert variant="primary">{create}</Alert>
                </Col>
              </Row>
            )}
          </Form>
        </Card>
      </div>
    </div>
  );
}
