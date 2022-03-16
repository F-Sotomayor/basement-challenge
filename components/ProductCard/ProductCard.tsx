import Image from "next/image";
import {VFC} from "react";

import {Product} from "../../product/types";
import addToCart from "../../public/addtocart.svg";

interface Props {
  product: Product;
}

const ProductCard: VFC<Props> = ({product: {image, title, price}}) => {
  return (
    <div className="flex flex-col" style={{height: "500px", width: "300px"}}>
      <div
        className="flex w-full justify-center items-center h-full border-b-2 border-white relative"
        style={{
          background:
            "linear-gradient(0deg, rgba(28,28,28,1) 1%, rgba(23,23,23,1) 42%, rgba(7,7,7,1) 62%, rgba(0,0,0,1) 100%)",
        }}
      >
        <div className="absolute z-50">
          <button>
            <Image alt="Add To Cart" src={addToCart} />
          </button>
        </div>
        <Image alt="Product Image" height="350px" src={`/${image}.png`} width="280px" />
      </div>
      <div className="flex w-full justify-between mt-2">
        <div>{title}</div>
        <div>${price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
