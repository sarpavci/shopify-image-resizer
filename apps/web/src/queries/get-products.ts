import { gql } from '@apollo/client';

export type GetProductsResult = {
  products: {
    edges: {
      node: {
        id: string;
        title: string;
        handle: string;
        media: {
          edges: {
            node: {
              preview: {
                image: {
                  id: string;
                  url: string;
                  altText?: string | null;
                };
              } | null;
            };
          }[];
        };
        priceRangeV2: {
          minVariantPrice: {
            amount: string;
            currencyCode: string;
          };
        };
      };
    }[];
  };
};


export const getProductsQuery = gql`
  query GetProducts {
    products(first: 10) {
      edges {
        node {
          id
          title
          handle
          media(first: 10) {
            edges {
              node {
                preview {
                  image {
                    id
                    url
                    altText
                  }
                }
              }
            }
          }
          priceRangeV2 {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;
