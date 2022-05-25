import React, { Component } from 'react';

export default class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl } = this.props;
        return (
            <div>
                <div className="card" style={{width: '18rem'}}>
                    <img src={imageUrl ? imageUrl : 'https://images.indianexpress.com/2022/05/NASA-Mars-mission-plan-released-featured-May-2022.jpg'}
                        className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <a href={newsUrl} className="btn-sm btn-primary">Read More</a>
                        </div>
                </div>
            </div>
        )
    }
}