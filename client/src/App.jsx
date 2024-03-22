// Import necessary functions and packages
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

// Create an HTTP link that connects to your GraphQL endpoint
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

// Create a middleware that attaches the token to each request
const authLink = setContext((_, { headers }) => {
  // Retrieve the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // Return the headers to the context so the HTTP link can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

// Initialize ApolloClient with the authLink and httpLink
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <>
        <Navbar />
        <Outlet />
      </>
    </ApolloProvider>
  );
}

export default App;
