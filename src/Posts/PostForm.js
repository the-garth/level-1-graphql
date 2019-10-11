import React, { useState } from "react";
import PropTypes from "prop-types";

export default function PostForm({ onSubmit, post, onSuccess }) {
  const [values, setValues] = useState({
    id: post.id || "",
    title: post.title || "",
    body: post.body || ""
  });

  const { id, title, body } = values;

  const handleInput = e => {
    e.persist();
    setValues(values => ({ ...values, [e.target.name]: event.target.value }));
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit({
          variables: { id, title, body }
        })
          .then(() => {
            onSuccess();
          })
          .catch(e => console.log(e));
      }}
    >
      <input
        type="text"
        onChange={handleInput}
        value={title}
        name="title"
        placeholder="Title"
      />
      <textarea
        type="text"
        onChange={handleInput}
        value={body}
        name="body"
        placeholder="The Body goes here"
      />
      <button className="button">Submit</button>
    </form>
  );
}

PostForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  post: PropTypes.object
};

PostForm.defaultProps = {
  post: {},
  onSuccess: () => null
};
