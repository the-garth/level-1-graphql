import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import PostForm from "./PostForm";

const ADD_POST = gql`
  mutation createPost($title: String!, $body: String!) {
    createPost(data: { status: PUBLISHED, title: $title, body: $body }) {
      title
      body
      id
    }
  }
`;

export default function NewPost() {
  const [createPost] = useMutation(ADD_POST);

  return (
    <div>
      <h1>New Post</h1>
      <PostForm onSubmit={createPost} />
    </div>
  );
}
