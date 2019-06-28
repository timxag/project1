import React from "react";
import "./index.css";
import FormErrors from "./FormErrors";
import DropDown from "./DropDown";
var Color;
export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      Data: [this.props.dropdown]
    };
    this.validateField = this.validateField.bind(this);
    this.autoComplete = this.autoComplete.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  validateField(userInput) {
    let newError = "";
    let isValid;

    switch (this.props.type) {
      case "url":
        isValid = userInput.match(
          /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/i
        );
        newError = isValid ? "" : " is invalid";
        break;

      case "text":
        isValid = userInput.length >= 3;
        newError = isValid ? "" : " is too short";
        break;

      default:
    }

    this.setState({
      error: newError
    });

    return isValid;
  }

  handleUserInput(event) {
    const userInput = event.target.value;
    const isValid = this.validateField(userInput);

    this.props.onChange(event, isValid);

    if (this.props.dropdown) {
      this.autoComplete.bind(userInput);
    }
  }

  linkChange(url) {
    // this.setState({ link: url });
    this.handleUserInput({
      target: {
        name: "link",
        value: url
      }
    });
    this.hide();
  }
  autoComplete(userInput) {
    console.log("ac");
    return this.state.Data.filter(e => e.includes(userInput));
  }
  render() {
    return (
      <div>
        <p>{this.props.label}</p>
        <div>
          <input
            name={this.props.name}
            type={this.props.type}
            className="form-control"
            autoComplete={this.props.dropdown && "off"}
            style={{ borderColor: this.props.valid ? "green" : "red" }}
            value={this.props.value}
            onChange={this.handleUserInput}
          />
          {this.props.type === "url" ? (
            <DropDown Data={this.props.dropdown} userInput={this.props.value} />
          ) : (
            ""
          )}
          <FormErrors error={this.state.error} type={this.props.type} />
        </div>
      </div>
    );
  }
}
