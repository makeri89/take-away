import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { useContext } from 'react';

import { SIGN_IN } from '../graphql/mutation';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useLogin = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const [mutate, result] = useMutation(SIGN_IN, {
    onError: (error) => {
      console.log(error);
    }
  });

  const login = async ({ username, password }) => {
    const data = await mutate({ variables: { username, password } });

    await authStorage.setToken(data.data.login.value);
    apolloClient.resetStore();

    return data;
  };

  return [login, result];
};

export default useLogin;