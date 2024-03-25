import {
  BellRingIcon,
  CircleUserRoundIcon,
  HomeIcon,
  MessagesSquareIcon,
  ShoppingCartIcon,
} from "lucide-react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import React, { useId } from "react";

import useGetCart from "@/hooks/use-get-cart";
import { itemApi } from "@/redux/query/item-query";
import { TClassValue } from "@/types/global-type";
import { cn } from "@/utils/utils";

import { YooLogoSvg } from "../icons";

type TNavItem1Props = LinkProps & {
  isActive?: boolean;
  icon: React.ReactNode;
  label: React.ReactNode;
  className?: TClassValue;
  classNameLabel?: TClassValue;
  classNameActive?: TClassValue;
  badgeCount?: number;
};
const NavItem1 = ({
  isActive,
  icon,
  label,
  className,
  classNameLabel,
  classNameActive = "[&_svg]:fill-green2-100 [&_svg]:stroke-green2-500",
  badgeCount,
  ...props
}: TNavItem1Props) => {
  return (
    <Link
      className={cn(
        "relative flex h-full w-1/5 flex-col items-center justify-center text-gray-500",
        className,
        isActive && "text-green2-500",
      )}
      {...props}
    >
      <div className={cn("relative", isActive && classNameActive)}>
        {icon}
        {!!badgeCount && (
          <span className="tw-badge-count -top-1 h-4 w-auto min-w-4 border-none bg-green2-400 px-1">
            {badgeCount}
          </span>
        )}
      </div>

      <span
        className={cn(
          "mt-0.5 line-clamp-1 break-all text-xs opacity-50",
          classNameLabel,
          isActive && "font-[500] text-green2-600",
        )}
      >
        {label}
      </span>
      {isActive && (
        <div className="absolute -top-[1px] left-1/2 z-10 h-1 w-12 -translate-x-1/2 rounded-b bg-green2-400"></div>
      )}
    </Link>
  );
};

type TBottomNavProps = { className?: TClassValue };
const BottomNav = ({ className }: TBottomNavProps) => {
  const uid = useId();
  const { locale, asPath } = useRouter();
  const currentPath = asPath.split("?")[0];
  const { totalQuantity } = useGetCart();

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 z-50 mt-auto flex h-16 w-full flex-shrink-0 items-center border-t border-t-gray-100 bg-white/90 backdrop-blur-sm lg:hidden",
        className,
      )}
    >
      <NavItem1
        href={`/chat`}
        isActive={currentPath === "/chat"}
        icon={<MessagesSquareIcon />}
        badgeCount={2}
        label={"Trò chuyện"}
      />

      <NavItem1
        href={`/notifications`}
        isActive={currentPath === "/notifications"}
        icon={<BellRingIcon />}
        badgeCount={2}
        label={"Thông báo"}
      />

      <NavItem1
        href={`/`}
        isActive={currentPath === "/"}
        icon={<YooLogoSvg width={44} className="-mt-1" />}
        label={""}
      />

      <NavItem1
        href={`/cart`}
        isActive={currentPath === "/cart"}
        icon={<ShoppingCartIcon />}
        badgeCount={totalQuantity || 0}
        label={"Giỏ hàng"}
      />

      <NavItem1
        href={`/me`}
        isActive={currentPath === "/me"}
        classNameActive="[&_svg]:bg-green2-100 [&_svg]:rounded-full [&_svg]:stroke-green2-500"
        icon={<CircleUserRoundIcon />}
        label={"Tôi"}
      />
    </div>
  );
};

export default BottomNav;
