import { useState, useEffect } from "react";
import { Container, ListGroup, Button, Form, Row, Col, Dropdown, Alert } from 'react-bootstrap';
import './update.css';
// import '../navy-1.png';
// import employeeImage from '../profile.png'; // Import your image
// import navyBackground from '../navy-1.png'; // Import navy background image
export function Update() {

    const [account, setAccount] = useState([]);
    const [selectedEmployeeIndex, setSelectedEmployeeIndex] = useState(null); // Track selected employee index
    const [selectedItemKey, setSelectedItemKey] = useState(null);
    const [newValue, setNewValue] = useState('');
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [error, setError]=useState(false)

    useEffect(() => {
        const retrieveAccounts = async (e) => {
            if (e) {
              e.preventDefault();
            }
          
            try {
              const response = await fetch('https://zx814esxf6.execute-api.us-east-1.amazonaws.com/CORS-Enabled/getAllEmployeeAccounts');
          
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
          
              const data = await response.json();
              setAccount(data); // Assuming data is an array of accounts
            } catch (error) {
              console.error('Error:', error);
              // setError(error.message); // Uncomment if you have an error state
            }
          };
                  retrieveAccounts()
        }, []);
     
    const handleEmployeeSelect = (last_name, first_name, index) => {
        setSelectedEmployeeIndex(last_name);
        setLastName(last_name);
        setFirstName(first_name);
        setSelectedItemKey(null); // Reset selectedItemKey when a new employee is selected
        setShowUpdateForm(false); // Hide update form when a new employee is selected
    };

    const updateValue = async () => {
        if (lastName !== null && firstName !== null && selectedItemKey !== null && newValue !== '') {
            try {
                const empId = lastName; // Replace with actual employee ID from your account data
                const attributeName = selectedItemKey;
                console.log(selectedItemKey)
                console.log(newValue)
                console.log(lastName)
                const params = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        // "employeeId": "empId",
                        // "TableName": "'employee_accounts'",
                        attributeName: attributeName,
                        value: newValue
                    })
                };
                
                const response = await fetch(`https://zx814esxf6.execute-api.us-east-1.amazonaws.com/CORS-Enabled/updateAccount?employeeId=${empId}`, params);
                console.log(response)
                if (!response.ok) {
                    setError(true)
                    setShowUpdateForm(false)
                    throw new Error('Network response was not ok');
                }

                const updatedData = await response.json();
                console.log('Updated data:', updatedData);

                // Update local state with new value
                const updatedAccount = account.map(emp => {
                    if (emp['pk'] === lastName && emp['First Name'] === firstName) {
                        return {
                            ...emp,
                            [attributeName]: newValue
                        };
                    }
                    return emp;
                });

                setAccount(updatedAccount);
                setNewValue('');
                setShowUpdateForm(false);
            } catch (error) {
                console.error('Error updating value:', error);
                setError(true)
                setShowUpdateForm(false)
                // Handle error state if needed
            }
        } else {
            console.error('Missing required fields for update');
            // Handle missing fields error state if needed
        }
    };

    return (
        <>
            <div className="background-image">
                <div className="employee-image">
                <Container fluid >
                    <div>
                    <Alert className="within-overlay" style={{boxShadow: '0 30px 20px 10px #152235', borderRadius: '0', backgroundColor: 'white',borderTop: '5px solid',borderBottom: '5px solid',color: '#5D9D67', borderColor: '#5D9D67', opacity: '80%'}}>
                        <h1 style={{opacity:"100%", textShadow: '1px 1px 2px #152235', fontSize: '30px', fontWeight: 'bold',  fontFamily: 'Times-New-Roman', letterSpacing: '100 px', textTransform: 'uppercase'}}>Update an <br/>Employee Account</h1>
                    </Alert>
                        {/* <Row className="within-overlay"><br/><h1>Update Employee <br/>Profiles<br/></h1></Row> */}
                    <Row >
                        <br/>
                        {/* Left column for employee dropdown */}
                        <Col className="overlay-section">
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            Select Employee
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                            {account.map((employee, index) => (
                                <Dropdown.Item key={index} onClick={() => handleEmployeeSelect(employee['pk'], employee['First Name'])}>
                                {employee['pk']}, {employee['First Name']}
                                </Dropdown.Item>
                            ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        </Col>

                        {/* Middle column for field dropdown and update text box */}
                        <div className="non-overlay-bottom">
                            {selectedEmployeeIndex !== null && (
                                <Dropdown>
                                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                        Select Field to Update
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                    {account
                                            .filter(emp => emp['pk'] === lastName && emp['First Name'] === firstName)
                                            .map(emp => (
                                                <div key={`${emp['pk']}-${emp['First Name']}`}>
                                                    {Object.entries(emp).map(([key, value]) => (
                                            <Dropdown.Item key={key} onClick={() => {
                                                setSelectedItemKey(key);
                                                setShowUpdateForm(true);
                                                }}>                                                           
                                                {key}
                                            </Dropdown.Item>
                                                    ))}
                                                </div>
                                            ))
                                    }
                                    </Dropdown.Menu>
                                </Dropdown>
                            )}
                        {/*update buttons*/}
                            {showUpdateForm && selectedItemKey !== null && (
                                <div className="non-overlay-lowest">
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            placeholder={selectedItemKey}
                                            value={newValue}
                                            onChange={(e) => setNewValue(e.target.value)} />
                                    </Form.Group>
                                        <Button onClick={updateValue}>Update {selectedItemKey}</Button>
                                    
                                </div>
                            )}
                            {(error) && (
                                <div className="non-overlay-lowest">
                                  <Alert variant="danger" onClose={() => setError(false)} dismissible>
                                        <div>Error Updating Item!</div>
                                    </Alert>
                                </div>
                            )}
                                
                        </div>

                        {/* Right column for employee info */}
                        <Col className="non-overlay">
                            {selectedEmployeeIndex !== null && (
                                <Container>
                                    <h2 className="white-text">Employee Information</h2>
                                    <ListGroup style={{opacity:"75%"}}>
                                        {account
                                            .filter(emp => emp['pk'] === lastName && emp['First Name'] === firstName)
                                            .map(emp => (
                                                <div key={`${emp['pk']}-${emp['First Name']}`}>
                                                    {Object.entries(emp).map(([key, value]) => (
                                                        <ListGroup.Item key={key}>
                                                            <Row>
                                                                <Col sm={6}>
                                                                    <h5>{key}:</h5>
                                                                </Col>
                                                                <Col sm={6}>
                                                                    <h5>{value}</h5>
                                                                </Col>
                                                            </Row>
                                                        </ListGroup.Item>
                                                    ))}
                                                </div>
                                            ))
                                        }
                                    </ListGroup>
                                </Container>
                            )}
                        </Col>
                    </Row>
                    </div>
                </Container>
                </div>
            </div>

        </>
    );
}