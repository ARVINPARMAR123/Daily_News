import React, { Component } from "react";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80";

export default class NewsItem extends Component {
  handleImageError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = FALLBACK_IMAGE;
  };

  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    let publishedAt = date ? new Date(date).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }) : "Date unavailable";

    return (
      <article className="news-card">
        <div className="news-card__media">
          <span className="source-badge">{source}</span>
          <img
            className="news-card__image"
            src={imageUrl || FALLBACK_IMAGE}
            alt={title ? `Cover image for ${title}` : "Headline illustration"}
            onError={this.handleImageError}
          />
        </div>

        <div className="news-card__body">
          <div className="news-card__copy">
            <h2 className="news-card__title">{title}</h2>
            <p className="news-card__description">{description}</p>
          </div>
          <p className="news-card__meta">
            By <strong>{author || "Unknown"}</strong>
            <span className="news-card__dot" aria-hidden="true"></span>
            {publishedAt}
          </p>
          <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark news-card__button">
            Read full story
          </a>
        </div>
      </article>
    );
  }
}
