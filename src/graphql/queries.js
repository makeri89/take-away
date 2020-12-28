import { gql } from '@apollo/client';

import { PRODUCT_INFO } from './fragments';

export const ALL_PRODUCTS = gql`
  query allProducts {
    ...ProductInfo
  }
  ${PRODUCT_INFO}
`;

export const ALL_ORDERS = gql`
  query allOrders(
    $customer: String
  ) {
    allOrders(
      customer: $customer
    ) {
      customer {
        name
      }
      products {
        ...ProductInfo
      }
      date
    }
  }
  ${PRODUCT_INFO}
`;