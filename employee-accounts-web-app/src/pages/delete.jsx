// import './delete.css';
import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';


export const Delete = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);

  const fetchData = async () => {
    try {
      // Replace 'https://api.example.com/employees' with your actual API endpoint that fetches data from DynamoDB
      const response = await fetch('https://zx814esxf6.execute-api.us-east-1.amazonaws.com/default/getAllEmployeeAccounts');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      // Assuming data is an array of employee objects from DynamoDB
      const formattedEmployees = data.map(emp => ({
        id: emp.pk, // Assuming pk is the primary key or unique identifier for each employee
        firstName: emp['First Name'], // Accessing attributes using bracket notation due to spaces in attribute names
        lastName: emp.pk,
        position: emp.Position,
        location: `${emp.Address} ${emp.City}, ${emp.State} ${emp.Zip}`,
        phone: emp.Phone,
        email: emp.Email,
        isOpen: false // Initialize isOpen for accordion state
      }));
      setEmployees(formattedEmployees); // Update state with fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error state or logging
    }
  };

  // const removeEmployee = (id) => {
  //   const updatedEmployees = employees.filter((emp) => emp.id !== id);
  //   setEmployees(updatedEmployees);
  // };

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
      isOpen: emp.id === id ? !emp.isOpen : emp.isOpen
    }));
    setEmployees(updatedEmployees);
  };

  const handleConfirmation = (e, employeeId, employeeFN, employeeLN) => {
    e.preventDefault();
    const answer = window.confirm(`Are you sure you would like to delete ${employeeFN} ${employeeLN} from the system?`);
    if (answer) {
      removeEmployee(employeeId); // Remove the employee from the state
    } else {
      console.log('Deletion canceled.');
    }
  };

  return (
    <div className="background-image">
      <Alert style={{ boxShadow: '0 30px 20px 10px #152235', borderRadius: '0', backgroundColor: 'white', borderTop: '5px solid', borderBottom: '5px solid', color: '#5D9D67', borderColor: '#5D9D67', opacity: '90%' }}>
        <h1 style={{ opacity: "100%", textShadow: '1px 1px 2px #152235', fontSize: '40px', fontWeight: 'bold', fontFamily: 'Times-New-Roman', letterSpacing: '100px', textTransform: 'uppercase' }}>Delete An Employee Account</h1>
      </Alert>

      <Container>
        {employees.map((employee) => (
          <Col key={employee.id} style={{ margin: '20px' }}>
            <Row style={{ margin: '10px' }}>
              <Accordion activeKey={employee.isOpen ? '0' : undefined}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header className="accordion-header" onClick={() => toggleAccordion(employee.id)}>
                    {employee.lastName + ', ' + employee.firstName}
                  </Accordion.Header>
                  <Accordion.Body>
                    <ul style={{ listStyleType: 'none' }}>
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
                        <Row style={{ paddingTop: '20px' }}>
                          <Button
                            type="button"
                            // style={{ backgroundColor: '#152235', color: 'white', borderColor: '#152235' }}
                            onClick={(e) => handleConfirmation(e, employee.id, employee.firstName, employee.lastName)}
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
