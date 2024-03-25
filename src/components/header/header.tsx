import { CameraIcon, MoveDownIcon, SearchIcon, ShoppingCartIcon } from "lucide-react";
import { Link, Button as RAButton } from "react-aria-components";
import { useMedia, useWindowScroll } from "react-use";

import useGetCart from "@/hooks/use-get-cart";
import useTranslation from "@/hooks/use-translation";
import { itemApi } from "@/redux/query/item-query";
import { useAppSelector } from "@/redux/store";
import { EImageConfigType, TImageConfig } from "@/types/item-type";
import { cn } from "@/utils/utils";

import { YooSvg } from "../icons";
import ListBusinessType, { stringify } from "../item/list-business-type";
import ScrollBar from "../scrollbar/scroll-bar";
import CarouselSlider from "../slider/carousel-slider";
import HeaderCart from "./header-cart";
import HeaderLogo from "./header-logo";
import HeaderNav from "./header-nav";
import HeaderNotification from "./header-notification";
import HeaderSearch from "./header-search";
import HeaderUser from "./header-user";
import SelectLanguage from "./select-language";

type THeaderProps = { left?: React.ReactNode };

const Header = ({ left }: THeaderProps) => {
  const mediaAbove1024 = useMedia("(min-width: 1024px)");
  const { t } = useTranslation();
  const userData = useAppSelector((s) => s.user.data);

  return (
    <header className="relative h-14 overflow-hidden lg:h-[72px]">
      <div className="mx-auto flex h-full w-full max-w-[1200px] items-center justify-between px-2 md:px-6">
        {left || <div></div>}

        <div className="flex items-center">
          {!userData && (
            <div className="mr-0 flex h-9 items-center gap-4 pr-0 lg:mr-3 lg:border-r lg:border-r-gray-100 lg:pr-3">
              <Link href={"/register"} className="font-[600] text-green2-500 hover:underline">
                {t("Đăng ký")}
              </Link>
              <Link
                href={"/login"}
                className="flex h-8 items-center rounded-full bg-gradient-to-tr from-green2-200 via-green2-400 to-green3-600 px-3 py-1.5 font-[500] text-green2-50 hover:shadow-md hover:shadow-green2-100"
              >
                {t("Đăng nhập")}
              </Link>
            </div>
          )}

          <div className="flex h-9 gap-2 lg:mr-1 lg:gap-3 lg:border-r lg:border-r-green2-50 lg:pr-3">
            {mediaAbove1024 && <SelectLanguage />}
            {!!userData && (
              <div className="h-9 pl-2 lg:border-l lg:border-l-green2-50 lg:pl-3">
                <HeaderUser />
              </div>
            )}
            {mediaAbove1024 && <HeaderNotification />}
          </div>

          {mediaAbove1024 && <HeaderCart />}
        </div>
      </div>
    </header>
  );
};

type THeader01Props = {
  left?: React.ReactNode;
  right?: React.ReactNode;
};
export const Header01 = ({ left, right }: THeader01Props) => {
  const { totalQuantity } = useGetCart();
  const { y } = useWindowScroll();
  return (
    <header className="relative h-14 overflow-hidden lg:h-[72px]">
      <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-2 md:px-6">
        {left}

        {right || (
          <div className="ml-auto flex items-center gap-2.5">
            <Link
              href={`/cart`}
              className={cn(
                "relative flex h-9 w-9 items-center justify-center rounded-full bg-gray-900/50  text-green2-50",
                y > 0 && "border border-green2-100 bg-green2-50 text-green2-500",
              )}
            >
              <ShoppingCartIcon strokeWidth={2} className="text-inherit" />
              {!!totalQuantity && (
                <span className="tw-badge-count -top-1 h-4 w-auto min-w-4 border-none bg-green2-400 px-1">
                  {totalQuantity}
                </span>
              )}
            </Link>
            <HeaderNav
              classNameBtn={cn(
                "bg-gray-900/50  text-green2-50",
                y > 0 && "border border-gray-100 bg-gray-100 text-gray-500",
              )}
            />
          </div>
        )}
      </div>
    </header>
  );
};

type THeaderLgProps = {
  selectedBusinessType?: number[];
  onSelectBusinessType?: (v: number[]) => void;
};
export const HeaderLg = ({ selectedBusinessType = [], onSelectBusinessType }: THeaderLgProps) => {
  const { y } = useWindowScroll();
  const mediaAbove1024 = useMedia("(min-width: 1024px)", true);

  const { data: getListImageConfigRes } = itemApi.useGetListImageConfigQuery({
    maxResultCount: 4,
  });
  const listBanner =
    getListImageConfigRes?.result.filter(
      (element: TImageConfig) => element.type === EImageConfigType.YoolifeShoppingBanner,
    ) || [];

  if (mediaAbove1024)
    return (
      <div className={cn("relative z-50 flex min-h-[100dvh] w-full flex-col")}>
        {/* <Header
          left={
            <div className="flex items-center">
              <Link href={"/"} className={"mr-6"}>
                <HeaderLogo />
              </Link>
              <HeaderSearch />
            </div>
          }
        /> */}
        <Header
          left={
            <div className="flex items-center">
              <Link href={"/"} className={"mr-1"}>
                <HeaderLogo />
              </Link>
              <div className="w-fit self-center px-2">
                <div className="flex h-11 w-full items-center border-b border-green2-200 pl-2 pr-2">
                  <SearchIcon size={22} className="mr-2 flex-shrink-0 text-green2-500" />
                  <RAButton className="inline-block animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white bg-gradient-to-r from-green2-500 via-green3-600 bg-clip-text pr-5 text-left text-[12px] text-sm font-[500] text-transparent outline-none">
                    Tìm kiếm cửa hàng, sản phẩm, danh mục...
                  </RAButton>
                </div>
              </div>
            </div>
          }
        />
        <div className="mx-auto -mt-[80px] flex min-h-0 max-w-[1200px] flex-[1_1_auto] flex-col justify-center">
          <div className="mb-6 ml-0.5 flex flex-row items-baseline self-center">
            <div className="-mb-1.5 mr-1 flex items-baseline">
              <YooSvg className="w-[92px]" />
              <span className="text-[64px] font-[600] !leading-none text-green2-500">life</span>
            </div>
            <span className="logo-text-gradient-green ml-0 text-[64px] font-[600]">Shop</span>
          </div>

          <ScrollBar
            suppressScrollY
            className={cn(
              "sticky left-0 top-0 z-50 pt-4",
              y > 200 && "bg-white/50 backdrop-blur-sm",
            )}
          >
            <ListBusinessType
              className="justify-center gap-x-[34px]"
              selectedKeys={[JSON.stringify(selectedBusinessType)]}
              onSelectionChange={(s) => {
                const newValue = JSON.parse((Array.from(s)?.[0] || "[]") as string);
                onSelectBusinessType?.(newValue);
              }}
            />
          </ScrollBar>

          <div className="mx-auto mt-4 max-w-[1200px]">
            <CarouselSlider
              items={listBanner.length === 1 ? Array(5).fill(listBanner[0]) : listBanner}
              showArrows={false}
              showDots={listBanner.length > 1}
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center pb-4">
          <div className="animate-bounce rounded-full border border-green2-200 p-2 shadow-md shadow-green2-200">
            <MoveDownIcon className="text-green2-500" size={32} />
          </div>
        </div>
      </div>
    );

  return (
    <>
      <Header
        left={
          <div className="flex items-center">
            <Link href={"/"} className={"mr-6"}>
              <HeaderLogo />
            </Link>
          </div>
        }
      />
      <div className="relative mx-auto mb-0 w-full max-w-[1200px] rounded-b-3xl bg-transparent">
        <div className="relative">
          <CarouselSlider
            items={listBanner.length === 1 ? Array(5).fill(listBanner[0]) : listBanner}
            showArrows={false}
            showDots={listBanner.length > 1}
          />

          {!mediaAbove1024 && (
            <div className="mt-2 w-full px-2 lg:hidden">
              <div className="flex h-11 w-full items-center rounded bg-white px-2 shadow">
                <SearchIcon size={22} className="mr-1 flex-shrink-0 text-green2-500" />
                <RAButton className="inline-block animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white bg-gradient-to-r from-green2-500 via-green3-600 bg-clip-text pr-5 text-left text-[12px] text-sm font-[500] text-transparent outline-none">
                  Tìm kiếm cửa hàng, sản phẩm, danh mục...
                </RAButton>
                <RAButton className="ml-auto shrink-0 border-l border-gray-300 pl-2 text-gray-400 outline-none">
                  <CameraIcon strokeWidth={1.5} />
                </RAButton>
              </div>
            </div>
          )}
        </div>
      </div>
      <ScrollBar
        suppressScrollY
        suppressAutoHide
        className="mx-auto -mt-4 w-full max-w-[1200px] bg-white pt-8 lg:rounded-t [&_.ms-thumb]:bg-gray-200"
      >
        <ListBusinessType selectedKeys={[stringify(selectedBusinessType)]} />
      </ScrollBar>
    </>
  );
};

export default Header;
