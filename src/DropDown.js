import React from "react";
import "./index.css";
export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.linkRef = React.createRef();
    this.onWindowClick = this.onWindowClick.bind(this);
  }
  onWindowClick() {
    console.log({ linkRef: this.linkRef });
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
  } //
  hide() {
    this.linkRef.current.classList.remove("dropdown1");
    this.linkRef.current.classList.add("dropdown_hid");
  }
  render() {
    return (
      <>
        <ul className="dropdown1" ref={this.linkRef}>
          {this.props.Data.map(url => (
            <li key={url} tabIndex="0" onClick={() => this.linkChange(url)}>
              {url}
            </li>
          ))}
        </ul>
      </>
    );
  }
}
