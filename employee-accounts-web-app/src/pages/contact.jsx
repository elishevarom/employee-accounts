import React from 'react';
import { Col, Row, Container, Card, Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Contact() {
    return (
        <div className='contact-background-image'>
            <Container className="d-flex align-items-center justify-content-center min-vh-100">
                <Col className="d-flex align-items-center justify-content-center">
                    <Row className="w-100 text-center">
                        <h1 className="text-light contact-slogan">CONTACT</h1>
                    </Row>

                    <Row className="w-100">
                        <Card className="mx-auto" style={{ width: '50%' }}>
                            <Card.Body>
                                <Tabs
                                    defaultActiveKey="email"
                                    id="tab"
                                    className="mb-3"
                                >
                                    <Tab eventKey="email" title="Email">
                                        Tab content for email
                                    </Tab>
                                    <Tab eventKey="phone" title="Phone">
                                        Tab content for phone
                                    </Tab>
                                    <Tab eventKey="address" title="Address">
                                        Tab content for address
                                    </Tab>
                                </Tabs>
                            </Card.Body>
                        </Card>
                    </Row>
                </Col>
            </Container>
        </div>
    );
}
