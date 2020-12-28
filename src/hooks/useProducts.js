import { useQuery } from '@apollo/client';

import { ALL_PRODUCTS } from '../graphql/queries';

const useProducts = () => {
  const products = useQuery(ALL_PRODUCTS, {
    fetchPolicy: 'cache-and-network'
  });

  const { loading, data } = products;
  
}