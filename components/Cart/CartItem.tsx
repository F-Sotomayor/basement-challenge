import Image from "next/image";
import {FC} from "react";

interface Props {
  cartItem: {
    title: string;
    description: string;
    quantity: number;
    price: number;
    image: string;
  };
}

const CartItem: FC<Props> = ({cartItem: {title, description, quantity, price, image}}) => {
  return (
    <div className="flex w-full h-[300px] mt-12 p-4 border">
      <div
        className="flex basis-[30%] mr-8"
        style={{
          background:
            "linear-gradient(0deg, rgba(28,28,28,1) 1%, rgba(23,23,23,1) 42%, rgba(7,7,7,1) 62%, rgba(0,0,0,1) 100%)",
        }}
      >
        <Image alt="Product Image" height="100%" src={`/${image}.png`} width="300%" />
      </div>
      <div className="flex flex-col basis-[70%]">
        <div className="text-4xl text-white">{title}</div>
        <div className="text-2xl text-gray-500 flex flex-1">{description}</div>
        <div className="flex">
          <div className="text-2xl mr-4"> QUANTITY : </div>
          <div className="flex border rounded-full w-[100px] justify-evenly items-center text-2xl">
            <button>-</button>
            {quantity}
            <button>+</button>
          </div>
        </div>
        <div className="flex w-full mt-4">
          <div className="text-2xl mr-4 flex items-center">SIZE:</div>
          <div className="flex w-full justify-between">
            <div className="flex text-2xl justify-evenly basis-[40%] items-center">
              <button className="border rounded-full w-[40px]">S</button>
              <button className="w-[40px]">M</button>
              <button className="w-[40px]">L</button>
              <button className="w-[40px]">XL</button>
            </div>
            <div className="flex text-4xl">${price}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
