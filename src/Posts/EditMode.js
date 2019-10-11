import React from "react";
import { ApolloConsumer } from "@apollo/react-hooks";

export default function EditMode({ isEditMode }) {
  return (
    <ApolloConsumer>
      {client => (
        <button
          onClick={() => {
            client.writeData({ data: { isEditMode: !isEditMode } });
          }}
        >
          Toggle Edit Mode
        </button>
      )}
    </ApolloConsumer>
  );
}
