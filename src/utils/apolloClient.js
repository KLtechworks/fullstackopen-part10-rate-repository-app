// Exercise 10.11: fetching repositories with Apollo Client
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// Exercise 10.12: environment variables
import Constants from 'expo-constants';

import { setContext } from '@apollo/client/link/context';

// const createApolloClient = () => {
//   // Exercise 10.12: environment variables
//   const apolloUri = Constants.expoConfig.extra.apolloUri;

//   return new ApolloClient({
//     // uri: 'http://192.168.1.174:4000',
//     // Exercise 10.12: environment variables
//     uri: apolloUri,
//     cache: new InMemoryCache(),
//   });
// };

const createApolloClient = (authStorage) => {   

  const apolloUri = Constants.expoConfig.extra.apolloUri;

  const httpLink = createHttpLink({
    uri: apolloUri,
  });

  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();

      return {
        headers: {
          ...headers,                    
          authorization: accessToken     
            ? `Bearer ${accessToken}`
            : '',
        },
      };
    } catch (e) {
      console.log('error：', e);
      return { headers };
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),   
    cache: new InMemoryCache(),
  });
};


export default createApolloClient;