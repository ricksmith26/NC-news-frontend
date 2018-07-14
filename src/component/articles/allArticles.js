import React from 'react';
import { Link } from 'react-router-dom';

function AllArticles({ articles }) {
  return (
    <div className="articlesDiv">
      <ul>
        {articles.map(function(article) {
          return (
            <li>
              <br />
              <b>
                <Link to={`/articles/${article._id}`}> {article.title}</Link>
              </b>
              <br />
              <br />
              {article.body}
              <br />
              <br />
              <Link to={`/users/${article.created_by}`}>
                Author Profile: {article.created_by}
              </Link>
              <br />
              {article.belongs_to}
              <br />
              <Link to={`/articles/${article._id}/comments`}>
                {' '}
                <button id={article._id}>Comments:{article.comments}</button>
              </Link>{' '}
              Votes: {article.votes}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AllArticles;
