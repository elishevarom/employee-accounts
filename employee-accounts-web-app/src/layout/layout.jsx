import 'bootstrap/dist/css/bootstrap.css';
import { Outlet } from 'react-router-dom';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SignOut from '../pages/signout'; // Import the SignOut component

export function Layout() {
    return (
        <>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Employee Accounts</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/add">Add Employee Profile</Nav.Link>
                        <Nav.Link href="/retrieve">View Employee Profile</Nav.Link>
                        <Nav.Link href="/update">Update Employee Profile</Nav.Link>
                        <Nav.Link href="/delete">Delete Employee Profile</Nav.Link>
                        <Nav.Link href="/contact">Contact Us</Nav.Link>
                    </Nav>
                    {/* Add the SignOut button here */}
                    <Nav className="ms-auto">
                        <SignOut />
                    </Nav>
                </Container>
            </Navbar>
            <Container>
                <Outlet /> {/* This is where your routed content will be rendered */}
            </Container>
        </>
    );
}
