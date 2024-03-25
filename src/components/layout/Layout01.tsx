import React from "react";
import { useWindowScroll } from "react-use";

import { TClassValue } from "@/types/global-type";
import { cn } from "@/utils/utils";

import Header from "../header/header";
import BottomNav from "./bottom-nav";

type TLayout01Props = {
  children?: React.ReactNode;
  classNameHeader?: TClassValue;
  classNameHScrolling?: TClassValue;
  classNameBNav?: TClassValue;
  className?: TClassValue;
  header?: React.ReactNode;
};

const Layout01 = ({
  children,
  classNameHeader,
  classNameBNav,
  className,
  header,
  classNameHScrolling,
}: TLayout01Props) => {
  const { y } = useWindowScroll();

  return (
    <div className={cn("flex min-h-[100dvh] flex-col pb-16", className)}>
      <div className={cn("z-50 w-full", classNameHeader, y > 0 && classNameHScrolling)}>
        {header || <Header />}
      </div>

      {children}

      <BottomNav className={cn(classNameBNav)} />
    </div>
  );
};

export default Layout01;
