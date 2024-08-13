import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import '../pages/styling.css';

export const Delete = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);


    const fetchData = async () => {
      try {
        const response = await fetch('https://zx814esxf6.execute-api.us-east-1.amazonaws.com/default/getAllEmployeeAccounts');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const formattedEmployees = data.map(emp => ({
          id: emp.pk,
          firstName: emp['First Name'],
          lastName: emp['Last Name'],
          position: emp.Position,
          location: (
            <div>
              {emp.Address}<br />
              {emp.City}, {emp.State} {emp.Zip}
            </div>
          ),
          phone: emp.Phone,
          email: emp.Email,
          isOpen: false
        }));
    
        // Sort employees alphabetically by last name, then by first name
        formattedEmployees.sort((a, b) => {
          const lastNameComparison = a.lastName.localeCompare(b.lastName);
          if (lastNameComparison === 0) {
            return a.firstName.localeCompare(b.firstName);
          }
          return lastNameComparison;
        });
    
        setEmployees(formattedEmployees);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error state or logging
      }
    };
    

  const removeEmployee = async (employeeId) => {
    try {
      const response = await fetch(`https://zx814esxf6.execute-api.us-east-1.amazonaws.com/CORS-Enabled/deleteAccount?EmployeeId=${employeeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }

      const updatedEmployees = employees.filter(emp => emp.id !== employeeId);
      setEmployees(updatedEmployees);

    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const toggleAccordion = (id) => {
    const updatedEmployees = employees.map((emp) => ({
      ...emp,
      isOpen: emp.id === id ? !emp.isOpen : false // Close all accordions except the one being toggled
    }));
    setEmployees(updatedEmployees);
  };

  const handleConfirmation = (e, employeeId, employeeFN, employeeLN) => {
    e.preventDefault();
    const answer = window.confirm(`Are you sure you would like to delete ${employeeFN} ${employeeLN} from the system?`);
    if (answer) {
      removeEmployee(employeeId);
    } else {
      console.log('Deletion canceled.');
    }
  };

  return (
    <div className="flex-column align-items-center justify-content-center overflow-auto min-vh-100 delete-background-image">
      <div className="text-center">
        <h1 className='m-5 fs-0 text-light pt-3'>DELETE EMPLOYEE ACCOUNT</h1>
        <Container>
          {employees
            .sort((a, b) => {
              const lastNameComparison = a.lastName.localeCompare(b.lastName);
              if (lastNameComparison === 0) {
                return a.firstName.localeCompare(b.firstName);
              }
              return lastNameComparison;
            })
            .map((employee) => (
              <Col key={employee.id} className="mb-3">
                <Row className='col-md-6'>
                  <Container>
                  <Accordion activeKey={employee.isOpen ? '0' : undefined}>
                    <Accordion.Item eventKey="0" style={{ width: '100%' }}>
                      <Accordion.Header
                        className="text-white rounded-5"
                        onClick={() => toggleAccordion(employee.id)}
                      >
                        {employee.lastName + ', ' + employee.firstName}
                      </Accordion.Header>
                      <Accordion.Body className='bg-primary'>
                        <ul className='text-start' style={{ listStyleType: 'none' }}>
                          <li>
                            <Col>
                              <Row className='mb-n1 text-light'>
                                <h6>First Name:</h6>
                              </Row>
                              <Row className='ms-0 mb-3 text-info'>
                                {employee.firstName}
                              </Row>
                              <Row className='mb-n1 text-light'>
                                <h6>Last Name:</h6>
                              </Row>
                              <Row className='ms-0 mb-3 text-info'>
                                {employee.lastName}
                              </Row>
                              <Row className='mb-n1 text-light'>
                                <h6>Phone:</h6>
                              </Row>
                              <Row className='ms-0 mb-3 text-info'>
                                {employee.phone}
                              </Row>
                              <Row className='mb-n1 text-light'>
                                <h6>Email:</h6>
                              </Row>
                              <Row className='ms-0 mb-3 text-info'>
                                {employee.email}
                              </Row>
                              <Row className='mb-n1 text-light'>
                                <h6>Position:</h6>
                              </Row>
                              <Row className='ms-0 mb-3 text-info'>
                                {employee.position}
                              </Row>
                              <Row className='mb-n1 text-light'>
                                <h6>Location:</h6>
                              </Row>
                              <Row className='ms-n1 mb-3 text-info'>
                                {employee.location}
                              </Row>
                            </Col>
                            <Col style={{ paddingTop: '20px' }}>
                              <Button
                                type="button"
                                style={{ backgroundColor: '#152235', color: 'white', borderColor: '#152235' }}
                                onClick={(e) => handleConfirmation(e, employee.id, employee.firstName, employee.lastName)}
                              >
                                Delete Employee Profile
                              </Button>
                            </Col>
                          </li>
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  </Container>
                </Row>
              </Col>
            ))}
        </Container>
      </div>
    </div>
  );
  
}

export default Delete;
