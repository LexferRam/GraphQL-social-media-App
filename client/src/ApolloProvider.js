import App from './App'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "apollo-link-context";
import { HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: "http://localhost:5000/graphql",
  // Additional options
  // headers: { 
  //   Authorization: sessionStorage.getItem('jwtToken')  ? `Bearer ${sessionStorage.getItem('jwtToken')}`:''
  // }
});

const setAuthorizationLink = setContext((request, previousContext) => ({
  headers: { 
    authorization: sessionStorage.getItem('jwtToken')  ? `Bearer ${sessionStorage.getItem('jwtToken')}`:''
  }
}));

const client = new ApolloClient({
  // uri: 'http://localhost:5000/graphql',
  link: setAuthorizationLink.concat(httpLink),
  // link: httpLink,
  cache: new InMemoryCache(),
});


export default function ApolloProv() {

  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
};
