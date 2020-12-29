import { gql } from '@apollo/client';

export const PRODUCT_INFO = gql`
  fragment ProductInfo on Product {
    id
    name
    description
    url
    price
  }
`;

export const USER_INFO = gql`
  fragment UserInfo on User {
    id
    name
    username
    email
  }
`;