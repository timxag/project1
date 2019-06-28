import React from "react";
import "./index.css";
import FormErrors from "./FormErrors";
import Field from "./Field";
var linkColor;
var titleColor;
var counter = -1;

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.state = {
      link: {
        value: "",
        valid: false
      },
      title: {
        value: "",
        valid: false
      }
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.link.value);
    console.log(this.state.title.value);
    this.props.onSubmit(this.state.link.value, this.state.title.value);
    this.setState({
      link: { value: "", valid: false },
      title: { value: "", valid: false }
    });
  }

  onChange(event, valid) {
    const { name, value } = event.target;
    this.setState({ [name]: { value, valid } });
  }

  render() {
    return (
      <div className="inputform">
        <Field
          label="Image url"
          name="link"
          type="url"
          value={this.state.link.value}
          valid={this.state.link.valid}
          onChange={this.onChange}
          dropdown={this.props.arr}
        />

        <Field
          label="Image title"
          name="title"
          type="text"
          value={this.state.title.value}
          valid={this.state.title.valid}
          onChange={this.onChange}
        />

        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.handleSubmit.bind(this)}
          disabled={!(this.state.link.valid && this.state.title.valid)}
        >
          Add
        </button>
      </div>
    );
  }
}
