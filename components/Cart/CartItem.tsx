import Image from "next/image";
import {FC} from "react";
import React from "react";

interface Props {
  cartItem: {
    title: string;
    description: string;
    quantity: number;
    price: number;
    image: string;
    size: string;
    onQuantityAdd: () => void;
    onQuantityRest: () => void;
    onSizeChange: (size: string) => void;
  };
}

const CartItem: FC<Props> = ({
  cartItem: {
    title,
    description,
    quantity,
    price,
    image,
    size,
    onQuantityAdd,
    onQuantityRest,
    onSizeChange,
  },
}) => {
  return (
    <div className="flex w-full md:h-[300px] h-[200px] md:mt-12 mt-8 md:p-4 p-2 border">
      <div
        className="flex md:basis-[30%] md:mr-8 basis-[50%] mr-2"
        style={{
          background:
            "linear-gradient(0deg, rgba(28,28,28,1) 1%, rgba(23,23,23,1) 42%, rgba(7,7,7,1) 62%, rgba(0,0,0,1) 100%)",
        }}
      >
        <Image alt="Product Image" height="100%" src={`/${image}.png`} width="300%" />
      </div>
      <div className="flex flex-col md:basis-[70%] basis-[40%]">
        <div className="md:text-4xl text-white">{title}</div>
        <div className="md:text-2xl text-gray-500 flex flex-1">{description}</div>
        <div className="flex">
          <div className="md:text-2xl md:mr-4 mr-2"> QUANTITY : </div>
          <div className="flex border rounded-full md:w-[100px] w-[75px] justify-evenly items-center md:text-2xl">
            <button onClick={onQuantityRest}>-</button>
            {quantity}
            <button onClick={onQuantityAdd}>+</button>
          </div>
        </div>
        <div className="flex w-full mt-4">
          <div className="md:text-2xl mr-4 flex items-center">SIZE:</div>
          <div className="flex md:w-full md:justify-between flex-col md:flex-row justify-center">
            <div className="flex md:text-2xl justify-evenly md: basis-[40%] items-center">
              <button
                className={size === "S" ? "border rounded-full w-[40px]" : "w-[40px]"}
                onClick={() => onSizeChange("S")}
              >
                S
              </button>
              <button
                className={size === "M" ? "border rounded-full w-[40px]" : "w-[40px]"}
                onClick={() => onSizeChange("M")}
              >
                M
              </button>
              <button
                className={size === "L" ? "border rounded-full w-[40px]" : "w-[40px]"}
                onClick={() => onSizeChange("L")}
              >
                L
              </button>
              <button
                className={size === "XL" ? "border rounded-full w-[40px]" : "w-[40px]"}
                onClick={() => onSizeChange("XL")}
              >
                XL
              </button>
            </div>
            <div className="md:flex md:text-4xl hidden">${price}</div>
          </div>
        </div>
        <div className="flex md:text-4xl md:hidden text-2xl mt-2 md:mt-0">${price}</div>
      </div>
    </div>
  );
};

export default CartItem;
