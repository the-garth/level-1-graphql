import React from "react";
import { useQuery } from "@apollo/react-hooks";
// import gql from "graphql-tag";
import { Link } from "react-router-dom";
import POSTS_QUERY from "./Posts.graphql";

// const POSTS_QUERY = gql``;

export default function Posts() {
  const { loading, error, data, fetchMore } = useQuery(POSTS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { posts } = data;
  return (
    <div>
      <Link className="button" to="/post/new">
        New Post
      </Link>
      <ol className="posts-listing">
        <React.Fragment>
          {posts.map(({ id, title }, i) => (
            <li key={i}>
              <Link to={`/post/${id}`}>{title}</Link>
            </li>
          ))}
          <li>
            <button
              onClick={() =>
                fetchMore({
                  variables: {
                    skip: posts.length
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    return Object.assign({}, prev, {
                      posts: [...prev.posts, ...fetchMoreResult.posts]
                    });
                  }
                })
              }
            >
              Load More
            </button>
          </li>
        </React.Fragment>
      </ol>
    </div>
  );
}
