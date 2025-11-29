import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;

    return (
      <div className="my-3">
        <div className="card">

          <div style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute', left: '0'}}>
            <span className="badge rounded-pill bg-danger">{source}</span>
          </div>

          <img src={!imageUrl ? "https://tse1.mm.bing.net/th/id/OIP.jHvTOSF7924Ah63W7mozxQHaEo?pid=Api&P=0&h=180" : imageUrl } />

          <div className="card-body">
            <h5 className="card-title"></h5>
            <p className="card-text">{description}</p>
            <p className="card-text text-danger ">
              <small></small>By{" "}
              {!author ? "Unkown" : author} on {new Date(date).toGMTString()}
            </p>
            <a href={newsUrl} target="_blank" className="btn btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
