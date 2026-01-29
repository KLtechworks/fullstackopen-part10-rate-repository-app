// Exercise 10.13: the sign in form mutation
import { useMutation, gql, useApolloClient } from '@apollo/client';

import useAuthStorage from '../hooks/useAuthStorage';

// for testing use: username: "kalle", password: "password"
const AUTHENTICATE = gql`
  mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  // Exercise 10.15: storing the access token step2   
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        credentials: { username, password }
      }
    });

    if (data?.authenticate?.accessToken) {
      await authStorage.setAccessToken(data.authenticate.accessToken);
      // Exercise 10.15: storing the access token step2  
      await apolloClient.resetStore();
    }
    
    return data;  
  };

  return [signIn, result];
};

export default useSignIn;