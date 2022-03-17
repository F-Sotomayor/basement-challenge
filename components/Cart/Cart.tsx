import {FC} from "react";
import React from "react";
import Image from "next/image";

import yourCart from "../../public/your-cart.svg";
import checkout from "../../public/checkout.png";
import {Product} from "../../product/types";

import CartItem from "./CartItem";

interface Props {
  cart: Product[];
  cartClose: VoidFunction;
}

const Cart: FC<Props> = ({cartClose, cart}) => {
  const [finalCart, setFinalCart] = React.useState<Product[]>(cart);

  React.useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  function handleQuantityAdd(id: number) {
    setFinalCart((finalCart) =>
      finalCart.map((product) =>
        product.id !== id
          ? product
          : {
              ...product,
              quantity: product.quantity++,
            },
      ),
    );
  }

  function handleQuantityRest(id: number) {
    setFinalCart((finalCart) =>
      finalCart.map((product) =>
        product.id !== id
          ? product
          : {
              ...product,
              quantity: product.quantity--,
            },
      ),
    );
  }

  return (
    <div
      className="fixed top-0 right-0 w-full min-h-full h-auto flex justify-end z-[100] overflow-visible"
      style={{backgroundColor: "rgba(0, 0, 0, 0.83)"}}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="bg-black flex flex-col w-4/6 h-5/6 ml-auto">
          <div className="flex w-full justify-end p-4 text-2xl">
            <button onClick={cartClose}>CLOSE</button>
          </div>
          <div className="flex w-full justify-center  mt-8 font-bold">
            <Image alt="YOUR CART" src={yourCart} />
          </div>
          <div className="flex flex-1 p-4 flex-col">
            {finalCart ? (
              finalCart.map((cartItem: Product) => {
                return (
                  <CartItem
                    key={cartItem.id}
                    cartItem={{
                      title: cartItem.title,
                      description: cartItem.description,
                      image: cartItem.image,
                      price: Math.round(cartItem.price * cartItem.quantity),
                      quantity: cartItem.quantity,
                      onQuantityAdd: () => handleQuantityAdd(cartItem.id),
                      onQuantityRest: () => handleQuantityRest(cartItem.id),
                    }}
                  />
                );
              })
            ) : (
              <div>No tenes nada en el carrito</div>
            )}
          </div>
          <div className="flex w-full h-16">
            <div className="flex justify-start items-center basis-[60%] border pl-8 text-4xl">
              TOTAL: $
              {finalCart.reduce((acc, item) => {
                acc = Math.round(acc + item.price * item.quantity);

                return acc;
              }, 0)}
            </div>
            <div className="flex justify-center items-center border basis-[40%]">
              <button className="flex justify-center items-center">
                <Image alt="CHECKOUT" src={checkout} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
