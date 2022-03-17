import Image from "next/image";
import {VFC} from "react";

import logo from "../../public/logo.svg";
import logoMobile from "../../public/mobile-logo.svg";
import header from "../../public/header.svg";
import icons from "../../public/hd-4k.svg";

interface Props {
  cart: {quantity: number};
  onCartOpen: VoidFunction;
}

const Header: VFC<Props> = ({cart: {quantity}, onCartOpen}) => {
  return (
    <header className="md:flex md:flex-col md:w-full md:h-4/6 flex flex-col">
      <div className="md:flex md:w-full md:h-20 md:p-4 md:justify-evenly md:items-center flex justify-between p-4">
        <div className="md:flex md:justify-start md:flex-1 md:items-center hidden">
          <Image alt="Logo" src={logo} />
        </div>
        <div className="md:hidden md:justify-start md:flex-1 md:items-center">
          <Image alt="Logo" src={logoMobile} />
        </div>
        <div className="md:flex md:flex-1 md:justify-center md:items-center hidden ">
          <Image alt="icons" src={icons} />
        </div>
        <div className="md:flex md:flex-1 md:justify-end md:items-center">
          <button className="rounded-full border-white border w-36 h-12" onClick={onCartOpen}>
            CART ( {quantity} )
          </button>
        </div>
      </div>
      <div className="md:mt-12 md:flex md:w-full md:h-full md:justify-center md:items-center p-4 h-[200px] justify-center items-center flex ">
        <Image alt="Header Logo" src={header} />
      </div>
      <div className="inline-block w-full max-w-full md:text-5xl border-white md:h-32 border-t-2 border-b-2 md:mt-12">
        A man can&apos;t have enough basement. - A man can&apos;t have enough basement
      </div>
    </header>
  );
};

export default Header;
