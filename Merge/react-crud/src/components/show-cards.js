import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

//<Button variant="success" onClick={() => this.setState({ modalShow: this.state.modalShow(true), modalData: this.state.modalData(data)}) >Kártya megnyitása</Button>

import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
//import cardprops from './cardprops.js';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
//import { useState } from 'react';

export default class ShowCards extends Component {
    constructor(props) {
        super(props);
        this.retrievePlants = this.retrievePlants.bind(this);
        this.searchTitle = this.searchTitle.bind(this);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.searchBack = this.searchBack.bind(this);
        this.editButtonChange = this.editButtonChange.bind(this);
        this.updatePlant = this.updatePlant.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTags = this.onChangeTags.bind(this);
        this.deletePlant = this.deletePlant.bind(this);

        this.state = {
            modalShow: false,
            searchTitle: "",
            editButton: "primary",
            editable: false,
            plants: [],
            modalData: [],
            editmodalData: [
                {                
                    title: "",
                    description: "",
                    tags: ""
                }
            ]
        };
    }



    componentDidMount() {
        this.retrievePlants();
      }
    

    
    retrievePlants() {
    TutorialDataService.getAll()
        .then(response => {
        this.setState({
            plants: response.data,
            searchTitle: ""
        });
        console.log(response.data);
        })
        .catch(e => {
        console.log(e);
        });
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;
    
        this.setState({
          searchTitle: searchTitle
        });
      }

      searchTitle() {
        TutorialDataService.findByTitle(this.state.searchTitle)
          .then(response => {
            this.setState({
              plants: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }

      searchBack() {
        this.setState({
            searchTitle: ""
          });
      }

      editButtonChange() {
        if (this.state.editButton == "primary")
        {
            this.setState({
                editButton: "success",
                editable: true
            });
        } else
        {
            this.setState({
                editButton: "primary",
                editable: false
            });
        }
      }

      updatePlant() {
        TutorialDataService.update(
          this.state.editmodalData.id,
          this.state.editmodalData
        )
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
      }

      onChangeTitle(e)
      {
        const title = e.target.value;
        this.setState(function(prevState) {
            return {
              editmodalData: {
                ...prevState.editmodalData,
                title: title
              }
            };
          });
      }

      onChangeDescription(e) {
        const description = e.target.value;
        
        this.setState(prevState => ({
          editmodalData: {
            ...prevState.editmodalData,
            description: description
          }
        }));
      }

      onChangeTags(e) {
        const tags = e.target.value;
        
        this.setState(prevState => ({
          editmodalData: {
            ...prevState.editmodalData,
            tags: tags
          }
        }));
      }

      refreshList() {
        this.retrievePlants();
        this.setState({
            modalShow: false,
            editable: false
          });
      }

      deletePlant()
      {
        TutorialDataService.delete(this.state.editmodalData.id)
        .then(response => {
          console.log(response.data);
          this.setState({
            modalShow: false
          });
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
      }



    render() {
        const { plants, searchTitle, editButton } = this.state;

        return(
            <div>
                <Stack direction={{ xs: 'vertical', md: 'horizontal' }} gap={1} className="p-3">
                    <Form.Control className="col-md-2 col-lg-4 mx-auto" type="text" placeholder="Kereső" value={searchTitle} onChange={this.onChangeSearchTitle}/>
                    <Button className="col-md-2 mx-auto" variant="success" onClick={this.searchTitle}>Keresés</Button>
                    <Button className="col-md-2 mx-auto" variant="primary" onClick={this.retrievePlants}>Vissza</Button>
                </Stack>
                <Stack direction={{ xs: 'vertical', md: 'horizontal' }} gap={1} className="p-3">
                    <Form.Control className="col-md-2 col-lg-4 mx-auto" type="text" placeholder="Címkék"/>
                    <Button className="col-md-2 mx-auto" variant="success">Hozzáad</Button>
                    <Button className="col-md-2 mx-auto" variant="primary">Kiürít</Button>
                </Stack>
                <Container>
                    <Row className="justify-content-md-center">
                        {plants.map(data => (
                        <Card key={data.id} style={{ width: '15rem' }}>
                            <Card.Img variant="top" src="flower.jpg" />
                            <Card.Body>
                            <Card.Title>{data.title}</Card.Title>
                            <Card.Text>{data.tags}</Card.Text>
                            <Button variant="success" onClick={() => this.setState({ modalShow: true, modalData: data, editmodalData: data})} >Kártya megnyitása</Button>
                        </Card.Body>  
                        </Card>
                        ))}
                    </Row>
                </Container>
                {this.state.editable ? (
                    <Modal show={this.state.modalShow} onHide={() => this.setState({ modalShow: false, editButton: "primary", editable: false})}
                            //{...props}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"centered>
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter"><Form.Control id="cardTitle" size="lg" className="text-center w-100" onChange={this.onChangeTitle} value={this.state.editmodalData.title} /></Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Control style={{width:"50%"}} className="w-100" size="sm" id="cardTags" placeholder="Címke" onChange={this.onChangeTags} value={this.state.editmodalData.tags} />
                                <Container className='modalimage'>
                                    <Row className="justify-content-md-center">
                                        <Col xs lg="7">
                                            <Image xs lg="7" className="justify-content-md-center" src="flower.jpg" fluid/>
                                        </Col>
                                    </Row>
                                    <Form.Control as="textarea" className="w-100" rows={3} id="cardDescription" placeholder="Leírás" onChange={this.onChangeDescription} value={this.state.editmodalData.description} />
                                    <Form.Group controlId="formFile" className="col-lg-4 w-100">
                                        <Form.Label>Kép feltöltése</Form.Label>
                                        <Form.Control type="file" className="w-100"/>
                                    </Form.Group>
                                </Container>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => this.setState({ modalShow: false}, this.editButtonChange)}>Bezár</Button>
                                <Button variant={editButton} onClick={() => this.setState(this.editButtonChange)}>Szerkesztés</Button>
                                <Button onClick={() => this.setState(this.updatePlant) }>Mentés</Button>
                                <Button variant="danger" onClick={this.deletePlant}>Törlés</Button>
                            </Modal.Footer>
                        </Modal>
                ) : (
                        <Modal show={this.state.modalShow} onHide={() => this.setState({ modalShow: false, editable: false})}
                            //{...props}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered>
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">{this.state.modalData.title}</Modal.Title>

                            </Modal.Header>
                            <Modal.Body>
                                <h5 className="text-break">{this.state.modalData.tags}</h5>
                                <Container className='modalimage'>
                                    <Row className="justify-content-md-center">
                                        <Col xs lg="7">
                                            <Image xs lg="7" className="justify-content-md-center" src="flower.jpg" fluid/>
                                        </Col>
                                    </Row>
                                    <h5 className="text-break">{this.state.modalData.description}</h5>
                                </Container>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => this.setState({ modalShow: false, editable: false})}>Bezár</Button>
                                <Button onClick={() => this.setState(this.editButtonChange)}>Szerkesztés</Button>
                            </Modal.Footer>
                        </Modal>
                )}
            </div>
        );
    }
}


{/* <Modal show={this.state.modalShow} onHide={() => this.setState({ modalShow: false})}
                    //{...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">{this.state.modalData.title}</Modal.Title>

                    </Modal.Header>
                    <Modal.Body>
                        <h5 className="text-break">{this.state.modalData.tags}</h5>
                        <Container className='modalimage'>
                            <Row className="justify-content-md-center">
                                <Col xs lg="7">
                                    <Image xs lg="7" className="justify-content-md-center" src="flower.jpg" fluid/>
                                </Col>
                            </Row>
                            <h5 className="text-break">{this.state.modalData.description}</h5>
                        </Container>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={() => this.setState({ modalShow: false})}>Bezár</Button>
                        <Button>Szerkesztés</Button>
                    </Modal.Footer>
</Modal> */}


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// import React, { useState } from 'react';
// import { Form, Button } from 'react-bootstrap';

// const DynamicFormControl = () => {
//   const [mode, setMode] = useState('text');
//   const [inputValue, setInputValue] = useState('This is regular text.');

//   const toggleMode = () => {
//     setMode((prevMode) => (prevMode === 'text' ? 'form' : 'text'));
//   };

//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   return (
//     <Form>
//       {mode === 'text' ? (
//         <p>{inputValue}</p>
//       ) : (
//         <Form.Control
//           type="text"
//           placeholder="Enter text"
//           value={inputValue}
//           onChange={handleInputChange}
//         />
//       )}

//       <Button variant="primary" onClick={toggleMode}>
//         {mode === 'text' ? 'Edit' : 'Save'}
//       </Button>
//     </Form>
//   );
// };

// export default DynamicFormControl;
    // return (
    //     {this.state.editable ? (
    //         <Modal show={this.state.modalShow} onHide={() => this.setState({ modalShow: false, editSable: true, editButton: "primary", ediTitle: true})}
    //                 //{...props}
    //                 size="lg"
    //                 aria-labelledby="contained-modal-title-vcenter"centered>
    //                 <Modal.Header closeButton>
    //                     <Modal.Title id="contained-modal-title-vcenter"><Form.Control id="cardTitle" size="lg" className="text-center" value={this.state.modalData.title} /></Modal.Title>

    //                 </Modal.Header>
    //                 <Modal.Body>
    //                     <Form.Control style={{width:"50%"}} size="sm" id="cardTags" placeholder="Címke" value={this.state.modalData.tags} />
    //                     <Container className='modalimage'>
    //                         <Row className="justify-content-md-center">
    //                             <Col xs lg="7">
    //                                 <Image xs lg="7" className="justify-content-md-center" src="flower.jpg" fluid/>
    //                             </Col>
    //                         </Row>
    //                         <Form.Control as="textarea" rows={3} id="cardDescription" placeholder="Leírás" value={this.state.modalData.description} />
    //                     </Container>
    //                 </Modal.Body>

    //                 <Modal.Footer>
    //                     <Button onClick={() => this.setState({ modalShow: false, editSable: true, editButton: "primary", ediTitle: true})}>Bezár</Button>
    //                     <Button variant={editButton} onClick={() => this.setState({ ediTitle: !ediTitle}, this.editButtonChange)}>Szerkesztés</Button>
    //                     <Button disabled={editSable} onClick={() => this.setState({ modalShow: false})}>Mentés</Button>
    //                 </Modal.Footer>
    //             </Modal>
    //       ) : (
    //             <Modal show={this.state.modalShow} onHide={() => this.setState({ modalShow: false})}
    //                 //{...props}
    //                 size="lg"
    //                 aria-labelledby="contained-modal-title-vcenter"
    //                 centered>
    //                 <Modal.Header closeButton>
    //                     <Modal.Title id="contained-modal-title-vcenter">{this.state.modalData.title}</Modal.Title>

    //                 </Modal.Header>
    //                 <Modal.Body>
    //                     <h5 className="text-break">{this.state.modalData.tags}</h5>
    //                     <Container className='modalimage'>
    //                         <Row className="justify-content-md-center">
    //                             <Col xs lg="7">
    //                                 <Image xs lg="7" className="justify-content-md-center" src="flower.jpg" fluid/>
    //                             </Col>
    //                         </Row>
    //                         <h5 className="text-break">{this.state.modalData.description}</h5>
    //                     </Container>
    //                 </Modal.Body>

    //                 <Modal.Footer>
    //                     <Button onClick={() => this.setState({ modalShow: false})}>Bezár</Button>
    //                     <Button>Szerkesztés</Button>
    //                 </Modal.Footer>
    //             </Modal>
    //       )}
    // )



    //Modal before editable

    // <Modal show={this.state.modalShow} onHide={() => this.setState({ modalShow: false, editSable: true, editButton: "primary", ediTitle: true})}
    //     //{...props}
    //     size="lg"
    //     aria-labelledby="contained-modal-title-vcenter"centered>
    //     <Modal.Header closeButton>
    //         <Modal.Title id="contained-modal-title-vcenter"><Form.Control id="cardTitle" size="lg" className="text-center" disabled={ediTitle} value={this.state.modalData.title} /></Modal.Title>

    //     </Modal.Header>
    //     <Modal.Body>
    //         <Form.Control style={{width:"50%"}} size="sm" id="cardTags" disabled={ediTitle} placeholder="Címke" value={this.state.modalData.tags} />
    //         <Container className='modalimage'>
    //             <Row className="justify-content-md-center">
    //                 <Col xs lg="7">
    //                     <Image xs lg="7" className="justify-content-md-center" src="flower.jpg" fluid/>
    //                 </Col>
    //             </Row>
    //             <Form.Control as="textarea" rows={3} id="cardDescription" disabled={ediTitle} placeholder="Leírás" value={this.state.modalData.description} />
    //         </Container>
    //     </Modal.Body>

    //     <Modal.Footer>
    //         <Button onClick={() => this.setState({ modalShow: false, editSable: true, editButton: "primary", ediTitle: true})}>Bezár</Button>
    //         <Button variant={editButton} onClick={() => this.setState({ ediTitle: !ediTitle}, this.editButtonChange)}>Szerkesztés</Button>
    //         <Button disabled={editSable} onClick={() => this.setState({ modalShow: false})}>Mentés</Button>
    //     </Modal.Footer>
    // </Modal>