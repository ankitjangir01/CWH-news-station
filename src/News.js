import React, { Component } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
    articles = [];
    constructor(props) {
        super(props);
        this.state = {
            articles: this.articles,
            loading: true,
            page: 1,
            totalResults: 0,
        }
        document.title = `${this.props.category} -News Station`;
    }

    async componentDidMount() {
        this.updatePage();
    }

    async updatePage() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=48ccfd98f01b4ff995fe26caf9cbd7fb&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page + 1,
            articles: this.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false,
        })
    }

    fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=48ccfd98f01b4ff995fe26caf9cbd7fb&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false,
        })
    }

    render() {
        return (
            <>
                <h1 className='text-center'>News Station -Top Headlines from {`${this.props.category}`}</h1>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length != this.state.totalResults}
                    loader={
                        <>
                            <div className='container text-center'>
                                <div className="spinner-border" role="status">
                                    <span className="sr-only"></span>
                                </div>
                                <h4>Loading...</h4>
                            </div>
                        </>
                    }
                >
                    <div className='container'>
                        <div className='row my-5'>
                            {this.state.articles.map((element) => {
                                return (
                                    <div className='col-md-4' key={element.url}>
                                        <NewsItem title={element.title} description={element.description ? element.description.slice(0, 100) : ""}
                                            imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}

News.defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general',
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
}