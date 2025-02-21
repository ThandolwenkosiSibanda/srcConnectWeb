import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import "./styles/bootstrap.min.css";
import "./styles/animate.css";
import "./styles/font-awesome.css";
import "./styles/themify-icons.css";
import "./styles/slick.css";
import "./styles/slick-theme.css";
import "./styles/magnific-popup.css";
import "./styles/megamenu.css";
import "./styles/shortcodes.css";
import "./styles/main.css";
import "./styles/responsive.css";

import App from "../src/App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/cart";
import { UserProvider } from "./context/user";

const wsLink = new GraphQLWsLink(
  createClient({
    uri: "https://proqit-server.onrender.com/graphql",
  })
);

const httpLink = new HttpLink({
  // uri : 'http://localhost:5000/graphql'
  uri: "https://proqit-server.onrender.com/graphql",
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <UserProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </UserProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
