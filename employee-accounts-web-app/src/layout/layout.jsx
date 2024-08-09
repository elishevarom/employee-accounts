// src/components/Layout.js
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported first

import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faHouse, faMagnifyingGlass, faPeopleGroup, faPhone, faPlus, faRotate, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../pages/customTheme.scss';

export function Layout() {
    return (
        <>
            {/* Navbar */}
            <Navbar bg="primary" variant="dark" expand="lg" fixed="top" style={{boxShadow: '0 1px 10px '}}>
                <Container fluid>
                    <Navbar.Brand href="/" className="text-secondary fs-4  fw-bold">Employee Accounts Inc.</Navbar.Brand>
                    <Navbar.Collapse>
                        <Nav className="navbar-nav w-100 d-flex justify-content-between">
                            <Nav.Link href="/" className="text-light no-underline">
                                <FontAwesomeIcon icon={faHouse} style={{ marginRight: '0.5rem' }} />
                                Home
                            </Nav.Link>
                            <Nav.Link href="/about" className="text-light no-underline">
                                <FontAwesomeIcon icon={faPeopleGroup} style={{ marginRight: '0.5rem' }} />
                                About
                            </Nav.Link>
                            <Nav.Link href="/contact" className="text-light no-underline">
                                <FontAwesomeIcon icon={faPhone} style={{ marginRight: '0.5rem' }} />
                                Contact
                            </Nav.Link>
                            <Dropdown>
                                <Dropdown.Toggle
                                    id="dropdown-basic"
                                    className="dropdown-toggle d-flex align-items-center"
                                >
                                    <FontAwesomeIcon icon={faFolderOpen} style={{ marginRight: '0.5rem' }} />
                                    Manage Employee Profiles
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="/add">
                                        <FontAwesomeIcon icon={faPlus} style={{ marginRight: '0.5rem' }} />
                                        Add Employee Profile
                                    </Dropdown.Item>
                                    <Dropdown.Item href="/retrieve">
                                        <FontAwesomeIcon icon={faMagnifyingGlass} style={{ marginRight: '0.5rem' }} />
                                        View Employee Profile
                                    </Dropdown.Item>
                                    <Dropdown.Item href="/update">
                                        <FontAwesomeIcon icon={faRotate} style={{ marginRight: '0.5rem' }} />
                                        Update Employee Profile
                                    </Dropdown.Item>
                                    <Dropdown.Item href="/delete">
                                        <FontAwesomeIcon icon={faTrash} style={{ marginRight: '0.5rem' }} />
                                        Delete Employee Profile
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Main Content Area */}
            <Container fluid className="content-padding mt-5"> {/* Adding margin-top to account for the fixed navbar */}
                <Outlet />
            </Container>
        </>
    );
}
