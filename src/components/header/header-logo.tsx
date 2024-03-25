import React from "react";

import { YooLogoSvg, YooSvg } from "../icons";

type THeaderLogoProps = {};

const HeaderLogo = ({}: THeaderLogoProps) => {
  return (
    <div className="flex items-center justify-center">
      <YooLogoSvg className="w-11 md:w-12" />
      <div className="ml-0 flex flex-col md:ml-1">
        <div className="-mb-1.5 flex items-baseline">
          <YooSvg className="w-8 md:w-10" />
          <span className="text-xl font-[600] !leading-none text-green2-500 md:text-2xl">life</span>
        </div>
        <span className="logo-text-gradient-green ml-0 text-xl font-[600] md:text-2xl">Shop</span>
      </div>
    </div>
  );
};

export const HeaderLogo1 = ({}: THeaderLogoProps) => {
  return (
    <div className="flex items-center justify-center">
      <YooLogoSvg className="w-10" />
      <div className="ml-0.5 flex flex-row items-baseline">
        <div className="-mb-1.5 mr-1 flex items-baseline">
          <YooSvg className="w-11" />
          <span className="text-[28px] font-[600] !leading-none text-green2-500">life</span>
        </div>
        <span className="logo-text-gradient-green ml-0 text-[28px] font-[600]">Shop</span>
      </div>
    </div>
  );
};

export default HeaderLogo;
