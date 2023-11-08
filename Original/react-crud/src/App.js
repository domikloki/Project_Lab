import './App.css';
import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';


import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";
import AddCard from "./components/AddCard.js";
import ShowCards from './components/show-cards.js';


import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';

// function CCard(props)
// {
//   const cardummy = [
//     {
//         cardtitle: "Dummy",
//         cardtext: "Dummy",
//         cardtags: "Dummy"
//     },
//   ]
//       const [modalShow, setModalShow] = useState(false);
//       const [modalData, setModalData] = useState(cardummy);
//   return <div>
//     <Container>
//       <Row className="justify-content-md-center">
//         {cardprops.map(data => (
//           <Card key={data.id} style={{ width: '15rem' }}>
//             <Card.Img variant="top" src="flower.jpg" />
//             <Card.Body>
//               <Card.Title>{data.cardtitle}</Card.Title>
//               <Card.Text>{data.cardtags}</Card.Text>
//               <Button variant="primary" onClick={()=> {setModalData(data);setModalShow(true)}}>Kártya megnyitása</Button>
//           </Card.Body>  
//           </Card>
//         ))}
//       </Row>
//     </Container>
//     <Modal show={modalShow} onHide={() => setModalShow(false)}
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered>
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">{modalData.cardtitle}</Modal.Title>

//       </Modal.Header>
//       <Modal.Body>
//         <h5>{modalData.cardtags}</h5>
//         <Container className='modalimage'>
//           <Row className="justify-content-md-center">
//             <Col xs lg="7">
//               <Image  src="flower.jpg" fluid/>
//             </Col>
//           </Row>
//         </Container>
//         <h5>{modalData.cardtext}</h5>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button onClick={() => setModalShow(false)}>Bezár</Button>
//         <Button>Szerkesztés</Button>
//       </Modal.Footer>
//     </Modal>
//   </div>

// //show={modalShow} onHide={() => setModalShow(false)}
// }

class App extends Component {
  render() {
    document.body.style.backgroundColor = "beige";
    return (
      <div className='App'>

        {/* <nav className="navbar navbar-expand navbar-dark bg-success">
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
        </nav> */}



      <Navbar expand="lg" className="bg-light">
        <Container fluid>
          <Navbar.Brand><Link to={"/showcards"} className="navbar-brand">Növénytároló-Kártyák</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Link to={"/showcards"} className="nav-link">Kártyák</Link>
              <Link to={"/add"} className="nav-link">Hozzáadás</Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Kereső"
                className="me-2"
                aria-label="Search"/>
              <Button variant="outline-success">Keresés</Button>
            </Form>
          </Navbar.Collapse>
          </Container>
        </Navbar>

      {/* <Form.Control type="text" placeholder="Kereső" />
      <Button variant="primary">Nézet</Button>


      <CCard></CCard> */}
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<ShowCards/>} />
            <Route path="/add" element={<AddCard/>} />
            <Route path="/showcards" element={<ShowCards/>} />

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
