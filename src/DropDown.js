import React from "react";
import "./index.css";
var counter = 0;
export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.linkRef = React.createRef();
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  handleKeyPress = (url, event) => {
    if (event.key === "Enter") {
      this.props.Change(
        {
          target: {
            name: "link",
            value: url
          }
        },
        true
      );
    }
  };
  linkChange(url) {
    // this.setState({ link: url });
    this.hide();
    this.props.Change(
      {
        target: {
          name: "link",
          value: url
        }
      },
      true
    );
  }
  show() {
    if (this.linkRef.current != null) {
      this.linkRef.current.classList.remove("dropdown_hid");
      this.linkRef.current.classList.add("dropdown1");
    }
  } //
  hide() {
    if (this.linkRef.current != null) {
      this.linkRef.current.classList.remove("dropdown1");
      this.linkRef.current.classList.add("dropdown_hid");
    }
  }
  render() {
    // console.log(this.props.isOpen);
    // console.log(this.linkRef);
    this.props.isOpen && this.linkRef !== null ? this.show() : this.hide();
    return (
      <>
        <ul
          onClick={e => e.stopPropagation()}
          className="dropdown1"
          ref={this.linkRef}
        >
          {this.props.Data.map(url => (
            <li
              key={url}
              tabIndex="0"
              onClick={() => this.linkChange(url)}
              onKeyDown={this.handleKeyPress.bind(this, url)}
            >
              {url}
            </li>
          ))}
        </ul>
      </>
    );
  }
}
