import React, { Component } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types'

export default class News extends Component {
    articles = [];
    constructor() {
        super();
        this.state = {
            articles: this.articles,
            loading: true,
            page: 1
        }
    }

    async componentDidMount() {
        this.updatePage();
    }

    async updatePage(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=48ccfd98f01b4ff995fe26caf9cbd7fb&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        })
    }

    handleNext = async () => {
        this.setState({
            loading: true,
            page: this.state.page + 1,
        })
        this.updatePage();
    }
    handlePrev = async () => {
        this.setState({
            loading: true,
            page: this.state.page - 1,
        })
        this.updatePage();
    }

    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center'>News Station - Top Headlines</h1>
                {
                    this.state.loading && <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only"></span>
                        </div>
                        <h4 className='mx-3'>Loading...</h4>
                    </div>
                }
                <div className='row my-5'>
                    {!this.state.loading && this.state.articles.map((element) => {
                        return (
                            <div className='col-md-4' key={element.url}>
                                <NewsItem title={element.title} description={element.description ? element.description.slice(0, 100) : ""}
                                imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                            </div>
                        )
                    })}
                </div>
                <div className='d-flex justify-content-around my-5'>
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-secondary" onClick={this.handlePrev}>&larr; Previous Page</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-secondary" onClick={this.handleNext}>Next Page &rarr;</button>
                </div>
            </div>
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