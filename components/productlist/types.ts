export interface Product {
  node: {
    id: string;
    title: string;
    name: string;
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
