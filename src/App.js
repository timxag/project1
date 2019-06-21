import React from 'react';
import Card from './card'

import Form from './form'
const API = 'https://jsonplaceholder.typicode.com/photos';
var count = 19;
export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmitElement = this.handleSubmitElement.bind(this);
    //this.handleValidation = this.handleValidation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteElement = this.handleDeleteElement.bind(this);
    this.state = {
      hit: [

      ],

    };
  }
  handleDeleteElement = id => {
    fetch(API + "/" + id, {
      method: 'DELETE'
    }).then(() => {
      this.count--;
      this.setState(prevState => ({
        hit: prevState.hit.filter(hit => hit.id != id),
      }));
    }).catch(err => {
      alert(err);
    });

  };/* */
  handleSubmitElement(e) {
    e.preventDefault();
    fetch(API)
      .then(response => response.json())
      .then(data => {
        this.setState({
          hit: [
            ...this.state.hit,
            ...data.slice(count, count + 12)
          ]
        })
      });
    count += 12;
  }
  componentWillMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ hit: data.slice(0, 19) }));

  }
  handleSubmit(url, text) {
    // e.preventDefault();
    const formData = new FormData();
    formData.append('title', text);
    formData.append('url', url);
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
            url: url,
            title: text
          }]
        })
      })
      .catch(err => {
        alert(err);
      });
  }
  render() {
    const { hit } = this.state;

    return (
      <>
        <div className="flex">
          <Form
            onSubmit={this.handleSubmit}
          />
          {
            hit.map(hit =>
              (<Card
                key={hit.id}
                id={hit.id}
                url={hit.url}
                title={hit.title}
                onDelete={() => { this.handleDeleteElement(hit.id) }} />))
          }

        </div>
        <button type="submit" className="show_more" onClick={this.handleSubmitElement} >Show more</button>
      </>
    );
  }

}
