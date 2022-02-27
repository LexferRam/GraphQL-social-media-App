import App from './App'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
  } from "@apollo/client";

  const client = new ApolloClient({
    uri: 'http://localhost:5000',
    cache: new InMemoryCache()
  });


export default function ApolloProv(){

    return(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
    )
};
