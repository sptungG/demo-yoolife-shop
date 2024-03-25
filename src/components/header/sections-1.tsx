import React from "react";
import { Grid, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Section01 from "@/components/icons/section-01.svg";
import Section02 from "@/components/icons/section-02.svg";
import Section03 from "@/components/icons/section-03.svg";
import Section04 from "@/components/icons/section-04.svg";
import Section05 from "@/components/icons/section-05.svg";
import Section06 from "@/components/icons/section-06.svg";
import Section07 from "@/components/icons/section-07.svg";
import Section08 from "@/components/icons/section-08.svg";
import Section09 from "@/components/icons/section-09.svg";
import Section10 from "@/components/icons/section-10.svg";
import Section11 from "@/components/icons/section-11.svg";
import Section12 from "@/components/icons/section-12.svg";

type TSections1Props = {};

const Sections1 = ({}: TSections1Props) => {
  return (
    <Swiper
      className="h-full w-full px-3 pb-4 pt-6"
      slidesPerView={8}
      grid={{
        rows: 2,
        fill: "row",
      }}
      pagination
      spaceBetween={16}
      modules={[Grid, Pagination]}
      loop={false}
      breakpoints={{
        0: {
          slidesPerView: 2,
          grid: { rows: 2, fill: "row" },
        },
        560: {
          slidesPerView: 3,
          grid: { rows: 2, fill: "row" },
        },
        680: {
          slidesPerView: 4,
          grid: { rows: 2, fill: "row" },
        },
        768: {
          slidesPerView: 6,
          grid: { rows: 2, fill: "row" },
        },
        1000: {
          slidesPerView: 8,
          grid: { rows: 2, fill: "row" },
        },
      }}
    >
      <SwiperSlide>
        <div className="group flex flex-shrink-0 flex-col items-center gap-1 whitespace-nowrap">
          <Section01 className="w-16 rounded-2xl group-hover:shadow-lg group-hover:shadow-blue-100" />
          <span className="font-[500] text-gray-600 group-hover:text-blue-500">Giáo dục</span>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="group flex flex-shrink-0 flex-col items-center gap-1 whitespace-nowrap">
          <Section02 className="w-16 rounded-2xl group-hover:shadow-lg group-hover:shadow-green-100" />
          <span className="font-[500] text-gray-600 group-hover:text-green-500">Ẩm thực</span>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="group flex flex-shrink-0 flex-col items-center gap-1 whitespace-nowrap">
          <Section03 className="w-16 rounded-2xl group-hover:shadow-lg group-hover:shadow-red-100" />
          <span className="font-[500] text-gray-600 group-hover:text-red-500">Y tế</span>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="group flex flex-shrink-0 flex-col items-center gap-1 whitespace-nowrap">
          <Section04 className="w-16 rounded-2xl group-hover:shadow-lg group-hover:shadow-orange-100" />
          <span className="font-[500] text-gray-600 group-hover:text-orange-500">CSSK</span>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="group flex flex-shrink-0 flex-col items-center gap-1 whitespace-nowrap">
          <Section05 className="w-16 rounded-2xl group-hover:shadow-lg group-hover:shadow-pink-100" />
          <span className="font-[500] text-gray-600 group-hover:text-pink-500">Du lịch</span>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="group flex flex-shrink-0 flex-col items-center gap-1 whitespace-nowrap">
          <Section06 className="w-16 rounded-2xl group-hover:shadow-lg group-hover:shadow-blue-100" />
          <span className="font-[500] text-gray-600 group-hover:text-blue-500">Lưu trú</span>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="group flex flex-shrink-0 flex-col items-center gap-1 whitespace-nowrap">
          <Section07 className="w-16 rounded-2xl group-hover:shadow-lg group-hover:shadow-orange-100" />
          <span className="font-[500] text-gray-600 group-hover:text-orange-500">Làng nghề</span>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="group flex flex-shrink-0 flex-col items-center gap-1 whitespace-nowrap">
          <Section08 className="w-16 rounded-2xl group-hover:shadow-lg group-hover:shadow-violet-100" />
          <span className="font-[500] text-gray-600 group-hover:text-violet-500">Giải trí</span>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="group flex flex-shrink-0 flex-col items-center gap-1 whitespace-nowrap">
          <Section09 className="w-16 rounded-2xl group-hover:shadow-lg group-hover:shadow-purple-100" />
          <span className="font-[500] text-gray-600 group-hover:text-purple-500">Sửa chữa</span>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="group flex flex-shrink-0 flex-col items-center gap-1 whitespace-nowrap">
          <Section10 className="w-16 rounded-2xl group-hover:shadow-lg group-hover:shadow-pink-100" />
          <span className="font-[500] text-gray-600 group-hover:text-pink-500">Giao thông</span>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="group flex flex-shrink-0 flex-col items-center gap-1 whitespace-nowrap">
          <Section11 className="w-16 rounded-2xl group-hover:shadow-lg group-hover:shadow-blue-100" />
          <span className="font-[500] text-gray-600 group-hover:text-blue-500">Việc làm</span>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="group flex flex-shrink-0 flex-col items-center gap-1 whitespace-nowrap">
          <Section12 className="w-16 rounded-2xl group-hover:shadow-lg group-hover:shadow-green-100" />
          <span className="font-[500] text-gray-600 group-hover:text-green-500">Thể thao</span>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Sections1;
