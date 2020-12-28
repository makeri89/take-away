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