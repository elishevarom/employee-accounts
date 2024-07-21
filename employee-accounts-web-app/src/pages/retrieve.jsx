

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';


export function Retrieve() {
    const [employees, setEmployees] = useState([]);
    const [currentView, setCurrentView] = useState([]);
  
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
            lastName: emp.pk,
            position: emp.Position,
            location: `${emp.Address} ${emp.City}, ${emp.State} ${emp.Zip}`,
            phone: emp.Phone,
            email: emp.Email }))
          setEmployees(formattedEmployees);
          console.log(employees)
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

    const showPosition = () => {
        if (currentView != ''){
            return(
                "Position: " + currentView.position 
            )
        }
    }

    const showPhone = () => {
        if (currentView != ''){
            return(
                "Phone: " + currentView.phone 
            )
        }
    }

    const showEmail = () => {
        if (currentView != ''){
            return(
                "Email: " + currentView.email 
            )
        }
    }

    const showLocation = () => {
        if (currentView != ''){
            return(
                "Location: " + currentView.location
            )
        }
    }

    const showBorder = () => {
        if (currentView != ''){
        return ('1px solid blue')
        }
        else{
            return ('none')
        }
    }
     


    return(
        <>

        <h2 className = 'mt-5'>View Employee Profiles</h2>
        <DropdownButton id="dropdown-employees" title="Select an Employee" className="mt-5">
        {employees.map((option) => (
          <Dropdown.Item key={option.id} onClick={() => updateEmployee(option)}>
            {option.firstName} {option.lastName}
          </Dropdown.Item>
        ))}
      </DropdownButton>
 
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
        <div className = 'd-flex justify-content-center align-items-center'>
        <Card style={{ width: '25rem', border: showBorder()}} className = 'mt-20'>
            <Card.Body>
            <Card.Title>{currentView.firstName} {currentView.lastName}</Card.Title>
            <Card.Text>
                     {showPosition()}
                    <br></br>
                     {showLocation()}
                    <br></br>
                    {showPhone()}
                    <br></br>
                    {showEmail()} 
            </Card.Text>
            </Card.Body>
         </Card>
         </div>


        </>

  );

}

