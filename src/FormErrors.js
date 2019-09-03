import React from "react";
export default class FormErrors extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="requirements">
        <p>
          {this.props.error.length > 0 ? this.props.type : ""}
          {this.props.error.length > 0 ? this.props.error : ""}
        </p>
      </div>
    );
  }
}
