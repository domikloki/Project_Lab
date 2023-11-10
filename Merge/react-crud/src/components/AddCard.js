import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert'

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeTags = this.onChangeTags.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      id: null,
      title: "",
      tags: "",
      description: "", 
      published: false,

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
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTutorial() {
    this.setState({
      id: null,
      title: "",
      tags: "",
      description: "",

      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div>
        {this.state.submitted ? (
          <Alert variant="success">
            Sikeres Hozzáadás!
          </Alert>
        ) : (
          <Form>
            <Form.Group className="mb-3" controlId="input_title">
                <Form.Label>Főcím</Form.Label>
                <Form.Control type="textarea" placeholder="" name="title" id="title" required value={this.state.title} onChange={this.onChangeTitle}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="input_tag">
                <Form.Label>Címkék</Form.Label>
                <Form.Control type="textarea" placeholder="" name="tags" id="tags" required value={this.state.tags} onChange={this.onChangeTags}/>
                <Form.Control plaintext readOnly defaultValue="Itt jelennek majd meg a hozzáadott tagek" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Leírás</Form.Label>
                <Form.Control as="textarea" rows={3} required value={this.state.description} id="description" onChange={this.onChangeDescription}/>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Kép feltöltése</Form.Label>
                <Form.Control type="file" />
            </Form.Group>
            <button onClick={this.saveTutorial} className="btn btn-success">
              Submit
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
