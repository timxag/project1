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
  /*
  render() {
    console.log("after: ", this.state.link);
    console.log("after: ", this.state.title);
    return (
      <>
        <form className="inputform" onSubmit={this.handleSubmit.bind(this)}>
          <div className="__inputWrapper" onClick={e => e.stopPropagation()}>
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
                <li
                  key={url}
                  tabIndex="0"
                  onClick={() => this.linkChange(url)}
                  onKeyDown={e => this.handleKeyPress(url, e)}
                  onKeyDown={this.handleKeyPress.bind(this, url)}
                >
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
  }*/
}
