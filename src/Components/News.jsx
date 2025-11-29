import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes, { element, string } from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"

export default class News extends Component {

  static defaultProps = {
    pageSize: 10,
    category: "general"
  }
  static propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - DailyNews`;
  }

  async updateNews(pageNo) {
    this.props.setProgress(0);
    let url =`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=f248159ada5a48f88ec4eddf93579647&pages=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    this.props.setProgress(40);
    let parseData = await data.json();
    this.props.setProgress(70);
    this.setState({ 
      articles: parseData.articles, 
      totalResults: parseData.totalResults,
      loading: false
   });
   this.props.setProgress(100);
  }
  async componentDidMount() {
  //   let url =`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=f248159ada5a48f88ec4eddf93579647&pageSize=${this.props.pageSize}`;
  //   this.setState({loading: true})
  //   let data = await fetch(url);
  //   let parseData = await data.json();
  //   this.setState({ 
  //     articles: parseData.articles, 
  //     totalResults: parseData.totalResults,
  //     loading: false
  //  });
  this.updateNews()
  }

  // handlePrev = async() => {
  //   console.log("Previous");
  //   // let url =`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=f248159ada5a48f88ec4eddf93579647&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   // this.setState({loading: true});
  //   // let data = await fetch(url);
  //   // let parseData = await data.json();

  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   //   articles: parseData.articles,
  //   //   loading: false 
  //   // })
  //   this.setState({page: this.state.page - 1 })
  //   this.updateNews()
  // }

  // handleNext = async() => {
  //   console.log("Next");
  //   // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/14))) {
  //   //   let url =`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=f248159ada5a48f88ec4eddf93579647&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //   //   this.setState({loading: true});
  //   //   let data = await fetch(url);
  //   //   let parseData = await data.json();

  //   //   this.setState({
  //   //     page: this.state.page + 1,
  //   //     articles: parseData.articles,
  //   //     loading: false
  //   //   })
  //   // }
  //   this.setState({page: this.state.page + 1 })
  //   this.updateNews()
  // }

  fetchMoreData = async () => {
    this.setState({page: this.state.page + 1})
    let url =`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=f248159ada5a48f88ec4eddf93579647&pages=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({ 
      articles: this.state.articles.concat(parseData.articles), 
      totalResults: parseData.totalResults,
      loading: false
   });
  };


  render() {
    return (

      <div className="container my-3">
        <h1 className="text-center my-4">DailyNews - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {/* {this.state.loading && <Spinner />} */}

        <InfiniteScroll
          key={element.url}
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (

                  <div className="col-md-4" key={element.urlToImage}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={element.description ? element.description.slice(0, 88) : ""}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePrev}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-primary" onClick={this.handleNext}>Next &rarr;</button>
        </div> */}

      </div>
    );
  }
}
