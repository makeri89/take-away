import { gql } from '@apollo/client';

import { PRODUCT_INFO, USER_INFO } from './fragments';

export const ALL_PRODUCTS = gql`
  query allProducts {
    allProducts {
      ...ProductInfo
    }
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
      id
      customer {
        ...UserInfo
      }
      products {
        id
        name
        price
        description
        url
        amount
      }
      date
      subTotal
      
    }
  }
  ${USER_INFO}
`;

export const ME = gql`
  query {
    me {
      ...UserInfo
    }
  }
  ${USER_INFO}
`;

export const SINGLE_PRODUCT = gql`
  query singleProduct(
    $name: String!
  ) {
    singleProduct(
      name: $name
    ) {
      ...ProductInfo
    }
  }
  ${PRODUCT_INFO}
`;