import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div className='products'>
      {products.map(({ node }) => (
        <div key={node.id} className='product-item'>
          <img
            src={node.images.edges[0]?.node.originalSrc}
            alt={node.title}
            className='product-image'
          />
          <h3 className='product-title'>{node.title}</h3>
          <p className='product-description'>{node.description}</p>
          <p className='product-price'>
            {node.priceRange.maxVariantPrice.amount}
          </p>
        </div>
      ))}
    </div>
  );
};


export default ProductList;
