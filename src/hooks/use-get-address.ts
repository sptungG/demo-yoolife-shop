import { skipToken } from "@reduxjs/toolkit/query";
import React, { useCallback } from "react";

import { vauApi } from "@/redux/query/province-query";

type TUseGetAddressProps = {};

type TData = {
  provinceCode?: string;
  districtCode?: string;
  wardCode?: string;
};

function useGetAddress({ provinceCode, districtCode, wardCode }: TData) {
  const { data: getAllProvincesRes } = vauApi.useGetAllProvincesQuery(
    !!provinceCode ? {} : skipToken,
  );
  const { data: getAllDistrictsRes } = vauApi.useGetAllDistrictsQuery(
    !!provinceCode ? { code: provinceCode } : skipToken,
    { refetchOnMountOrArgChange: true },
  );
  const { data: getAllWardsRes } = vauApi.useGetAllWardsQuery(
    districtCode ? { code: districtCode } : skipToken,
    { refetchOnMountOrArgChange: true },
  );

  // const getAddressText = useCallback(({ provinceCode, districtCode, wardCode }: TData) => {
  //   const province = getAllProvincesRes?.result.find(
  //     ({ code }) => provinceCode?.trim() === code.trim(),
  //   );
  //   const district = getAllDistrictsRes?.result.find(
  //     ({ code }) => districtCode?.trim() === code.trim(),
  //   );
  //   const ward = getAllWardsRes?.result.find(({ code }) => wardCode?.trim() === code.trim());

  //   return ;
  // }, []);
  return {
    find: (code?: string, arr: any[] = []) => arr.find((e) => code?.trim() === e?.code?.trim()),
    provinces: getAllProvincesRes?.result || [],
    districts: getAllDistrictsRes?.result || [],
    wards: getAllWardsRes?.result || [],
  };
}

export default useGetAddress;
