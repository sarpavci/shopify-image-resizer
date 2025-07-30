import { gql } from '@apollo/client';

export type GetProductMediasByProductIdVariables = {
  productId: string;
};

export type MediaNode = {
  id: string;
  mediaContentType: string;
  preview: {
    image: {
      url: string;
    };
  } | null;
};

export type MediaType = {
  edges: { node: MediaNode }[];
};

export type GetProductMediasByProductIdResult = {
  productByIdentifier: {
    media: MediaType;
  };
};

export const getProductMediasQuery = gql`
  query GetProductMediasByProductId($productId: ID!) {
    productByIdentifier(identifier: { id: $productId }) {
      media(first: 100) {
        edges {
          node {
            id
            mediaContentType
            preview {
              image {
                url
              }
            }
          }
        }
      }
    }
  }
`;
