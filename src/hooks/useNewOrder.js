import { useMutation } from '@apollo/react-hooks';

import { CREATE_NEW_ORDER } from '../graphql/mutation';

const useNewOrder = () => {
  const [mutate,result] = useMutation(CREATE_NEW_ORDER, {
    onError: (e) => {
      console.error(e);
    }
  });

  const newOrder = async ({ customer, products }) => {
    const data = await mutate({
      variables: { customer, products }
    });

    return data;
  };

  return [newOrder, result];
};

export default useNewOrder;