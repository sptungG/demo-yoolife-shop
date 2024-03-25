import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useId, useState } from "react";
import { Button } from "react-aria-components";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import { TImageConfig } from "@/types/item-type";
import { cn } from "@/utils/utils";

import Image from "../shared/image";
import { EffectCarousel } from "./effects";

type TCarouselSliderProps = {
  items?: TImageConfig[];
  showArrows?: boolean;
  showDots?: boolean;
};

const CarouselSlider = ({ items = [], showArrows, showDots }: TCarouselSliderProps) => {
  const uid = useId();
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  return (
    <div className="relative">
      <Swiper
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        className="z-0"
        loop
        grabCursor
        slidesPerView={"auto"}
        effect="carousel"
        autoplay={{
          delay: 3000,
        }}
        pagination={showDots ? { type: "bullets" } : false}
        modules={[Autoplay, Navigation, Pagination, EffectCarousel]}
      >
        {items.map((item, index) => (
          <SwiperSlide
            key={uid + index}
            className="w-full max-w-[calc(100%-14px)] rounded-md lg:max-w-[calc(100%-48px)] lg:rounded-lg xl:rounded-3xl"
          >
            <div className="swiper-carousel-animate-opacity relative flex h-full items-center justify-center rounded-md lg:rounded-lg xl:rounded-3xl">
              <Image
                className="max-h-[300px] w-auto rounded-md object-contain object-center lg:rounded-lg xl:rounded-3xl"
                src={item.imageUrl}
                alt=""
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {!!showArrows && (
        <Button
          className={({ isDisabled }) =>
            cn(
              "absolute left-6 top-1/2 z-0 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gray-900/50 text-gray-50",
              isDisabled && "bg-gray-900/50 text-gray-50 opacity-50",
            )
          }
          onPress={() => swiperInstance?.slidePrev()}
        >
          <ChevronLeftIcon size={32} className="shrink-0" />
        </Button>
      )}
      {!!showArrows && (
        <Button
          className={({ isDisabled }) =>
            cn(
              "absolute right-6 top-1/2 z-0 flex h-8 w-8 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-gray-900/50 text-gray-50",
              isDisabled && "bg-gray-900/50 text-gray-50 opacity-50",
            )
          }
          onPress={() => swiperInstance?.slideNext()}
        >
          <ChevronRightIcon size={32} className="shrink-0" />
        </Button>
      )}
    </div>
  );
};

export default CarouselSlider;
