import React from 'react';
import ProductList from '../components/ProductList';

interface HomePageProps {
  products: any[]; // Adjust the type of 'products' based on the actual structure of your data
}

export default function Home(props: HomePageProps) {
  return (
    <Page >
      <HomePage {...props} />
    </Page>
  )
}

export default HomePage;
