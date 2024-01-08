import React from 'react';
import ProductList from '../components/ProductList';
import { GetStaticProps } from 'next';

interface Product {
  node: {
    id: string;
    title: string;
    description: string;
    images: {
      edges: {
        node: {
          originalSrc: string;
        };
      }[];
    };
    priceRange: {
      maxVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
  };
}

interface HomePageProps {
  products: Product[];
}

const HomePage: React.FC<HomePageProps> = ({ products }) => {
  return (
      <ProductList products={products} />
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    const response = await fetch(
      'https://test-alex-uwp.myshopify.com/api/2022-01/graphql.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': '44b4347f2a85d4356ceb5cf2849e876b',
        },
        body: JSON.stringify({
          query: `
            {
              products(first: 10) {
                edges {
                  node {
                    id
                    title
                    description
                    images(first: 1) {
                      edges {
                        node {
                          originalSrc
                        }
                      }
                    }
                    priceRange {
                      maxVariantPrice {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
              }
            }
          `,
        }),
      }
    );

    const { data } = await response.json();
    const products: Product[] = data.products.edges;

    return {
      props: {
        products,
      },
      revalidate: 10, // Regenerate the page every 60 seconds
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      props: {
        products: [],
      },
    };
  }
};

export default HomePage;
