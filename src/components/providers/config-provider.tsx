import { skipToken } from "@reduxjs/toolkit/query";
import { useRouter } from "next/router";
import React from "react";
import { RouterProvider } from "react-aria-components";
import { I18nextProvider } from "react-i18next";
import { useMedia } from "react-use";
import { Toaster } from "sonner";

import i18n from "@/i18n";
import { userApi } from "@/redux/query/user-query";
import { useAppSelector } from "@/redux/store";

type TConfigProviderProps = {
  children: React.ReactNode;
};

const ConfigProvider = ({ children }: TConfigProviderProps) => {
  const { push } = useRouter();
  const mediaAbove1024 = useMedia("(min-width: 1024px)");
  const accessToken = useAppSelector((s) => s.auth.accessToken);
  const res = userApi.useGetCurrentUserQuery(!!accessToken ? { at: !!accessToken } : skipToken, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  return (
    <I18nextProvider i18n={i18n}>
      <RouterProvider navigate={push}>
        {children}
        <Toaster
          duration={1200}
          richColors
          closeButton
          position={mediaAbove1024 ? "bottom-right" : "top-center"}
          toastOptions={{
            style: { backgroundColor: "#fff", border: "none" },
            classNames: {
              title: "text-base line-clamp-1 break-all !ml-1",
              description: "!-mt-1 !ml-1",
              closeButton:
                "!top-1 !right-1 !left-auto !translate-x-0 !translate-y-0 !border-none !bg-transparent [&_svg]:w-[24px] [&_svg]:h-[24px]",
              toast: "!px-3 !py-2 !min-h-[56px]",
            },
          }}
        />
      </RouterProvider>
    </I18nextProvider>
  );
};

export default ConfigProvider;
