import { Outlet, Link} from "react-router-dom"
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export function Update() {
    return(
        <>
    <Accordion defaultActiveKey={['0']} alwaysOpen>
    <Accordion.Item eventKey="0">
            <Accordion.Header>Employee Account #1</Accordion.Header>
            <Accordion.Body>
            <Container>
                <Row> Last Name: Doe
                </Row>
                <Row>Firse Name: John</Row>
                <Row>Date of Birth: 01/01/2001</Row>
                <Row>Position: Junior Developer</Row>
                <Row>State: Maryland </Row>

                </Container> 
                <Button variant="primary">Add to This Employee Account</Button>{' '}

            </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
            <Accordion.Header>Employee Account #2</Accordion.Header>
            <Accordion.Body>
            <Container>
            <Row> Last Name: Goldman
                </Row>
                <Row>Firse Name: Moshe</Row>
                <Row>Date of Birth: 02/02/2002</Row>
                <Row>Position: Front End Developer</Row>
                <Row>State: Maryland </Row>
                </Container> 
                <Button variant="primary">Add to This Employee Account</Button>{' '}

            </Accordion.Body>
        </Accordion.Item>
        </Accordion>
               <Outlet> </Outlet> 
        </>
    )
}