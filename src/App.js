import React from "react";
import Card from "./card";
import InfiniteScroll from "react-infinite-scroll-component";
import Form from "./form";
import _ from "lodash";

import { Container, Draggable } from "react-smooth-dnd";

const API = "https://jsonplaceholder.typicode.com/photos";

var count = 19;
var titles = [];
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmitElement = this.handleSubmitElement.bind(this);
    //this.handleValidation = this.handleValidation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteElement = this.handleDeleteElement.bind(this);
    this.onScroll = _.throttle(this.handleSubmitElement, 450);
    this.state = {
      hit: []
    };
  }

  handleDeleteElement = id => {
    fetch(API + "/" + id, {
      method: "DELETE"
    })
      .then(() => {
        this.count--;
        this.setState(prevState => ({
          hit: prevState.hit.filter(hit => hit.id != id)
        }));
      })
      .catch(err => {
        alert(err);
      });
  }; /* */
  handleSubmitElement() {
    // e.preventDefault();
    fetch(API)
      .then(response => response.json())
      .then(data => {
        this.setState({
          hit: [...this.state.hit, ...data.slice(count, count + 4)]
        });
      });
    count += 4;
    console.log(count);
  }
  componentWillMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ hit: data.slice(0, 19) }));
    const { hit } = this.state;
    hit.map(function() {
      titles = [...titles, hit.url];
    });
  }
  handleSubmit(url, text) {
    // e.preventDefault();
    const formData = new FormData();
    formData.append("title", text);
    formData.append("url", url);
    fetch(API, {
      method: "POST",
      body: formData
    })
      .then(() => {
        //
        count++;
        this.setState({
          hit: [
            ...this.state.hit,
            {
              id: count,
              url: url,
              title: text
            }
          ]
        });
      })
      .catch(err => {
        alert(err);
      });
  }
  render() {
    const { hit } = this.state;
    for (var key in hit) {
      titles[key] = hit[key].url;
    }
    return (
      <>
        <InfiniteScroll
          dataLength={count}
          next={this.onScroll}
          hasMore={count < 5300 ? true : false}
          scrollableTarget="scrollableDiv"
          scrollThreshold="80%"
          loader={
            <img
              src="https://images.gr-assets.com/hostedimages/1414861120ra/11699799.gif"
              width="50px"
              className="preloader"
            />
          }
        >
          <div className="flex">
            <Form arr={titles} onSubmit={this.handleSubmit} />
            {hit.map(hit => (
              <Card
                key={hit.id}
                id={hit.id}
                url={hit.url}
                title={hit.title}
                onDelete={() => {
                  this.handleDeleteElement(hit.id);
                }}
              />
            ))}
          </div>
        </InfiniteScroll>
        <button
          type="submit"
          className="show_more"
          onClick={this.handleSubmitElement}
        >
          Show more
        </button>
      </>
    );
  }
}
