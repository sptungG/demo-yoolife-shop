import { skipToken } from "@reduxjs/toolkit/query";
import { t } from "i18next";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useId, useState } from "react";
import { Button } from "react-aria-components";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import NImage from "@/components/shared/next-image";
import { EffectCarousel } from "@/components/slider/effects";
import { voucherApi } from "@/redux/query/voucher-query";
import { TImageConfig } from "@/types/item-type";
import { TVoucher } from "@/types/voucher-type";
import { cn } from "@/utils/utils";

const VoucherSlider = () => {
  const uid = useId();
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const { data: getVouchersRes } = voucherApi.useGetListVoucherByUserQuery(
    10 ? { providerId: 10 } : skipToken,
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const listVoucher = getVouchersRes?.data || [];

  return (
    <div className=" py-[20px] md:px-[10px] lg:px-[30px] ">
      <Swiper
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        className="z-0 "
        loop
        //slidesPerView={3.5}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          400: {
            slidesPerView: 1.5,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3.5,
            spaceBetween: 10,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
        effect="carousel"
        pagination={false}
        modules={[Autoplay, Navigation, Pagination]}
      >
        {listVoucher?.map((item, index) => (
          <SwiperSlide
            key={uid + index}
            className=" w-full max-w-full  rounded-md sm:rounded-sm md:rounded-md  lg:max-w-full lg:rounded-lg xl:rounded-3xl"
          >
            <div className="swiper-carousel-animate-opacity flex flex-row  rounded-md sm:rounded-sm md:rounded-md  lg:rounded-lg xl:rounded-3xl">
              <div
                style={{
                  paddingLeft: "0.2rem",
                  backgroundColor: "#f8d0d3",
                  backgroundImage: "radial-gradient(#fff 50%, transparent 50%)",
                  backgroundPosition: "-0.25rem -0.25rem",
                  backgroundRepeat: "repeat",
                  backgroundSize: "0.5rem 0.5rem",
                }}
                className=" m-0 rounded border-2 border-b-[#f8d0d3] border-l-white border-r-[#f8d0d3] border-t-[#f8d0d3] text-xs lg:text-sm"
              >
                <div
                  className="flex h-full w-full items-center justify-between gap-2 bg-[#fff4f3] "
                  key={index}
                >
                  <div className="p-2 text-[#d30000] xl:p-4">
                    <div>
                      {t("Giảm")} {item.percentage}%
                    </div>
                    <div>
                      {t("Đơn tối thiểu")}
                      {item.minBasketPrice}
                    </div>
                    <div>
                      {t("Giảm tối đa")} {item.discountAmount}
                    </div>
                    <div className="text-gray-500">HSD: {item.dateEnd.substring(0, 10)}</div>
                  </div>
                  <div className="h-full outline-dashed outline-[0.5px] outline-[#a4a4a4]"></div>
                  <div className="flex h-full items-center pl-2 pr-4 ">
                    <div className="cursor-pointer bg-[#d30000] px-2 py-1 text-white">Lưu</div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Button
        className={({ isDisabled }) =>
          cn(
            "absolute left-6 top-1/2 z-0 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gray-200 text-gray-500",
            isDisabled && "bg-gray-200 text-gray-500 opacity-50",
          )
        }
        onPress={() => swiperInstance?.slidePrev()}
      >
        <ChevronLeftIcon size={36} className="shrink-0" />
      </Button>
      <Button
        className={({ isDisabled }) =>
          cn(
            "absolute right-6 top-1/2 z-0 flex h-8 w-8 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-gray-200 text-gray-500",
            isDisabled && "bg-gray-200 text-gray-500 opacity-50",
          )
        }
        onPress={() => swiperInstance?.slideNext()}
      >
        <ChevronRightIcon size={36} className="shrink-0" />
      </Button>
    </div>
  );
};

export default VoucherSlider;
