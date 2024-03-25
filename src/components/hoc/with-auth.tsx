import { useRouter } from "next/router";

import { useAppSelector } from "@/redux/store";

import Navigate from "../shared/navigate";

function withAuth(WrappedComponent: any) {
  return function ComponentWithoutAuth() {
    const { pathname } = useRouter();
    const accessToken = useAppSelector((s) => s.auth.accessToken);

    if (!accessToken) return <Navigate to={`/login?callbackUrl=${pathname}`} />;

    return <WrappedComponent />;
  };
}

export default withAuth;
