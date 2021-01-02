import { useMutation } from '@apollo/react-hooks';

import { CREATE_NEW_USER } from '../graphql/mutation';

const useSingUp = () => {
  const [mutate, result] = useMutation(CREATE_NEW_USER, {
    onError: (e) => {
      console.error(e);
    }
  });

  const signUp = async ({ name, username, email, password }) => {
    const data = await mutate({
      variables: { name, username, email, password }
    });

    return data;
  };

  return [signUp, result];
};

export default useSingUp;