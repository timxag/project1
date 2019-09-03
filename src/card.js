import React from "react";
import "./card.css";
export default class Card extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="flex-itm">
        <img src={this.props.url} width="100%" />
        <span tabIndex="0">
          <div
            key={this.props.url + this.props.title}
            className="close"
            onClick={this.props.onDelete}
          >
            X
          </div>
        </span>
        <div className="dop_info">{this.props.title}</div>
        <img
          src="https://images.gr-assets.com/hostedimages/1414861120ra/11699799.gif"
          width="50px"
          className="preloader"
        />
      </div>
    );
  }
}
