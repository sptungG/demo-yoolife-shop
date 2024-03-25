import React from "react";

import Section001 from "@/components/icons/section-0-01.svg";
import Section002 from "@/components/icons/section-0-02.svg";
import Section003 from "@/components/icons/section-0-03.svg";
import Section004 from "@/components/icons/section-0-04.svg";

type TSections0Props = {};

const Sections0 = ({}: TSections0Props) => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-x-10 gap-y-4 px-6 pb-4 pt-6">
      <div className="group flex flex-col items-center gap-1">
        <Section001 className="w-16 rounded-2xl group-hover:shadow-lg group-hover:shadow-green-100" />
        <span className="font-[500] text-gray-600 group-hover:text-green-500">Mua sắm</span>
      </div>
      <div className="group flex flex-col items-center gap-1">
        <Section002 className="w-16 rounded-2xl group-hover:shadow-lg group-hover:shadow-red-100" />
        <span className="font-[500] text-gray-600 group-hover:text-red-500">Dịch vụ</span>
      </div>
      <div className="group flex flex-col items-center gap-1">
        <Section003 className="w-16 rounded-2xl group-hover:shadow-lg group-hover:shadow-purple-100" />
        <span className="font-[500] text-gray-600 group-hover:text-purple-500">Tra cứu</span>
      </div>
      <div className="group flex flex-col items-center gap-1">
        <Section004 className="w-16 rounded-2xl group-hover:shadow-lg group-hover:shadow-orange-100" />
        <span className="font-[500] text-gray-600 group-hover:text-orange-500">Tin nhắn</span>
      </div>
    </div>
  );
};

export default Sections0;
