import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import UpdatePost from "./UpdatePost";
import EditMode from "./EditMode";

const POST_QUERY = gql`
  query post($id: ID!) {
    post(where: { id: $id }) {
      id
      title
      body
      checked
      createdAt
    }
    isEditMode @client #This is for apollo Link state
  }
`;

const UPDATE_POST = gql`
  mutation updatePost($id: ID!, $checked: Boolean) {
    updatePost(where: { id: $id }, data: { checked: $checked }) {
      checked
    }
  }
`;

export default function Post(props) {
  const { match } = props;
  const [updatePost] = useMutation(UPDATE_POST);
  const { loading, error, data } = useQuery(POST_QUERY, {
    variables: { id: match.params.id }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { post, isEditMode } = data;
  return (
    <div>
      <EditMode isEditMode={isEditMode} />
      {isEditMode ? (
        <section>
          <h1>Edit Post</h1>
          <UpdatePost post={post} />
        </section>
      ) : (
        <section>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <input
            style={{ height: "100px" }}
            onChange={() =>
              updatePost({
                variables: {
                  id: post.id,
                  checked: !post.checked
                },
                optimisticResponse: {
                  __typename: "Mutation",
                  updatePost: {
                    __typename: "Post",
                    checked: !post.checked
                  }
                },
                update: (cache, { data: { updatePost } }) => {
                  const data = cache.readQuery({
                    query: POST_QUERY,
                    variables: { id: post.id }
                  });
                  data.post.checked = updatePost.checked;
                  cache.writeQuery({
                    query: POST_QUERY,
                    data: {
                      ...data,
                      post: data.post
                    }
                  });
                }
              })
            }
            type="checkbox"
            checked={post.checked}
          />
        </section>
      )}
    </div>
  );
}
