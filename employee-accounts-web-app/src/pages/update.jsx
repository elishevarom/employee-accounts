import { Accordion } from "react-bootstrap";
import { Container, ListGroup, Button, Form } from 'react-bootstrap';
import { useState } from "react";
export function Update() {

    const list = [
        { key: 'Last Name', value: 'Doe' },
        { key: 'First Name', value: 'John' },
        { key: 'Date of Birth', value: '01/01/2001'},
        {key:'Position', value: 'Full Stack Developer'},
        {key:'Location', value:'Maryland'}];

    const [account, setAccount] = useState(list);
    const [selectedItemKey, setSelectedItemKey] = useState(null);
    const [newValue, setNewValue] = useState('')
    const [showUpdateForm, setShowUpdateForm] = useState(false)

    const updateValue = () => {
        setAccount(prevData => prevData.map(item =>{
            if(item.key === selectedItemKey){
                return{...item, value: newValue };
            }
            return item;
        }));
        setNewValue('');
        setShowUpdateForm(false);
      };
      
    return(
        <>
            <br/><h1>Update Employee Accounts</h1>

        <Accordion defaultActiveKey="" >
        <Accordion.Item eventKey="0">
                <Accordion.Header>Employee Account #1</Accordion.Header>
                <Accordion.Body>
                <Container>
                    <ListGroup>
                        {account.map((item) => (
                            <ListGroup.Item key={item.key}>
                            <h5>{item.key+":\t\t"}{item.value}</h5>
                            <Button onClick={() => {
                                setSelectedItemKey(item.key);
                                 setShowUpdateForm(true);
                                 }}>Update</Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                   
                    {showUpdateForm && (
                        <div>
                            <Form.Group>
                            <Form.Label>Enter Updated {selectedItemKey} Below:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={selectedItemKey}
                                value={newValue}
                                onChange={(e) => setNewValue(e.target.value)}/>
                            </Form.Group>
                            <Button onClick = {updateValue}>Update {selectedItemKey}</Button>
                        </div>
                    )}
 
                </Container>
 
                </Accordion.Body>
            </Accordion.Item>
            </Accordion>
        </>
    )
}