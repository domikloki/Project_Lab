import './App.css';
import React from 'react';
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

import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';



function CCard(props)
{
  return <Card key={props.id} style={{ width: '15rem' }}>
      <Card.Img variant="top" src="flower.jpg" />
      <Card.Body>
        <Card.Title>{props.cardtitle}</Card.Title>
        <Card.Text>{props.cardtext}</Card.Text>
        <Button variant="primary" onClick={MyVerticallyCenteredModal}>Kártya megnyitása</Button>
      </Card.Body>
    </Card>
}

function OpenCard(props)
{
  return <Alert variant="primary" dismissible>
  <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
  <p>
    Change this and that and try again. Duis mollis, est non commodo
    luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
    Cras mattis consectetur purus sit amet fermentum.
  </p>
</Alert>
}

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


function App() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div className="App">
          <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
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
      <Button href="/add-card" variant="primary">Kártya hozzáadása</Button>
      <Container>
        <Row>
          {cardprops.map(CCard)}
        </Row>

      </Container>

      <div>
        <Button variant="primary" onClick={() => setModalShow(true)}>Launch vertically centered modal</Button>
        <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)}/>
      </div>

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
