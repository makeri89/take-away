import { gql } from 'apollo-boost';

import { USER_INFO } from './fragments';

export const SIGN_IN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password
    ) {
      value
    }
  }
`;

export const CREATE_NEW_ORDER = gql`
  mutation createNewOrder(
    $customer: String!,
    $products: [String]!
  ) {
    createNewOrder(
      customer: $customer,
      products: $products
    ) {
      id
      products {
        id
        name
        price
        url
        description
        amount
      }
      totalProducts
      totalUniqueProducts
      subTotal
      date
      customer {
        ...UserInfo
      }
    }
  }
  ${USER_INFO}
`;

export const CREATE_NEW_USER = gql`
  mutation createNewUser(
    $name: String!,
    $username: String!,
    $email: String!,
    $password: String!,
  ) {
    createNewUser(
      name: $name,
      username: $username,
      email: $email,
      password: $password
    ) {
      ...UserInfo
    }
  }
  ${USER_INFO}
`;