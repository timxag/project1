import React from 'react';
import Sortable from 'react-sortablejs';
import { Draggable, Droppable } from 'react-drag-and-drop'
import uniqueId from 'lodash/uniqueId';

const API = 'https://jsonplaceholder.typicode.com/photos?albumId=1';
var count = 20;
export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmitElement = this.handleSubmitElement.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    var link = props.link;
    var text = props.text;
    var linkIsValid = this.validateLink(link);
    var textIsValid = this.validateText(text);
    this.state = { link: link, text: text, linkValid: false, textValid: false };

    this.onLinkChange = this.onLinkChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.state = {
      hit: [

      ],
      datta: [],
      link: link,
      text: text,
      linkIsValid: linkIsValid,
      textIsValid: textIsValid,
    };
  }
  validateLink(link) {
    return link.length >= 7;
  }
  validateText(text) {
    return text.length >= 1;
  }
  onLinkChange(e) {
    var val = e.target.value;
    var valid = this.validateLink(val);
    this.setState({ link: val, linkValid: valid });
  }
  onTextChange(e) {
    var val = e.target.value;
    var valid = this.validateText(val);
    this.setState({ text: val, textValid: valid });
  }
  handleDeleteElement = id => {
    fetch(API + "/" + id, {
      method: 'DELETE'
    }).then(() => {
      count--;
      this.setState(prevState => ({
        hit: prevState.hit.filter(hit => hit.id != id),
      }));
    }).catch(err => {
      alert(err);
    });

  };
  handleSubmitElement(e) {
    e.preventDefault();
    fetch(API)
      .then(response => response.json())
      .then(data => {
        this.setState({
          hit: [
            ...this.state.hit,
            ...data.slice(0, count + 10)
          ]
        })
      });
    count += 10;
    /*this.setState({
      hit: [...this.state.hit,this.datta
    })*/
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.textValid === true
      &&
      this.state.linkValid === true) {
      const formData = new FormData();
      formData.append('title', this.state.text);
      formData.append('url', this.state.link);
      fetch(API, {
        method: 'POST',
        body: formData
      })
        .then(() => {
          //
          count++;
          this.setState({
            hit: [...this.state.hit, {
              id: count,
              url: this.state.link,
              title: this.state.text
            }]
          })
        })
        .catch(err => {
          alert(err);
        });
    }
    else
      alert("Validation error!");
  }
  componentWillMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ hit: data.slice(0, 20) }));

  }

  render() {
    const { hit } = this.state;
    var linkColor = this.state.linkValid === true ? "green" : "red";
    var textColor = this.state.textValid === true ? "green" : "red";
    return (
      <div className="flex">
        <form onSubmit={this.handleSubmit}>
          <p>
            <label>LINK:</label><br />
            <input type="link" ref={this.link}
              onChange={this.onLinkChange} style={{ borderColor: linkColor }} />
          </p>
          <p>
            <label>TEXT:</label><br />
            <input type="text" ref={this.text}
              onChange={this.onTextChange} style={{ borderColor: textColor }} />
          </p>
          <input type="submit" value="Отправить" />
        </form>
        <form onSubmit={this.handleSubmitElement} >

          <button type="submit" class="submit" >Add</button>
        </form>
        <br /><br />
        {hit.map(hit =>
          <div key={hit.id} className="flex-itm" >
            <img src={hit.url} width="100%" />
            <div key={hit.id} className="close" onClick={() => { this.handleDeleteElement(hit.id) }}>X</div>
            <div className="dop_info">{hit.title}</div>

          </div>
        )}
      </div>
    );
  }

}
//