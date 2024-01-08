import React from 'react';
import { Product } from './types';
import styles from './ProductList.module.css';

interface ProductListProps  {
  products: Product[];
}
const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className={styles.products}>
      {products.map(({ node }) => (
        <div key={node.id} className={styles.productItem}>
          <img
            src={node.images.edges[0]?.node.originalSrc}
            alt={node.name}
            className={styles.productImage}
          />
          <h3 className={styles.productTitle}>{node.title}</h3>
          <p className={styles.productDescription}>{node.description}</p>
          <p className={styles.productPrice}>
            {node.priceRange.maxVariantPrice.amount}
          </p>
        </div>
      ))}
    </div>
  );
};


export default ProductList;
