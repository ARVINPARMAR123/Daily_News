import React, { Component } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import sampleNews from "../Sample.json";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

const FALLBACK_ERROR_MESSAGE = "Live headlines could not be loaded, so sample stories are shown instead.";

export default class News extends Component {
  static defaultProps = {
    category: "general",
    pageSize: 10,
    setProgress: () => {},
  };

  static propTypes = {
    category: PropTypes.string,
    pageSize: PropTypes.number,
    setProgress: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      error: null,
      loading: false,
      page: 1,
      totalResults: 0,
      usingFallback: false,
    };
  }

  componentDidMount() {
    this.updateDocumentTitle();
    this.fetchNews(1);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.updateDocumentTitle();
      this.fetchNews(1);
    }
  }

  getApiKey = () => {
    return (process.env.REACT_APP_NEWS_API || "").trim().replace(/^["']|["']$/g, "");
  };

  capitalizeFirstLetter = (value) => {
    if (!value) {
      return "";
    }

    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  updateDocumentTitle = () => {
    document.title = `${this.capitalizeFirstLetter(this.props.category)} | DailyNews`;
  };

  normalizeArticles = (articles = []) => {
    return articles.filter(Boolean).map((article, index) => ({
      ...article,
      author: article.author || "DailyNews Desk",
      description: article.description || "Open the article for the full story and additional context.",
      publishedAt: article.publishedAt || new Date().toISOString(),
      source: article.source && article.source.name ? article.source : { name: "DailyNews" },
      title: article.title || "Top story",
      url: article.url || `https://news.google.com/topstories?hl=en-US&gl=US&ceid=US:en#story-${this.props.category}-${index}`,
      urlToImage: article.urlToImage || "",
    }));
  };

  mergeArticles = (currentArticles, incomingArticles) => {
    const seen = new Set();

    return [...currentArticles, ...incomingArticles].filter((article, index) => {
      const uniqueKey = article.url || `${article.title}-${article.publishedAt}-${index}`;

      if (seen.has(uniqueKey)) {
        return false;
      }

      seen.add(uniqueKey);
      return true;
    });
  };

  useFallbackData = (page, append, errorMessage = FALLBACK_ERROR_MESSAGE) => {
    const fallbackArticles = this.normalizeArticles(sampleNews.articles || []);
    const startIndex = (page - 1) * this.props.pageSize;
    const pageSlice = fallbackArticles.slice(startIndex, startIndex + this.props.pageSize);

    this.setState((prevState) => ({
      articles: append ? this.mergeArticles(prevState.articles, pageSlice) : pageSlice,
      error: errorMessage,
      loading: false,
      page,
      totalResults: fallbackArticles.length,
      usingFallback: true,
    }));
  };

  handleFetchFailure = (page, append, errorMessage) => {
    if (append && this.state.articles.length > 0) {
      this.setState((prevState) => ({
        error: errorMessage,
        loading: false,
        totalResults: prevState.articles.length,
        usingFallback: false,
      }));
      return;
    }

    this.useFallbackData(page, append, errorMessage);
  };

  fetchNews = async (page = 1, append = false) => {
    const apiKey = this.getApiKey();

    this.props.setProgress(10);
    this.setState({ error: null, loading: true });

    if (!apiKey) {
      this.useFallbackData(page, append, "News API key is missing, so sample headlines are being shown instead.");
      this.props.setProgress(100);
      return;
    }

    try {
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${apiKey}&page=${page}&pageSize=${this.props.pageSize}`;
      const response = await fetch(url);

      this.props.setProgress(45);

      if (!response.ok) {
        throw new Error("The news service returned an unexpected response.");
      }

      const parsedData = await response.json();

      this.props.setProgress(75);

      if (parsedData.status !== "ok") {
        throw new Error(parsedData.message || FALLBACK_ERROR_MESSAGE);
      }

      const incomingArticles = this.normalizeArticles(parsedData.articles);

      this.setState((prevState) => ({
        articles: append ? this.mergeArticles(prevState.articles, incomingArticles) : incomingArticles,
        error: null,
        loading: false,
        page,
        totalResults: parsedData.totalResults || incomingArticles.length,
        usingFallback: false,
      }));
    } catch (error) {
      this.handleFetchFailure(page, append, error.message || FALLBACK_ERROR_MESSAGE);
    } finally {
      this.props.setProgress(100);
    }
  };

  fetchMoreData = async () => {
    if (this.state.loading || this.state.articles.length >= this.state.totalResults) {
      return;
    }

    const nextPage = this.state.page + 1;
    await this.fetchNews(nextPage, true);
  };

  render() {
    const headlineLabel = this.capitalizeFirstLetter(this.props.category);
    const { articles, error, loading, totalResults, usingFallback } = this.state;
    const hasMore = !loading && articles.length < totalResults;

    return (
      <section className="container news-page">
        <div className="page-hero">
          <p className="page-kicker">Live Headlines</p>
          <h1 className="page-hero__title">Top {headlineLabel} Headlines</h1>
          <p className="page-hero__copy">
            Browse the latest {this.props.category} stories with concise summaries, reliable source labels, and an interface tuned for fast reading.
          </p>
          <span className="page-hero__meta">{usingFallback ? "Showing sample headlines" : "Live feed active"}</span>
        </div>

        {error ? (
          <div className="news-status news-status--warning" role="status">
            {error}
          </div>
        ) : null}

        {loading && articles.length === 0 ? <Spinner /> : null}

        {!loading && articles.length === 0 ? (
          <div className="news-status news-status--empty">No articles are available in this section right now.</div>
        ) : null}

        <InfiniteScroll
          className="news-feed"
          dataLength={articles.length}
          next={this.fetchMoreData}
          hasMore={hasMore}
          loader={articles.length > 0 ? <Spinner /> : null}
          endMessage={articles.length > 0 ? <p className="news-end">No more stories in this section right now.</p> : null}
          scrollThreshold="220px"
        >
          <div className="row g-4 news-grid">
            {articles.map((article, index) => (
              <div className="col-sm-6 col-xl-4" key={article.url || `${article.title}-${index}`}>
                    <NewsItem
                      author={article.author}
                      date={article.publishedAt}
                      description={article.description}
                      imageUrl={article.urlToImage}
                      newsUrl={article.url}
                      source={article.source.name}
                      title={article.title}
                    />
              </div>
            ))}
          </div>
        </InfiniteScroll>

      </section>
    );
  }
}
