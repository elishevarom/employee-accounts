
import { jsx } from '@emotion/react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';



export function Retrieve() {
    var index = 0;
    const emp1 = {firstName: 'John', lastName: 'Doe', position: 'Engineer', phone: '123', email: 'jd@ourapp.net', index: index};
    index+=1
    const emp2 = {firstName: 'Jill', lastName: 'Dill', position: 'UX', phone: '456', email: 'jid@ourapp.net', index: index};
    index+=1
    const emp3 = {firstName: 'Jake', lastName: 'Blake', position: 'UI', phone: '678', email: 'jb@ourapp.net', index: index};
    index+=1
    const emp4 = {firstName: 'Jeremy', lastName: 'Friedman', position: 'QA', phone: '789', email: 'jf@ourapp.net', index: index};
    index++
    const emp5 = {firstName: 'Jess', lastName: 'Katz', position: 'HR', phone: '567', email: 'jk@ourapp.net', index: index};
    index++
    const empsList = [emp1,emp2, emp3, emp4, emp5]

    const [currentView, setCurrentView] = useState('');

    const updateEmployee = (option) => {
        setCurrentView(option)
    }

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
        <DropdownButton id="dropdown-employees" title="Select an Employee" className = 'mt-5'>
        {empsList.map((option) => (
            <Dropdown.Item key={option.index} onClick={() => updateEmployee(option)}>{option.firstName} {option.lastName}</Dropdown.Item>
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
        <Card style={{ width: '18rem', border: showBorder()}} className = 'mt-20'>
            <Card.Body>
            <Card.Title>{currentView.firstName} {currentView.lastName}</Card.Title>
            <Card.Text>
                    {showPosition()}
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

