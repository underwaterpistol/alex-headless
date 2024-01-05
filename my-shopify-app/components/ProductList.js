import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
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
        setProducts(data.products.edges);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div>
        {products.map(({ node }) => (
          <div key={node.id}>
            {/* <img src={node.images.edges[0].node.originalSrc} alt={node.title} />  */}
            <h3>{node.title}</h3>
            <p>
              {node.priceRange.maxVariantPrice.amount}
              {node.priceRange.maxVariantPrice.currencyCode}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
