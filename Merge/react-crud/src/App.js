import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';





import AddCard from "./components/AddCard.js";
import ShowCards from './components/show-cards.js';







function App() {
  // const [modalShow, setModalShow] = React.useState(false);
  // const [modalData, setModalData] = useState(null);
  //style={{backgroundColor: "beige"}}
  document.body.style.backgroundColor = "beige";
  return (
    <div className="App" >


      <Navbar style={{ fontFamily: 'georgia, sans-serif' }} expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand><Link to={"/showcards"} className="navbar-brand fw-bold text-success">Növénytároló-Kártyák</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Link to={"/showcards"} className="nav-link text-success">Kártyák</Link>
              <Link to={"/add"} className="nav-link text-success">Hozzáadás</Link>
            </Nav>
          </Navbar.Collapse>
          </Container>
        </Navbar>






      <div className="container mt-3">
          <Routes>
            {/* <Route path="/" element={<ShowCards/>} /> */}
            <Route path="/add" element={<AddCard/>} />
            <Route path="/showcards" element={<ShowCards/>} />
            <Route path="/" element={<ShowCards/>} />
            <Route path="/showcards" element={<ShowCards/>} />
          </Routes>
      </div>

    


    </div>
  );
}



export default App;
