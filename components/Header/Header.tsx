import Image from "next/image";
import {VFC} from "react";

import logo from "../../public/logo.svg";
import header from "../../public/header.svg";
import icons from "../../public/hd-4k.svg";

interface Props {
  cart: {quantity: number};
  onCartOpen: VoidFunction;
}

const Header: VFC<Props> = ({cart: {quantity}, onCartOpen}) => {
  return (
    <header className="flex flex-col w-full h-4/6">
      <div className="flex w-full h-20 p-4 justify-evenly items-center">
        <div className="flex justify-start flex-1 items-center">
          <Image alt="Logo" src={logo} />
        </div>
        <div className="flex flex-1 justify-center items-center">
          <Image alt="icons" src={icons} />
        </div>
        <div className="flex flex-1 justify-end items-center">
          <button className="rounded-full border-white border w-36 h-12" onClick={onCartOpen}>
            CART ( {quantity} )
          </button>
        </div>
      </div>
      <div className="mt-12 flex w-full h-full justify-center items-center">
        <Image alt="Header Logo" src={header} />
      </div>
      <div className="inline-block w-full max-w-full text-5xl border-white h-32 border-t-2 border-b-2 mt-12">
        A man can&apos;t have enough basement.swag - A man can&apos;t have enough basement
      </div>
    </header>
  );
};

export default Header;
