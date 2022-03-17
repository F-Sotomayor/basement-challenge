import {VFC} from "react";
import Image from "next/image";

import footer from "../../public/footer.svg";

const Footer: VFC = () => {
  return (
    <div className="md:h-96 w-full md:mt-24 h-[250px] flex items-center justify-center p-4 mt-0">
      <Image alt="Footer" src={footer} />
    </div>
  );
};

export default Footer;
