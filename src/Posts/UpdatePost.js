import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import PostForm from "./PostForm";

const UPDATE_POST = gql`
  mutation updatePost($id: ID!, $title: String!, $body: String!) {
    updatePost(
      where: { id: $id }
      data: { status: PUBLISHED, title: $title, body: $body }
    ) {
      title
      body
      id
    }
  }
`;

export default function UpdatePost({ post }) {
  const [updatePost, result] = useMutation(UPDATE_POST);
  console.log(result);
  const onSuccess = () =>
    result.client.writeData({ data: { isEditMode: false } });
  return (
    <div>
      <PostForm post={post} onSubmit={updatePost} onSuccess={onSuccess} />
    </div>
  );
}
