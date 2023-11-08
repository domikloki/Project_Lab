import React, { Component } from "react";
import MainService from "../services/tutorial.service.js";
//<Button variant="success" onClick={() => this.setState({ modalShow: this.state.modalShow(true), modalData: this.state.modalData(data)}) >Kártya megnyitása</Button>

import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import cardprops from './cardprops.js';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
//import { useState } from 'react';

export default class ShowCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            modalData: [
                {
                    cardtitle: "nope",
                    cardtext: "nope",
                    cardtags: "nope"
                }
            ]
        };
    }

    render() {

        return(
            <div>
                <Form.Control type="text" placeholder="Kereső" />
                <Button variant="success">Nézet</Button>
                <Container>
                    <Row className="justify-content-md-center">
                        {cardprops.map(data => (
                        <Card key={data.id} style={{ width: '15rem' }}>
                            <Card.Img variant="top" src="flower.jpg" />
                            <Card.Body>
                            <Card.Title>{data.cardtitle}</Card.Title>
                            <Card.Text>{data.cardtags}</Card.Text>
                            <Button variant="success" onClick={() => this.setState({ modalShow: true, modalData: data})} >Kártya megnyitása</Button>
                        </Card.Body>  
                        </Card>
                        ))}
                    </Row>
                </Container>
                <Modal show={this.state.modalShow} onHide={() => this.setState({ modalShow: false})}
                    //{...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">{this.state.modalData.cardtitle}</Modal.Title>

                    </Modal.Header>
                    <Modal.Body>
                        <h5>{this.state.modalData.cardtags}</h5>
                        <Container className='modalimage'>
                        <Row className="justify-content-md-center">
                            <Col xs lg="7">
                            <Image  src="flower.jpg" fluid/>
                            </Col>
                        </Row>
                        </Container>
                        <h5>{this.state.modalData.cardtext}</h5>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.setState({ modalShow: false})}>Bezár</Button>
                        <Button>Szerkesztés</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}