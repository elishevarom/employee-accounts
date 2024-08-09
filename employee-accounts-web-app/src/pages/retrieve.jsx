import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export function Retrieve() {
  const [employees, setEmployees] = useState([]);
  const [currentView, setCurrentView] = useState(null); // Initialized as null

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
          location: `${emp.Address} ${emp.City}, ${emp.State} ${emp.Zip}`,
          phone: emp.Phone,
          email: emp.Email
        }));
        
        // Sort employees by last name, then by first name
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

  const showFirstName = () => currentView ? `${currentView.firstName}` : '';
  const showLastName = () => currentView ? `${currentView.lastName}` : '';
  const showEmail = () => currentView ? `${currentView.email}` : '';
  const showPhone = () => currentView ? `${currentView.phone}` : '';
  const showPosition = () => currentView ? `${currentView.position}` : '';
  const showLocation = () => currentView ? `${currentView.location}` : '';

  return (
    <>
      <div className='retrieve-background-image overflow-auto'>
        <h2 className='mt-5 fs-0 text-light mt-5 pt-3'>VIEW EMPLOYEE ACCOUNT</h2>
        <DropdownButton variant='light' id="dropdown-employees" title="Select an Employee" className="m-5">
          {employees.map((option) => (
            <Dropdown.Item key={option.id} onClick={() => updateEmployee(option)}>
              {option.lastName}, {option.firstName}
            </Dropdown.Item>
          ))}
        </DropdownButton>

        <div className='d-flex justify-content-center align-items-center mt-10'>
          <Card className='border-secondary bg-secondary text-light' style={{ width: '100%', maxWidth: '800px', height: '400px' }}>
            <Card.Body className="d-flex p-0 ">
              <Row className='g-0 flex-fill'>
                <Col md={6} className="bg-secondary text-light d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                  <FontAwesomeIcon icon={faUser} size="10x" className='text-primary' />
                </Col>
                <Col md={6} className="bg-primary text-light d-flex flex-column justify-content-center p-3" style={{ height: '100%' }}>
                  <div>
                    <h1 className='text-start m-2 p-2 fs-1'>{currentView ? `employee account` : 'PLEASE SELECT AN EMPLOYEE ABOVE'}</h1>
                    <h2 className='text-start fw-semibold mt-3 ms-3 fs-5'>{currentView ? 'First Name' : ''}</h2>
                    <p className='text-start text-info ms-3 mb-4 ms-3 fs-5'>{showFirstName()}</p>

                    <h2 className='text-start fw-semibold mt-3 ms-3 fs-5'>{currentView ? 'Last Name' : ''}</h2>
                    <p className='text-start text-info ms-3 mb-4 ms-3 fs-5'>{showLastName()}</p>

                    <h2 className='text-start fw-semibold mt-3 ms-3 fs-5'>{currentView ? 'Email' : ''}</h2>
                    <p className='text-start text-info ms-3 mb-4 ms-3 fs-5'>{showEmail()}</p>

                    <h2 className='text-start fw-semibold mt-3 ms-3 fs-5'>{currentView ? 'Phone' : ''}</h2>
                    <p className='text-start text-info ms-3 mb-4 ms-3 fs-5'>{showPhone()}</p>

                    <h2 className='text-start fw-semibold mt-3 ms-3 fs-5'>{currentView ? 'Position' : ''}</h2>
                    <p className='text-start text-info ms-3 mb-4 ms-3 fs-5'>{showPosition()}</p>

                    <h2 className='text-start  fw-semibold mt-3 ms-3 fs-5'>{currentView ? 'Address' : ''}</h2>
                    <p className='text-start text-info ms-3 mb-4 ms-3 fs-5'>{showLocation()}</p> {/* No margin-bottom for the last item */}
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
