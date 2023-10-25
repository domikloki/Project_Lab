import './App.css';
import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import cardprops from './cardprops.js';
import AddCard from "./components/add-card";
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import { useState } from 'react'

import Alert from 'react-bootstrap/Alert';



// function CCard(props)
// {
//   const [modalShow, setModalShow] = React.useState(false);
//   return <Card key={props.id} style={{ width: '15rem' }}>
//       <Card.Img variant="top" src="flower.jpg" />
//       <Card.Body>
//         <Card.Title>{props.cardtitle}</Card.Title>
//         <Card.Text>{props.cardtags}</Card.Text>
//         <Button variant="primary" onClick={()=> {modalShow(true);}}>Kártya megnyitása</Button>
//       </Card.Body>  
//     </Card>


// }

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

// Probléma: Amikor egy kártyára rákattintok az adott kártya adatait kellene megjeleníteni,
// amit hol kellene átadni? -> Még itt local-ban lehet értékátadni, de 'szerveren' hogy?->
// Egyszer ugye lekéri az adatokat a Backend-től amikor megjeleníti a kártyákat,
// amikor lenyomom a gombot a props.id/key-t kellene továbbadni, h a Backend vissza tudja keresni és átadni az adatokat

// function OpenCard(props)
// {
//   return <Alert variant="primary" dismissible>
//   <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
//   <p>
//     Change this and that and try again. Duis mollis, est non commodo
//     luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
//     Cras mattis consectetur purus sit amet fermentum.
//   </p>
// </Alert>
// }



function App() {
  // const [modalShow, setModalShow] = React.useState(false);
  // const [modalData, setModalData] = useState(null);
  return (
    <div className="App">
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
      </Navbar>

      <Form.Control type="text" placeholder="Kereső" />
      <Button variant="primary">Nézet</Button>

      <CCard></CCard>
      {/* <Container>
        <Row>
          {cardprops.map((data) => CCard)}
        </Row>
      </Container> */}

      <div className="container mt-3">
          <Routes>
            {/* <Route path="/" element={<AddCard/>} /> */}
            <Route path="/add-card" element={<AddCard/>} />
          </Routes>
      </div>
    


    </div>
  );
}



export default App;
