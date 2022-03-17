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
  const [cart, setCart] = React.useState<Product[]>([]);

  React.useEffect(() => {
    api.fetch().then(setCart);
  }, []);

  React.useEffect(() => {
    api.save(cart);
  }, [cart]);

  function handleCartAdd(product: Product) {
    const id = `${product.id}-${product.size}`;
    const isInCart = cart.some((item) => item.id === id);

    if (isInCart) {
      handleQuantityAdd(id);
    } else {
      setCart((cart) => cart.concat({...product, id: id}));
    }
  }

  function handleQuantityAdd(id: string) {
    setCart((finalCart) =>
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
    setCart((finalCart) =>
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
    setCart((finalCart) =>
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
    console.table(cart);
    setCart([]);
  }

  return (
    <div className="md:h-auto md:flex md:bg-black md:max-w-7xl md:m-auto md:flex-col md:relative h-auto min-h-screen">
      <Header
        cart={{quantity: cart.reduce((acc, item) => (acc = acc + 1), 0)}}
        onCartOpen={() => toggleCartOpen(!isCartOpen)}
      />
      <div className="md:flex md:mt-12 md:w-full md:justify-between md:items-center md:h- md:flex-row flex flex-col items-center">
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
          cart={cart}
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
