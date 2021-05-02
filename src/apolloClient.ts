import {
  ApolloClient,
  ApolloLink,
  concat,
  HttpLink,
  InMemoryCache,
} from "@apollo/client/core"
import fetch from "cross-fetch"

const createApolloClient = () => {
  // https://www.apollographql.com/docs/react/networking/advanced-http-networking/
  const httpLink = new HttpLink({
    uri: process.env.HASURA_URI,
    fetch,
  })

  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext({
      headers: {
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
      },
    })

    return forward(operation)
  })
  //www.apollographql.com/docs/react/api/core/ApolloClient/
  const apolloClient = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
  })

  return apolloClient
}

export default createApolloClient
