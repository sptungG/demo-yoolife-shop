import React from "react";
import { useMedia, useWindowScroll as useWindowScroll0 } from "react-use";

type TuseWindowScrollProps = {};

const useWindowScroll = () => {
  const res = useWindowScroll0();
  return res;
};

export default useWindowScroll;
