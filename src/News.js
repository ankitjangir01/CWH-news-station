import React, { Component } from 'react';
import NewsItem from './NewsItem';


export default class News extends Component {
    articles = [];

    constructor() {
        super();
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        let url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=48ccfd98f01b4ff995fe26caf9cbd7fb&pageSize=12';
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })

    }

    handleNext = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 12)) { }
        else{
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=48ccfd98f01b4ff995fe26caf9cbd7fb&page=${this.state.page + 1}&pageSize=12`;
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                articles: parsedData.articles,
                page: this.state.page + 1,
            })
        }
    }
    handlePrev = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=48ccfd98f01b4ff995fe26caf9cbd7fb&page=${this.state.page - 1}&pageSize=12`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1,
        })
    }

    render() {
        return (
            <div className='container my-3'>
                <h2>News Station - Top Headlines</h2>
                <div className='row'>
                    {this.state.articles.map((element) => {
                        return (
                            <div className='col-md-4' key={element.url}>
                                <NewsItem title={element.title} description={element.description ? element.description.slice(0, 100) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                            </div>
                        )
                    })}
                </div>
                <div className='d-flex justify-content-around my-5'>
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-secondary" onClick={this.handlePrev}>&larr; Previous Page</button>
                    <button type="button" className="btn btn-secondary" onClick={this.handleNext}>Next Page &rarr;</button>
                </div>
            </div>
        )
    }
}
