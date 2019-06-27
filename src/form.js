import React from "react";
import "./index.css";
import FormErrors from "./FormErrors";

var linkColor;
var titleColor;
var counter = -1;

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.linkChange = this.linkChange.bind(this);
    this.autoComplete = this.autoComplete.bind(this);
    this.linkRef = React.createRef();
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.onWindowClick = this.onWindowClick.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
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
  handleUserInput({ target: { name, value } }) {
    this.validateField(name, value);
    let newData = this.autoComplete(this.props.arr, value);
    this.setState({ data: newData, [name]: value });
    // console.log({ newData });
  }

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
      this.setState({ link: "", title: "" });
    }
  }
  show() {
    this.linkRef.current.classList.remove("dropdown_hid");
    this.linkRef.current.classList.add("dropdown1");
    // console.log("show: ", this.linkRef);
  } //
  hide() {
    this.linkRef.current.classList.remove("dropdown1");
    this.linkRef.current.classList.add("dropdown_hid");
    console.log(this.state.link);
    console.log(this.state.title);

    this.validateField(this.state.link, this.state.title);

    // console.log("hide:", this.linkRef);
    counter = -1;
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
  onWindowClick() {
    // console.log({ linkRef: this.linkRef });
    var checkClass = this.linkRef.current.classList.contains("dropdown1");
    if (checkClass) this.hide();
  }
  componentDidMount() {
    window.addEventListener("click", this.onWindowClick);
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.onWindowClick);
  }
  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.setState({ link: this.state.data[counter] });
      this.handleUserInput({
        target: {
          name: "link",
          value: this.state.data[counter]
        }
      });
      var checkClass = this.linkRef.current.classList.contains("dropdown1");
      if (checkClass) this.hide();
    }
    if (event.key === "Tab") {
      counter++;
    }
  };
  render() {
    console.log("after: ", this.state.link);
    console.log("after: ", this.state.title);
    return (
      <>
        <form className="inputform" onSubmit={this.handleSubmit.bind(this)}>
          <div
            className="__inputWrapper"
            onKeyDown={this.handleKeyPress.bind(this)}
            onClick={e => e.stopPropagation()}
          >
            <label htmlFor="link">Image URL</label>
            <input
              type="link"
              className="form-control"
              autoComplete="off"
              style={{ borderColor: linkColor }}
              onFocus={this.show}
              name="link"
              value={this.state.link}
              onChange={this.handleUserInput}
            />
            <div className="requirements">
              <FormErrors formErrors={this.state.formErrors} type="link" />
            </div>
            <br />
            <ul className="dropdown_hid" ref={this.linkRef}>
              {this.state.data.map(url => (
                <li key={url} tabIndex="0" onClick={() => this.linkChange(url)}>
                  {url}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <label htmlFor="title">Description</label>
            <input
              type="title"
              className="form-control"
              autoComplete="off"
              style={{ borderColor: titleColor }}
              name="title"
              value={this.state.title}
              onChange={this.handleUserInput}
            />
            <div className="requirements">
              <FormErrors formErrors={this.state.formErrors} type="title" />
            </div>
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
