import React from "react";
import "./index.css";
import { FormErrors } from "./FormErrors";

var linkColor;
var titleColor;
var counter = 1;

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.linkChange = this.linkChange.bind(this);
    this.autoComplete = this.autoComplete.bind(this);
    this.linkRef = React.createRef();
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      link: "",
      title: "",
      formErrors: { link: "", title: "" },
      linkValid: false,
      titleValid: false,
      formValid: false,
      data: this.props.arr
    };
  }
  autoComplete(Arr, Input) {
    return Arr.filter(e => e.includes(Input));
  }
  handleUserInput = ({ target: { name, value } }) => {
    this.validateField(name, value);
    let newData = this.autoComplete(this.props.arr, value);
    this.setState({ data: newData, [name]: value });
    console.log({ newData });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let linkValid = this.state.linkValid;
    let titleValid = this.state.titleValid;
    switch (fieldName) {
      case "link":
        linkValid = value.match(
          /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/i
        );
        fieldValidationErrors.link = linkValid ? "" : " is invalid";
        linkColor = linkValid ? "green" : "red";

        break;
      case "title":
        titleValid = value.length >= 3;
        fieldValidationErrors.title = titleValid ? "" : " is too short";
        titleColor = titleValid ? "green" : "red";

        break;
      default:
        break;
    }
    console.log(linkValid);

    this.setState(
      {
        formErrors: fieldValidationErrors,
        linkValid: linkValid,
        titleValid: titleValid
      },
      this.validateForm
    );
  }
  validateForm() {
    this.setState({
      formValid: this.state.linkValid && this.state.titleValid
    });
  }
  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }
  handleSubmit(e) {
    e.preventDefault();
    {
      this.props.onSubmit(this.state.link, this.state.title);
    }
  }
  show() {
    this.linkRef.current.classList.remove("dropdown_hid");
    this.linkRef.current.classList.add("dropdown1");
    this.linkRef.opened = true;
    console.log("show: ", this.linkRef);
  } //
  hide() {
    this.linkRef.current.classList.remove("dropdown1");
    this.linkRef.current.classList.add("dropdown_hid");
    this.linkRef.opened = false;
    console.log("hide:", this.linkRef);
  }
  linkChange(url) {
    this.setState({ link: url });
    this.hide();
  }
  componentDidMount() {
    window.addEventListener("click", this.linkRef.opened && this.hide());
  }
  componentWillUnmount() {
    window.deleteEventListener("click", this.linkRef.opened && this.hide());
  }
  render() {
    //console.log(this.linkRef);

    return (
      <>
        <form className="inputform" onSubmit={this.handleSubmit.bind(this)}>
          <div className="requirements">
            <FormErrors formErrors={this.state.formErrors} />
          </div>
          <div class="__inputWrapper" onClick={e => e.stopPropagation()}>
            <label htmlFor="link">Image URL</label>
            <input
              id="form"
              type="link"
              className="form-control"
              autocomplete="off"
              style={{ borderColor: linkColor }}
              onFocus={this.show}
              name="link"
              value={this.state.link}
              onChange={this.handleUserInput}
            />
            <br />
            <ul className="dropdown_hid" ref={this.linkRef} tabindex="0">
              {this.state.data.map(url => (
                <li tabIndex={counter++} onClick={() => this.linkChange(url)}>
                  {url}
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`form-group
                 ${this.errorClass(this.state.formErrors.title)}`}
          >
            <label htmlFor="title">Description</label>
            <input
              type="title"
              className="form-control"
              autocomplete="off"
              style={{ borderColor: titleColor }}
              name="title"
              value={this.state.title}
              onChange={this.handleUserInput}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!this.state.formValid}
          >
            Add
          </button>
        </form>
      </>
    );
  }
}
