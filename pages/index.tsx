import type {NextPage} from "next";
import React from "react";

import Cart from "../components/Cart/Cart";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import ProductCard from "../components/ProductCard/ProductCard";
import serverApi from "../product/api/server";
import {Product} from "../product/types";

interface Props {
  products: Product[];
}

export async function getStaticProps() {
  const products = await serverApi.list();

  return {
    props: {
      products,
    },
  };
}

const Home: NextPage<Props> = ({products}) => {
  const [isCartOpen, toggleCartOpen] = React.useState<boolean>(false);

  return (
    <div className="h-auto flex bg-black max-w-7xl m-auto flex-col relative">
      <Header cart={{quantity: 1}} onCartOpen={() => toggleCartOpen(!isCartOpen)} />
      <div className="flex mt-12 w-full  justify-between items-center h-full">
        {products.map((product: Product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
      <Footer />

      {isCartOpen === true && <Cart cartClose={() => toggleCartOpen(false)} />}
    </div>
  );
};

export default Home;
