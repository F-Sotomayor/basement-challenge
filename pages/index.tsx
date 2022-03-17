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
  onCartAdd: (product: Product) => Product[];
}

export async function getStaticProps() {
  const products = await serverApi.list();

  return {
    props: {
      products,
    },
  };
}

const api = {
  fetch: async () => JSON.parse(localStorage.getItem("draftOrder") || "[]"),
  save: async (products: Product[]) => localStorage.setItem("draftOrder", JSON.stringify(products)),
};

const Home: NextPage<Props> = ({products}) => {
  const [isCartOpen, toggleCartOpen] = React.useState<boolean>(false);
  const [draftCart, setDraftCart] = React.useState<Product[]>([]);

  React.useEffect(() => {
    api.fetch().then(setDraftCart);
  }, []);

  React.useEffect(() => {
    api.save(draftCart);
  }, [draftCart]);

  function handleCartAdd(product: Product) {
    const id = `${product.id}-${product.size}`;
    const isInCart = draftCart.some((item) => item.id === id);

    if (isInCart) {
      handleQuantityAdd(id);
    } else {
      setDraftCart((cart) => cart.concat({...product, id: id}));
    }
  }

  function handleQuantityAdd(id: string) {
    setDraftCart((finalCart) =>
      finalCart.map((product) =>
        product.id !== id
          ? product
          : {
              ...product,
              quantity: product.quantity + 1,
            },
      ),
    );
  }

  function handleQuantityRest(id: string) {
    setDraftCart((finalCart) =>
      finalCart.map((product) =>
        product.id !== id
          ? product
          : {
              ...product,
              quantity: product.quantity > 0 ? product.quantity - 1 : 0,
            },
      ),
    );
  }

  function handleSizeChange(id: string, size: string) {
    setDraftCart((finalCart) =>
      finalCart.map((product) =>
        product.id !== id
          ? product
          : {
              ...product,
              size: size,
              id: id + size,
            },
      ),
    );
  }

  function handleCheckout() {
    console.table(draftCart);
  }

  return (
    <div className="h-auto flex bg-black max-w-7xl m-auto flex-col relative">
      <Header cart={{quantity: 1}} onCartOpen={() => toggleCartOpen(!isCartOpen)} />
      <div className="flex mt-12 w-full  justify-between items-center h-full">
        {products.map((product: Product) => {
          return (
            <ProductCard
              key={product.id}
              product={{...product, onCartAdd: () => handleCartAdd(product)}}
            />
          );
        })}
      </div>
      <Footer />

      {isCartOpen === true && (
        <Cart
          cart={draftCart}
          cartClose={() => toggleCartOpen(false)}
          onCheckout={handleCheckout}
          onQuantityAdd={handleQuantityAdd}
          onQuantityRest={handleQuantityRest}
          onSizeChange={handleSizeChange}
        />
      )}
    </div>
  );
};

export default Home;
