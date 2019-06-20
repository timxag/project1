import React from 'react';

const API = 'https://jsonplaceholder.typicode.com/photos';
var count = 20;
export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmitElement = this.handleSubmitElement.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.state = {
      hit: [

      ],
      fields: {},
      errors: {}
    };
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
      if (!fields["text"].match(/^[a-zA-Zа-яА-Я]+$/)) {
        formIsValid = false;
        errors["text"] = "Only letters";
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
            ...data.slice(count, count + 12)
          ]
        })
      });


    count += 12;
    //count += 8 + (count % 4);

    /*this.setState({
      hit: [...this.state.hit,this.datta
    })*/
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
  }
  componentWillMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ hit: data.slice(0, 19) }));

  }

  render() {
    const { hit } = this.state;

    return (
      <span>

        <div className="flex">
          <div>
            <form name="inputform" className="inputform" onSubmit={this.handleSubmit.bind(this)}>
              <div >
                <fieldset>
                  <input refs="link" type="text" size="30" placeholder="link" onChange={this.handleChange.bind(this, "link")} value={this.state.fields["link"]} />
                  <p className="error">{this.state.errors["link"]}</p>

                  <input ref="text" type="text" size="30" placeholder="title" onChange={this.handleChange.bind(this, "text")} value={this.state.fields["text"]} />
                  <p className="error">{this.state.errors["text"]}</p>

                  <button class="inputbtn" id="submit" value="Submit">Add</button>
                </fieldset>
              </div>

            </form>
          </div>



          {hit.map(hit =>
            <div key={hit.id} className="flex-itm" >
              <img src={hit.url} width="100%" />
              <div key={hit.id} className="close" onClick={() => { this.handleDeleteElement(hit.id) }}>X</div>
              <div className="dop_info">{hit.title}</div>

            </div>
          )}
        </div><form onSubmit={this.handleSubmitElement} >

          <button type="submit" class="show_more" >Show more</button>
        </form>
      </span>

    );
  }

}
