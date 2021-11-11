import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';


const NavBar = () => {
    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Container>
             <Navbar.Brand ><Link to="/" className="navbar-brand ml-5 ">
              Contact App
            </Link></Navbar.Brand>
          
            </Container>
        </Navbar>

        
    )
}

export default NavBar
