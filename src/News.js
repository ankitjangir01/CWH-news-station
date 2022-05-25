import React, { Component } from 'react';
import NewsItem from './NewsItem';


export default class News extends Component {
    articles = [];

    constructor() {
        super();
        this.state = {
            articles: this.articles,
            loading: false
        }
    }

    async componentDidMount(){
        let url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=48ccfd98f01b4ff995fe26caf9cbd7fb';
        let data = await fetch(url);
        let parsedData =  await data.json();
        this.setState({articles: parsedData.articles})

    }

    render() {
        return (
            <div className='container my-3'>
                <h2>News Station - Top Headlines</h2>
                <div className='row'>
                    {this.state.articles.map((element) => {
                        return (
                            <div className='col-md-4' key={element.url}>
                                <NewsItem title={element.title} description={element.description? element.description.slice(0,100) : ""} imageUrl={element.urlToImage} newsUrl={element.url}/>
                            </div>
                        )
                    })}
                </div>

            </div>
        )
    }
}
