import { useState, useEffect } from "react";
import { Button, Form, Row, Col, Dropdown, Alert, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export function Update() {
    const [account, setAccount] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedItemKey, setSelectedItemKey] = useState(null);
    const [newValue, setNewValue] = useState('');
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const retrieveAccounts = async () => {
            try {
                const response = await fetch('https://zx814esxf6.execute-api.us-east-1.amazonaws.com/CORS-Enabled/getAllEmployeeAccounts');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAccount(data); // Assuming data is an array of accounts
            } catch (error) {
                console.error('Error:', error);
            }
        };
        retrieveAccounts();
    }, []);

    const handleEmployeeSelect = (last_name, first_name) => {
        const employee = account.find(emp => emp['pk'] === last_name && emp['First Name'] === first_name);
        setSelectedEmployee(employee);
        setSelectedItemKey(null);
        setShowUpdateForm(false);
    };

    const updateValue = async () => {
        if (selectedEmployee && selectedItemKey && newValue) {
            try {
                const empId = selectedEmployee['pk'];
                const attributeName = selectedItemKey;
                const params = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        attributeName: attributeName,
                        value: newValue
                    })
                };

                const response = await fetch(`https://zx814esxf6.execute-api.us-east-1.amazonaws.com/CORS-Enabled/updateAccount?employeeId=${empId}`, params);
                if (!response.ok) {
                    setError(true);
                    setShowUpdateForm(false);
                    throw new Error('Network response was not ok');
                }

                const updatedData = await response.json();
                console.log('Updated data:', updatedData);

                // Update local state with new value
                const updatedAccount = account.map(emp => {
                    if (emp['pk'] === empId) {
                        return {
                            ...emp,
                            [attributeName]: newValue
                        };
                    }
                    return emp;
                });

                setAccount(updatedAccount);

                // Re-select the updated employee
                const updatedEmployee = updatedAccount.find(emp => emp['pk'] === empId);
                setSelectedEmployee(updatedEmployee);
                
                setNewValue('');
                setShowUpdateForm(false);
            } catch (error) {
                console.error('Error updating value:', error);
                setError(true);
                setShowUpdateForm(false);
            }
        } else {
            console.error('Missing required fields for update');
        }
    };

    const excludedFields = ['created_at',  'pk'];

    // Alphabetize the employee list
    const sortedEmployees = [...account].sort((a, b) => {
        const lastNameComparison = a['Last Name'].localeCompare(b['Last Name']);
        if (lastNameComparison === 0) {
            return a['First Name'].localeCompare(b['First Name']);
        }
        return lastNameComparison;
    });

    return (
        <>
            <div className='update-background-image overflow-auto'>
                <h2 className='m-5 fs-0 text-light pt-3'>UPDATE EMPLOYEE ACCOUNT</h2>
                <div className='d-flex justify-content-center align-items-center mt-10'>
                    <Card className='border-secondary bg-secondary text-light' style={{ width: '100%', maxWidth: '800px', height: '400px' }}>
                        <Card.Body className="d-flex p-0">
                            <Row className='g-0 flex-fill'>
                                <Col md={6} className="bg-secondary text-light d-flex flex-column justify-content-center align-items-center" style={{ height: '100%' }}>
                                    <FontAwesomeIcon icon={faUser} size="10x" className='text-primary' />
                                    <Dropdown className="mt-3">
                                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                                            Select Employee
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {sortedEmployees.map((employee, index) => (
                                                <Dropdown.Item key={index} onClick={() => handleEmployeeSelect(employee['pk'], employee['First Name'])}>
                                                    {employee['Last Name']}, {employee['First Name']}
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Dropdown className="mt-3">
                                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                                            Select Field to Update
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {selectedEmployee && Object.entries(selectedEmployee)
                                                .filter(([key]) => !excludedFields.includes(key))
                                                .sort(([keyA], [keyB]) => keyA.localeCompare(keyB)) // Alphabetize fields
                                                .map(([key]) => (
                                                    <Dropdown.Item key={key} onClick={() => {
                                                        setSelectedItemKey(key);
                                                        setShowUpdateForm(true);
                                                    }}>
                                                        {key}
                                                    </Dropdown.Item>
                                                ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    {showUpdateForm && selectedItemKey !== null && (
                                        <Form.Group className="mt-3">
                                            <Form.Control
                                                type="text"
                                                placeholder={`Enter new ${selectedItemKey}`}
                                                value={newValue}
                                                onChange={(e) => setNewValue(e.target.value)} />
                                            <Button className="mt-2" onClick={updateValue}>Update {selectedItemKey}</Button>
                                        </Form.Group>
                                    )}
                                    {error && (
                                        <Alert variant="danger" className="mt-3" onClose={() => setError(false)} dismissible>
                                            <div>Error Updating Item!</div>
                                        </Alert>
                                    )}
                                </Col>
                                <Col md={6} className={`d-flex flex-column justify-content-center p-3 ${selectedEmployee ? 'bg-primary' : 'bg-secondary text-light'}`} style={{ height: '100%' }}>
                                    {selectedEmployee ? (
                                        <div>
                                            <h2 className='text-start fw-semibold mt-3 ms-3 fs-5'>First Name</h2>
                                            <p className='text-start text-info ms-3 mb-4 ms-3 fs-5'>{selectedEmployee['First Name']}</p>
    
                                            <h2 className='text-start fw-semibold mt-3 ms-3 fs-5'>Last Name</h2>
                                            <p className='text-start text-info ms-3 mb-4 ms-3 fs-5'>{selectedEmployee['Last Name']}</p>
    
                                            <h2 className='text-start fw-semibold mt-3 ms-3 fs-5'>Email</h2>
                                            <p className='text-start text-info ms-3 mb-4 ms-3 fs-5'>{selectedEmployee['Email']}</p>
    
                                            <h2 className='text-start fw-semibold mt-3 ms-3 fs-5'>Phone</h2>
                                            <p className='text-start text-info ms-3 mb-4 ms-3 fs-5'>{selectedEmployee['Phone']}</p>
    
                                            <h2 className='text-start fw-semibold mt-3 ms-3 fs-5'>Position</h2>
                                            <p className='text-start text-info ms-3 mb-4 ms-3 fs-5'>{selectedEmployee['Position']}</p>
    
                                            <h2 className='text-start fw-semibold mt-3 ms-3 fs-5'>Street Address</h2>
                                            <p className='text-start text-info ms-3 mb-4 ms-3 fs-5'>{selectedEmployee['Address']}</p>
    
                                            <h2 className='text-start fw-semibold mt-3 ms-3 fs-5'>City</h2>
                                            <p className='text-start text-info ms-3 mb-4 ms-3 fs-5'>{selectedEmployee['City']}</p>
    
                                            <h2 className='text-start fw-semibold mt-3 ms-3 fs-5'>State</h2>
                                            <p className='text-start text-info ms-3 mb-4 ms-3 fs-5'>{selectedEmployee['State']}</p>
    
                                            <h2 className='text-start fw-semibold mt-3 ms-3 fs-5'>Zip</h2>
                                            <p className='text-start text-info ms-3 mb-4 ms-3 fs-5'>{selectedEmployee['Zip']}</p>
                                        </div>
                                    ) : (
                                        <h1 className='text-start m-2 p-2 fs-1'>PLEASE SELECT AN EMPLOYEE ABOVE</h1>
                                    )}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    );
    
}
