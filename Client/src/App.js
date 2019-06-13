import React, { Component } from 'react';
import './App.css';
import HomeComp from './components/HomeComp';
import { createMuiTheme, responsiveFontSizes, MuiThemeProvider } from '@material-ui/core/styles';
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

let theme = createMuiTheme(require('./theme.json'));
theme = responsiveFontSizes(theme);

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:8080/graphql'
})

const client = new ApolloClient({
  cache,
  link
});class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>        
            <HomeComp />          
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
