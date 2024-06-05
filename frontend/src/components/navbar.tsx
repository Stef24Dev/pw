import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Nazionale from './Nazionale.tsx';
import Regionale from './Regionale.tsx';

export default function Navbar() {
  return (
    // <Nav variant="tabs" defaultActiveKey="/">
    //   <Nav.Item>
    //     <Nav.Link href="/"> <Nazionale/> </Nav.Link>
    //   </Nav.Item>
    //   <Nav.Item>
    //     <Nav.Link eventKey="regionale"> <Regionale/> </Nav.Link>
    //   </Nav.Item>
    // </Nav>
    <div>
      <Button variant='primary'>Nazionale</Button>
      <Button variant='primary'>Regionale</Button>
    </div>
  );
}