import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export function Retrieve() {
  const [employees, setEmployees] = useState([]);
  const [currentView, setCurrentView] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('https://zx814esxf6.execute-api.us-east-1.amazonaws.com/CORS-Enabled/getAllEmployeeAccounts');
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const data = await response.json();
        const formattedEmployees = data.map(emp => ({
          id: emp.pk,
          firstName: emp['First Name'],
          lastName: emp['Last Name'],
          position: emp.Position,
          location: `${emp.Address}\n${emp.City}, ${emp.State} ${emp.Zip}`,
          phone: emp.Phone,
          email: emp.Email
        }));

        formattedEmployees.sort((a, b) => {
          const lastNameComparison = a.lastName.localeCompare(b.lastName);
          if (lastNameComparison === 0) {
            return a.firstName.localeCompare(b.firstName);
          }
          return lastNameComparison;
        });

        setEmployees(formattedEmployees);
      } catch (error) {
        console.error('Error fetching employees:', error);
        // Handle error as needed
      }
    };

    fetchEmployees();
  }, []);

  const updateEmployee = (option) => {
    setCurrentView(option);
  };

  const formattedLocation = currentView ? currentView.location.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  )) : '';

  const showFirstName = () => currentView ? currentView.firstName : '';
  const showLastName = () => currentView ? currentView.lastName : '';
  const showEmail = () => currentView ? currentView.email : '';
  const showPhone = () => currentView ? currentView.phone : '';
  const showPosition = () => currentView ? currentView.position : '';

  return (
    <>
      <div className='retrieve-background-image overflow-auto'>
        <h2 className='mt-5 fs-0 text-light pt-5'>VIEW EMPLOYEE ACCOUNT</h2>
        <DropdownButton variant='light' id="dropdown-employees" title="Select an Employee" className="m-4">
          {employees.map((option) => (
            <Dropdown.Item key={option.id} onClick={() => updateEmployee(option)}>
              {option.lastName}, {option.firstName}
            </Dropdown.Item>
          ))}
        </DropdownButton>

        <div className='d-flex justify-content-center align-items-center mt-10'>
        <Card className='border-secondary border-2 bg-info text-light mb-5' style={{ width: '100%', maxWidth: '800px', height: '100%' }}>
        <Card.Body className="d-flex p-0">
              <Row className='g-0 flex-fill'>
              <Col md={6} className="bg-secondary text-light d-flex flex-column justify-content-center align-items-center p-5" style={{ height: '100%', borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px'}}>
              <FontAwesomeIcon icon={faUser} size="10x" className='text-primary' />
                </Col>
                <Col md={6} className={`d-flex flex-column justify-content-center p-3 bg-primary`} style={{ height: '100%', borderTopRightRadius: '5px', borderBottomRightRadius: '5px' }}>
                <div>
                    <h1 className='text-start m-2 p-2 fs-1 text-info'>{currentView ? 'Employee Account' : 'PLEASE SELECT AN EMPLOYEE ABOVE'}</h1>
                    {currentView && (
                      <>
                        <h2 className='text-start fw-semibold mt-3 ms-3 fs-5'>First Name</h2>
                        <p className='text-start text-info ms-3 mb-4 fs-5'>{showFirstName()}</p>

                        <h2 className='text-start fw-semibold mt-3 ms-3 fs-5'>Last Name</h2>
                        <p className='text-start text-info ms-3 mb-4 fs-5'>{showLastName()}</p>

                        <h2 className='text-start fw-semibold mt-3 ms-3 fs-5'>Email</h2>
                        <p className='text-start text-info ms-3 mb-4 fs-5'>{showEmail()}</p>

                        <h2 className='text-start fw-semibold mt-3 ms-3 fs-5'>Phone</h2>
                        <p className='text-start text-info ms-3 mb-4 fs-5'>{showPhone()}</p>

                        <h2 className='text-start fw-semibold mt-3 ms-3 fs-5'>Position</h2>
                        <p className='text-start text-info ms-3 mb-4 fs-5'>{showPosition()}</p>

                        <h2 className='text-start fw-semibold mt-3 ms-3 fs-5'>Address</h2>
                        <p className='text-start text-info ms-3 fs-5'>{formattedLocation}</p>
                      </>
                    )}
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}
