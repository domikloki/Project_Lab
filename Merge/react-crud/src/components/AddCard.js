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
    this.onChangeImage = this.onChangeImage.bind(this);


    this.state = {
      id: null,
      title: "",
      tags: "",
      description: "", 
      picture: null,
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

  onChangeImage(e) {
    console.log("Image Upload");
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
  
    this.setState({
      picture: formData,
    });
  }
  
  

  saveTutorial() {
    const data = new FormData();
    data.append('title', this.state.title);
    data.append('tags', this.state.tags);
    data.append('description', this.state.description);
    data.append('image', this.state.picture);
  
    console.log("FormData:", data);

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
      picture: null,

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
          <Form encType="multipart/form-data" style={{ fontFamily: 'georgia, sans-serif' }} className="d-flex flex-column align-items-center mb-3">
            <Form.Group className="col-lg-4" >
                <Form.Label className="fw-bold text-dark">Főcím</Form.Label>
                <Form.Control type="textarea" placeholder="" name="title" id="title" required value={this.state.title} onChange={this.onChangeTitle}/>
            </Form.Group>
            <Form.Group className="col-lg-4" >
                <Form.Label className="fw-bold text-dark">Címkék</Form.Label>
                <Form.Control type="text" placeholder="" name="tags" id="tags" required value={this.state.tags} onChange={this.onChangeTags}/>
            </Form.Group>
            <Form.Group className="col-lg-4" >
                <Form.Label className="fw-bold text-dark">Leírás</Form.Label>
                <Form.Control as="textarea" rows={3} required value={this.state.description} id="description" onChange={this.onChangeDescription}/>
            </Form.Group>
            <Form.Group  className="col-lg-4 p-3">
                <Form.Label className="fw-bold text-dark">Kép feltöltése</Form.Label>
                <Form.Control type="file" id="imagefile" onChange={this.onChangeImage} />
            </Form.Group>

            <button onClick={this.saveTutorial} className="btn btn-success mb-3">
              Hozzáadás
            </button>
          </Form>
        )}
      </div>
    );
  }
}
