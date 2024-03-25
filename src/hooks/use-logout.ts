import { useRouter } from "next/router";
import { toast } from "sonner";

import { authApi } from "@/redux/query/auth-query";
// import { setConnection } from "src/redux/reducer/chat.reducer";
// import { setSiderCollapsed } from "src/redux/reducer/visible.reducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";

import useTranslation from "./use-translation";

export default function useLogout() {
  const { t } = useTranslation();
  const { replace } = useRouter();
  const [mutateLogout, { isLoading }] = authApi.useLogoutMutation();
  const [mutateLogoutFcm, {}] = authApi.useLogoutFcmMutation();
  const authData = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();

  const deleteFcmToken = () => {
    if (!!authData.fcmToken)
      mutateLogoutFcm({ token: authData.fcmToken })
        .unwrap()
        .then(() => {
          console.log("Token deleted.");
        })
        .catch((err) => {
          console.log("Unable to delete token. ", err);
        });
  };

  const handleLogout = () => {
    mutateLogout({})
      .unwrap()
      .then(() => {
        toast.success(t("Đăng xuất thành công"));
      })
      .catch((err) => {})
      .finally(() => {
        // if (!!hubConnection) {
        //   hubConnection.off("getBusinessChatMessage");
        //   hubConnection.off("deleteBusinessChatMessage");
        //   dispatch(setConnection(undefined));
        // }
        deleteFcmToken();
        replace("/login");
      });
  };
  return { isLoadingLogout: isLoading, handleLogout };
}
