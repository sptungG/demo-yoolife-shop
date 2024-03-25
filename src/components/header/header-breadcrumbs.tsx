import { useRouter } from "next-nprogress-bar";
import { useId } from "react";
import { Breadcrumb, Breadcrumbs, Link, LinkProps } from "react-aria-components";
import { useMedia } from "react-use";

import { TClassValue } from "@/types/global-type";
import { cn } from "@/utils/utils";

import { YooLogoSvg } from "../icons";

type THeaderBreadcrumbsProps = {
  items?: LinkProps[];
  split?: React.ReactNode;
  className?: TClassValue;
};

const HeaderBreadcrumbs = ({ items = [], split = "/", className }: THeaderBreadcrumbsProps) => {
  const uid = useId();
  const { back } = useRouter();
  const mediaAbove1024 = useMedia("(min-width: 1024px)");

  const internalItems = [
    {
      href: "/",
      children: <YooLogoSvg className="w-11 md:w-12" />,
      className: "px-0",
      // onPress: () => {
      //   back({ showProgressBar: true });
      //   // setTimeout(() => {
      //   //   document.body?.scrollIntoView({ behavior: "smooth", block: "start" });
      //   // }, 300);
      // },
    },
    ...items,
  ] as LinkProps[];

  return (
    <Breadcrumbs<LinkProps>
      dependencies={[uid]}
      slot={null}
      className={cn("flex items-center", className)}
    >
      {internalItems.map(({ className, ...item }, index) => (
        <Breadcrumb id={item.href} key={uid + item.href} className="flex items-center">
          <Link
            slot={null}
            className={({ isCurrent }) =>
              cn(
                "line-clamp-1 cursor-pointer break-all px-1 text-lg font-[400] text-gray-500",
                className,
                isCurrent && "font-[500]",
              )
            }
            isDisabled={false}
            {...item}
          />
          {index < items?.length && <span className="-mt-1 text-xl text-gray-500">{split}</span>}
        </Breadcrumb>
      ))}
    </Breadcrumbs>
  );
};

export default HeaderBreadcrumbs;
