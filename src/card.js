import React from 'react';
import './card.css'
export default class Card extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>

                <div key={this.props.id} className="flex-itm" >
                    <img src={this.props.url} width="100%" />
                    <div key={this.props.id} className="close" onClick={this.props.onDelete}>X</div>
                    <div className="dop_info">{this.props.title}</div>
                </div>

            </div>)
    }
}