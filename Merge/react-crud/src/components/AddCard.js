import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeTags = this.onChangeTags.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newPlant = this.newPlant.bind(this);

    this.state = {
      id: null,
      title: "",
      tags: "",
      description: "", 


      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeTags(e) {
    this.setState({
      tags: e.target.value
    });
  }

  saveTutorial() {
    var data = {
      title: this.state.title,
      tags: this.state.tags,
      description: this.state.description
    };

    TutorialDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          tags: response.data.tags,
          description: response.data.description,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newPlant() {
    this.setState({
      id: null,
      title: "",
      tags: "",
      description: "",

      submitted: false
    });
  }




  render() {
    return (
      <div>
        {this.state.submitted ? (
          <Modal show={true} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Sikeres hozzáadás!
              </Modal.Title>
            </Modal.Header>
          </Modal>
        ) : (
          <Form style={{ fontFamily: 'georgia, sans-serif' }} className="d-flex flex-column align-items-center mb-3">
            <Form.Group className="col-lg-4" controlId="input_title">
                <Form.Label className="fw-bold text-dark">Főcím</Form.Label>
                <Form.Control type="textarea" placeholder="" name="title" id="title" required value={this.state.title} onChange={this.onChangeTitle}/>
            </Form.Group>
            <Form.Group className="col-lg-4" controlId="input_tag">
                <Form.Label className="fw-bold text-dark">Címkék</Form.Label>
                <Form.Control type="text" placeholder="" name="tags" id="tags" required value={this.state.tags} onChange={this.onChangeTags}/>
            </Form.Group>
            <Form.Group className="col-lg-4" controlId="exampleForm.ControlTextarea1">
                <Form.Label className="fw-bold text-dark">Leírás</Form.Label>
                <Form.Control as="textarea" rows={3} required value={this.state.description} id="description" onChange={this.onChangeDescription}/>
            </Form.Group>
            <Form.Group controlId="formFile" className="col-lg-4 p-3">
                <Form.Label className="fw-bold text-dark">Kép feltöltése</Form.Label>
                <Form.Control type="file" />
            </Form.Group>
            <button onClick={this.saveTutorial} className="btn btn-success mb-3">
              Hozzáadás
            </button>
          </Form>
        )}

        {/* {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <button onClick={this.saveTutorial} className="btn btn-success">
              Submit
            </button>
          </div>
        )} */}
      </div>
    );
  }
}
