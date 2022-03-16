import {FC} from "react";
import React from "react";
import Image from "next/image";

import yourCart from "../../public/your-cart.svg";
import checkout from "../../public/checkout.png";

import CartItem from "./CartItem";

interface Cart {
  cartClose: VoidFunction;
}

const Cart: FC<Cart> = ({cartClose}) => {
  React.useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed top-0 right-0 w-full h-full flex justify-end"
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
          <div className="flex flex-1 p-4">
            <CartItem
              cartItem={{
                title: "BLACK T-SHIRT",
                description: "Unisex Basic Softstyle T-Shirt",
                image: "shirt",
                price: 12.5,
                quantity: 3,
              }}
            />
          </div>
          <div className="flex w-full h-16">
            <div className="flex justify-start items-center basis-[60%] border pl-8 text-4xl">
              TOTAL: $37.50
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
