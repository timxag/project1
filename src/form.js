import React from 'react';
import './index.css'
import { FormErrors } from './FormErrors'
var linkColor;
var titleColor;
export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            link: '',
            title: '',
            formErrors: { link: '', title: '' },
            linkValid: false,
            titleValid: false,
            formValid: false,

        }
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });

    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let linkValid = this.state.linkValid;
        let titleValid = this.state.titleValid;
        switch (fieldName) {
            case 'link':
                linkValid = value.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/i);
                fieldValidationErrors.link = linkValid ? '' : ' is invalid';
                linkColor = linkValid ? "green" : "red"

                break;
            case 'title':
                titleValid = value.length >= 3;
                fieldValidationErrors.title = titleValid ? '' : ' is too short';
                titleColor = titleValid ? "green" : "red"

                break;
            default:
                break;
        }
        console.log(linkValid);

        this.setState({
            formErrors: fieldValidationErrors,
            linkValid: linkValid,
            titleValid: titleValid,
        }, this.validateForm);

    }
    validateForm() {
        this.setState({
            formValid: this.state.linkValid &&
                this.state.titleValid
        });
    }
    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }
    handleSubmit(e) {
        e.preventDefault();
        {
            this.props.onSubmit(this.state.link, this.state.title)
        }
    }
    autoComplete(Arr, Input) {
        return Arr.filter(e => e.toLowerCase().includes(Input.toLowerCase()));
    }
    render() {

        return (
            <form className="inputform" onSubmit={this.handleSubmit.bind(this)} >
                <div className="requirements">
                    <FormErrors formErrors={this.state.formErrors} />

                </div>
                <div className={
                    `form-group
                    ${this.errorClass(this.state.formErrors.title)}`
                }>
                    <label htmlFor="link">Image URL</label>
                    <input type="link" className="form-control" autocomplete="off" list="cc"
                        style={{ borderColor: linkColor }}
                        name="link" value={this.state.link} onChange={this.handleUserInput} />
                </div>
                <br></br>
                <div className={`form-group
                 ${this.errorClass(this.state.formErrors.title)}`}>
                    <label htmlFor="title">Description</label>
                    <input type="title" className="form-control" autocomplete="off"
                        style={{ borderColor: titleColor }}
                        name="title" value={this.state.title} onChange={this.handleUserInput} />
                </div>
                <button type="submit" className="btn btn-primary"
                    disabled={!this.state.formValid}>Add</button>
                <datalist id="cc">
                    {this.props.arr.map(
                        arr => (
                            <option value={arr}></option>
                        )
                    )}
                </datalist>
            </ form >
        )
    }
}