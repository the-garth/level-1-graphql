import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";

import App from "./App";
import "./index.css";

const defaultState = {
  isEditMode: false
};

const cache = new InMemoryCache();
// let client;
persistCache({
  cache,
  storage: window.localStorage
});

const client = new ApolloClient({
  cache,
  uri: "https://api-euwest.graphcms.com/v1/ck11ssehk2lji01cz1d4dgir6/master",
  clientState: {
    defaults: defaultState,
    resolvers: {}
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
