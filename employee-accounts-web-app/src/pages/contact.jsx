import React from 'react';
import { Col, Row, Container, Card, Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './styles.css'; // Optional: For custom styling

export function Contact() {
    return (
        <div className='contact-background-image'>
            <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
                <Row className="w-100 mb-4 text-center">
                    <Col>
                        <h1 className="fs-xl fw-normal text-light text-uppercase mb-5">Contact</h1>
                    </Col>
                </Row>

                <Row className="w-100">
                    <Col className="d-flex justify-content-center">
                        <Card className="border-secondary border-3 bg-transparent" style={{ width: '100%', maxWidth: '600px' }}>
                            <Card.Body>
                                <Tabs
                                    defaultActiveKey="email"
                                    id="tab"
                                    className="mb-3"
                                    fill
                                >
                                    <Tab eventKey="email" title={<span className='text-secondary fs-3 fw-normal'>Email</span>}>
                                        <div className="text-center text-light fs-4">employees@accounts.com</div>
                                    </Tab>
                                    <Tab eventKey="phone" title={<span className='text-secondary fs-3 fw-normal'>Phone</span>}>
                                        <div className="text-center text-light fs-4">(1)800-367-2268</div>
                                    </Tab>
                                    <Tab eventKey="address" title={<span className='text-secondary fs-3 fw-normal'>Address</span>}>
                                        <div className="text-center text-light fs-4">
                                            101 Employee Drive <br />
                                            Baltimore, MD 21215
                                        </div>
                                    </Tab>
                                </Tabs>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
