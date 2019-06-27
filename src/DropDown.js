import React from "react";
import "./index.css";
import FormErrors from "./FormErrors";
var linkColor;
var Color;
export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
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
  handleKeyPress = (url, event) => {
    if (event.key === "Enter") {
      this.handleUserInput({
        target: {
          name: "link",
          value: url
        }
      });
      var checkClass = this.linkRef.current.classList.contains("dropdown1");
      if (checkClass) this.hide();
    }
    if (event.key === "Tab") {
    }
  };

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
  }
  render() {
    return <></>;
  }
}
