import './App.css';
import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";


import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import cardprops from './cardprops.js';
//import AddCard from "./components/add-card";
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import { useState } from 'react'

function CCard(props)
{
  const cardummy = [
    {
        cardtitle: "Dummy",
        cardtext: "Dummy",
        cardtags: "Dummy"
    },
  ]
      const [modalShow, setModalShow] = useState(false);
      const [modalData, setModalData] = useState(cardummy);
  return <div>
    <Container>
      <Row className="justify-content-md-center">
        {cardprops.map(data => (
          <Card key={data.id} style={{ width: '15rem' }}>
            <Card.Img variant="top" src="flower.jpg" />
            <Card.Body>
              <Card.Title>{data.cardtitle}</Card.Title>
              <Card.Text>{data.cardtags}</Card.Text>
              <Button variant="primary" onClick={()=> {setModalData(data);setModalShow(true)}}>Kártya megnyitása</Button>
          </Card.Body>  
          </Card>
        ))}
      </Row>
    </Container>
    <Modal show={modalShow} onHide={() => setModalShow(false)}
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{modalData.cardtitle}</Modal.Title>

      </Modal.Header>
      <Modal.Body>
        <h5>{modalData.cardtags}</h5>
        <Container className='modalimage'>
          <Row className="justify-content-md-center">
            <Col xs lg="7">
              <Image  src="flower.jpg" fluid/>
            </Col>
          </Row>
        </Container>
        <h5>{modalData.cardtext}</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setModalShow(false)}>Bezár</Button>
        <Button>Szerkesztés</Button>
      </Modal.Footer>
    </Modal>
  </div>

//show={modalShow} onHide={() => setModalShow(false)}
}

class App extends Component {
  render() {
    return (
      <div>

        <nav className="navbar navbar-expand navbar-dark bg-success">
          <Link to={"/tutorials"} className="navbar-brand">
            NövénytárolóKártyák
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                Tutorials
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>


{/* 
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">NövénytárolóKártyák</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Főoldal</Nav.Link>
              <Nav.Link ><Link to={"/add-card"} className=''>Hozzáadás</Link></Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}

      {/* <Form.Control type="text" placeholder="Kereső" />
      <Button variant="primary">Nézet</Button>


      <CCard></CCard> */}
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<TutorialsList/>} />
            <Route path="/tutorials" element={<TutorialsList/>} />
            <Route path="/add" element={<AddTutorial/>} />
            <Route path="/tutorials/:id" element={<Tutorial/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
