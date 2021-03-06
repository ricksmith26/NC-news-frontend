import React from 'react';
import { Link } from 'react-router-dom';

function AllArticles({ articles }) {
   
  return (
    <div className="articlesDiv">
      <div className="gallery">
        {articles.map(function(article) {
       
          return (
            <figure className="gallery-item">
              <div className="thumbnail">
                <b>
                  <Link to={`/articles/${article._id}`}>
                    {' '}
                    <h2 className="ArtTitle">{article.title}</h2>
                  </Link>
                </b>
                <br />
                <br />
                {article.body}
                <br />
                <br />
                <Link to={`/users/${article.created_by}`}>
                  <h4 className="author">
                    Author Profile: {article.created_by}
                  </h4>
                </Link>
                <br />
                {article.belongs_to}
                <br />
                <Link to={`/articles/${article._id}/comments`}>
                  {' '}
                  <button id={article._id}>Comments:{article.comments}</button>
                </Link>{' '}
                Votes: {article.votes}
              </div>
            </figure>
          );
        })}
      </div>
    </div>
  );
}

export default AllArticles;
