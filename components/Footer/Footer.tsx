import {VFC} from "react";
import Image from "next/image";

import footer from "../../public/footer.svg";

const Footer: VFC = () => {
  return (
    <div className="h-96 w-full mt-24">
      <Image alt="Footer" src={footer} />
    </div>
  );
};

export default Footer;
