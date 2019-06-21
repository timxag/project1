import React from 'react';
import './index.css'
export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.handleValidation = this.handleValidation.bind(this);
        this.state = {
            fields: {},
            errors: {},
        }
    }
    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        if (!fields["text"]) {
            formIsValid = false;
            errors["text"] = "Cannot be empty";
        }
        if (typeof fields["text"] !== "undefined") {
            if (!fields["text"].match(/^[a-zA-Zа-яА-Я0-9]+$/)) {
                formIsValid = false;
                errors["text"] = "Only letters and numbers";
            }
        }
        if (!fields["link"]) {
            formIsValid = false;
            errors["link"] = "Cannot be empty";
        }

        if (typeof fields["link"] !== "undefined") {
            let lastAtPos = fields["link"].lastIndexOf('/');
            let lastDotPos = fields["link"].lastIndexOf('.');

            if (!(lastAtPos > 0 && fields["link"].indexOf('///') == -1 && lastDotPos > 2 && (fields["link"].length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["link"] = "Link is not valid";
            }
        }



        this.setState({ errors: errors });
        return formIsValid;
    }
    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.handleValidation()) {
            this.props.onSubmit(this.state.fields["link"], this.state.fields["text"])
        }
    }
    render() {
        return (
            <div className="flex">
                <div>
                    <form name="inputform" className="inputform" onSubmit={this.handleSubmit.bind(this)}>
                        <div >
                            <fieldset>
                                <input
                                    refs="link"
                                    type="link"
                                    size="30"
                                    placeholder="link"
                                    onChange={this.handleChange.bind(this, "link")}
                                    value={this.state.fields["link"]} />
                                <p className="error">{this.state.errors["link"]}</p>

                                <input
                                    ref="text"
                                    type="text"
                                    size="30"
                                    placeholder="title"
                                    onChange={this.handleChange.bind(this, "text")}
                                    value={this.state.fields["text"]} />
                                <p className="error">{this.state.errors["text"]}</p>

                                <button class="inputbtn" id="submit" value="Submit">Add</button>
                            </fieldset>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}