import React from 'react';
import Card from './card'
const API = 'https://jsonplaceholder.typicode.com/photos';
var count = 19;
export default class App extends React.Component {

  constructor(props) {
    super(props);
    //this.handleSubmitElement = this.handleSubmitElement.bind(this);
    //this.handleValidation = this.handleValidation.bind(this);
    //this.handleDeleteElement = this.handleDeleteElement.bind(this);
    this.state = {
      hit: [

      ],
      fields: {},
      errors: {}
    };
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

  };/* 
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
      //count += 8 + (count % 4);
  
   
    }
  
    handleSubmit(e) {
      e.preventDefault();
      if (this.handleValidation()) {
        const formData = new FormData();
        formData.append('title', this.state.fields["text"]);
        formData.append('url', this.state.fields["link"]);
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
                url: this.state.fields["link"],
                title: this.state.fields["text"]
              }]
            })
          })
          .catch(err => {
            alert(err);
          });
      }
    }*/
  componentWillMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ hit: data.slice(0, 19) }));

  }

  render() {
    const { hit } = this.state;

    return (
      <div>

        {
          hit.map(hit =>
            (<Card id={hit.id} url={hit.url} title={hit.title} onDelete={() => { this.handleDeleteElement(hit.id) }} />))
        }


      </div>
    );
  }

}
