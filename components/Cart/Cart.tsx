import {FC} from "react";
import React from "react";
import Image from "next/image";

import yourCart from "../../public/your-cart.svg";
import checkout from "../../public/checkout.png";
import {Product} from "../../product/types";

import CartItem from "./CartItem";

interface Props {
  cart: Product[];
  onSizeChange: Function;
  onQuantityAdd: Function;
  onQuantityRest: Function;
  onCheckout: VoidFunction;
  cartClose: VoidFunction;
}

const Cart: FC<Props> = ({
  cartClose,
  cart,
  onSizeChange,
  onQuantityAdd,
  onQuantityRest,
  onCheckout,
}) => {
  React.useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="md:fixed md:top-0 md:right-0 md:w-full md:min-h-full md:h-auto flex md:justify-end md:z-[100] fixed top-0 left-0 h-screen z-50"
      style={{backgroundColor: "rgba(0, 0, 0, 0.83)"}}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="bg-black flex flex-col md:w-4/6 md:h-5/6 md:ml-auto p-4 md:p-0 h-screen">
          <div className="flex w-full justify-end p-4 text-2xl">
            <button onClick={cartClose}>CLOSE</button>
          </div>
          <div className="flex w-full justify-center  mt-8 font-bold">
            <Image alt="YOUR CART" src={yourCart} />
          </div>
          <div className="flex flex-1 p-4 flex-col overflow-auto md:max-h-[90vh]">
            {cart ? (
              cart.map((cartItem: Product) => {
                return (
                  <CartItem
                    key={cartItem.id}
                    cartItem={{
                      title: cartItem.title,
                      description: cartItem.description,
                      image: cartItem.image,
                      price: Math.round(cartItem.price * cartItem.quantity),
                      quantity: cartItem.quantity,
                      size: cartItem.size,
                      onSizeChange: (size) => onSizeChange(cartItem.id, size),
                      onQuantityAdd: () => onQuantityAdd(cartItem.id),
                      onQuantityRest: () => onQuantityRest(cartItem.id),
                    }}
                  />
                );
              })
            ) : (
              <div>No tenes nada en el carrito</div>
            )}
          </div>
          <div className="flex w-full h-32 justify-evenly md:justify-start md:h-16 flex-col md:flex-row">
            <div className="flex justify-between md:justify-start items-center md:basis-[60%] md:border md:pl-8 text-4xl border-b-2">
              <div> TOTAL:</div> $
              {cart.reduce((acc, item) => {
                acc = Math.round(acc + item.price * item.quantity);

                return acc;
              }, 0)}
            </div>
            <div className="flex justify-center items-center md:border md:basis-[40%] ">
              <button className="flex justify-center items-center flex-1">
                <Image alt="CHECKOUT" src={checkout} onClick={onCheckout} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
