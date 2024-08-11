import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './customTheme.scss'; 
import '../pages/styling.css';

export function Home() {
    return (
        <div className='home-background-image'>
            <Container className="d-flex align-items-center justify-content-center min-vh-100">
                <Col className="text-center">
                    <Row className="mb-0">
                        <h1 className="fs-xl fw-medium line-one text-light text-uppercase">Safe Account,</h1>
                    </Row>
                    <Row className="mb-0">
                        <h1 className="fs-xxxl fw-bolder line-two text-secondary text-uppercase">Easy Access</h1>
                    </Row>
                    <Row className="justify-content-center">
                        <Col xs={12} md={8} lg={7} className="d-flex justify-content-center">
                            <h1 className="fs-2 line-three text-light text-wrap">
                                access your secure employee accounts anytime, anywhere, with seamless convenience.
                            </h1>
                        </Col>
                    </Row>
                </Col>
            </Container>
        </div>
    );
}
