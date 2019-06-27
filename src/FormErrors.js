import React from "react";
export default class FormErrors extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="formErrors">
        <p>
          {this.props.formErrors[this.props.type].length > 0
            ? this.props.type
            : ""}
          {""}
          {this.props.formErrors[this.props.type].length > 0
            ? this.props.formErrors[this.props.type]
            : ""}
        </p>
      </div>
    );
  }
}
