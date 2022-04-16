require('file-loader?name=[name].[ext]!./index.html');
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './Book.scss';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: "https://fullstack-engineer-test-n4ouilzfna-uc.a.run.app/graphql",
  cache: new InMemoryCache()
});

const rootElement = document.getElementById('root');

ReactDOM.render(
  <ApolloProvider client={ client }>
      <App />
  </ApolloProvider>, rootElement
);