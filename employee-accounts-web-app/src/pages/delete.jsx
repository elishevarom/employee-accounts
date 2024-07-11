import './delete.css';
import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
const initialEmployees = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    position: 'UX Designer',
    location: 'Baltimore',
    phone: '1234567890',
    email: 'jdoe@gmail.com'
  },
  {
    id: 2,
    firstName: 'Sam',
    lastName: 'Smith',
    position: 'IT',
    location: 'Baltimore',
    phone: '4102345678',
    email: 'ssmith@gmail.com'
  }
];
export function Delete() {
  const [employees, setEmployees] = useState(initialEmployees.map(emp => ({
    ...emp,
    isOpen: false  // New state to manage accordion open/close state
  })));
  const removeEmployee = (id) => {
    const updatedEmployees = employees.filter((emp) => emp.id !== id);
    setEmployees(updatedEmployees);
  };
  const toggleAccordion = (id) => {
    const updatedEmployees = employees.map((emp) => ({
      ...emp,
      isOpen: emp.id === id ? !emp.isOpen : emp.isOpen
    }));
    setEmployees(updatedEmployees);
  };
  return (
    <div className="background-image">
    <Alert style={{boxShadow: '0 30px 20px 10px #152235', borderRadius: '0', backgroundColor: 'white',borderTop: '5px solid',borderBottom: '5px solid',color: '#5D9D67', borderColor: '#5D9D67', opacity: '90%'}}>
        <h1 style={{opacity:"100%", textShadow: '1px 1px 2px #152235', fontSize: '40px', fontWeight: 'bold',  fontFamily: 'Times-New-Roman', letterSpacing: '100 px', textTransform: 'uppercase'}}>Delete An Employee Account</h1>
    </Alert>
    
    <Container>
      {employees.map((employee) => (
        <Col key={employee.id} style={{ margin: '20px' }}>
          <Row style={{ margin: '10px' }}>
            <Accordion  activeKey={employee.isOpen ? '0' : undefined}>
              <Accordion.Item eventKey="0">
                <Accordion.Header className="accordion-header" onClick={() => toggleAccordion(employee.id)}>
                  {employee.lastName + ', ' + employee.firstName}
                </Accordion.Header>
                <Accordion.Body>
                  <ul style={{listStyleType: 'none'}}>
                    <li>
                      <Row>
                        <Col>
                          <h6>First Name:</h6>
                          {employee.firstName}
                        </Col>
                        <Col>
                          <h6>Last Name:</h6>
                          {employee.lastName}
                        </Col>
                        <Col>
                          <h6>Location:</h6>
                          {employee.location}
                        </Col>
                        <Col>
                          <h6>Position:</h6>
                          {employee.position}
                        </Col>
                        <Col>
                          <h6>Phone:</h6>
                          {employee.phone}
                        </Col>
                        <Col>
                          <h6>Email:</h6>
                          {employee.email}
                        </Col>
                      </Row>
                      <Row style={{ padding: '30px' }}>
                        <Button
                          type="button" style={{backgroundColor: '#152235', color: 'white', borderColor: '#152235', marginBottom: '-30px'}}
                          onClick={() => removeEmployee(employee.id)}
                        >
                          Delete Employee Profile
                        </Button>
                      </Row>
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Row>
        </Col>
      ))}
    </Container>
    </div>
  );
}
export default Delete;
