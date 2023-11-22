import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";


import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";

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
            searchType: "Főcím",
            searchDescription: "",
            sortype: "DESC",
            ordertype: "",
            activeItem: "1",
            activeItemsec: "1",
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
        const searchDescription = e.target.value;
        this.setState({
          searchTitle: searchTitle,
          searchDescription: searchTitle
        });
      }

      searchTitle() {
        if (this.state.searchType == "Főcím")
        {
          TutorialDataService.searchTitle(this.state.searchTitle, this.state.sortype, this.state.ordertype)
          .then(response => {
            this.setState({
              plants: response.data
            });
            console.log(response.data);
            console.log(this.state.sortype);
            console.log(this.state.searchTitle);
            console.log(this.state);
          })
          .catch(e => {
            console.log(e);
            console.log(this.state.sortype);
            console.log(this.state.searchTitle);
          });
        } else if (this.state.searchType == "Leírás")
        {
          TutorialDataService.searchDescription(this.state.searchTitle, this.state.sortype)
          .then(response => {
            this.setState({
              plants: response.data
            });
            console.log(response.data);
            console.log(this.state.searchDescription);
          })
          .catch(e => {
            console.log(e);
          });
        }
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
//pici margó a kártyák között
//Címke példaadatok
//Bakonnak csütörtök délután 4ig előadást
//Tagek: évelő, hazánkban előfordul, illóolaj
        return(
            <div>
                    <Container className="col-lg-6">
                        <Row xs="auto" className="d-flex align-items-center">
                          <InputGroup className="mb-3">
                            <InputGroup.Text className="fs-4">
                              <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-autoclose-true">{this.state.searchType}</Dropdown.Toggle>
                                <DropdownMenu>
                                  <DropdownItem active={this.state.activeItem === "1"} onClick={() => this.setState({ searchType: "Főcím", ordertype:"title", activeItem: "1"})}>Főcím</DropdownItem>
                                  <DropdownItem active={this.state.activeItem === "2"}  onClick={() => this.setState({ searchType: "Leírás", ordertype:"description", activeItem: "2"})}>Leírás</DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </InputGroup.Text>
                            <Form.Control className="col-md-3 col-lg-3 w-45" type="text" placeholder="Kereső" value={searchTitle} onChange={this.onChangeSearchTitle}/>
                          </InputGroup>
                        </Row>


                    </Container>

                    <Stack direction={'vertical'} gap={0} className="p-3">
                      <Container>
                        <Col xs="auto">
                          <Dropdown className="me-2">
                            <Dropdown.Toggle variant="success" id="dropdown-autoclose-true">Rendezés</Dropdown.Toggle>
                            <DropdownMenu>
                              <DropdownItem active={this.state.activeItemsec === "1"} onClick={() => this.setState({ sortype: "DESC", ordertype: `${this.state.searchType}`, activeItemsec: "1"})}>ABC szerint csökkenő</DropdownItem>
                              <DropdownItem active={this.state.activeItemsec === "2"} onClick={() => this.setState({ sortype: "ASC", ordertype: `${this.state.searchType}`, activeItemsec: "2"})}>ABC szerint növekvő</DropdownItem>
                              <DropdownItem active={this.state.activeItemsec === "3"} onClick={() => this.setState({ ordertype: "created",activeItemsec: "3"})}>Létrehozás dátuma</DropdownItem>
                              <DropdownItem active={this.state.activeItemsec === "4"} onClick={() => this.setState({ ordertype: "updated",activeItemsec: "4"})}>Utolsó szerkesztés</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                          <Button className="col-md-3 col-lg-1 mx-auto" variant="success" onClick={this.searchTitle}>Keresés</Button>
                          <Button className="col-md-3 col-lg-1 mx-auto" variant="primary" onClick={this.retrievePlants}>Vissza</Button>
                        </Col>
                      </Container>
                    </Stack>




                <Stack direction={{ xs: 'vertical', md: 'horizontal' }} gap={0} className="p-3">
                    <Container>
                      <Col xs="auto">
                        <Button className="col-md-2 col-lg-auto mx-auto" variant="success">Évelő</Button>
                        <Button className="col-md-auto col-lg-auto mx-auto" variant="primary">Hazánkban előfordul</Button>
                        <Button className="col-md-2 col-lg-auto mx-auto" variant="primary">illóolaj</Button>
                      </Col>

                    </Container>
                </Stack>


                <Container >
                    <Row className="justify-content-md-center">
                        {plants.map(data => (
                        <Card className="m-1" key={data.id} style={{ width: '15rem' }}>
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


