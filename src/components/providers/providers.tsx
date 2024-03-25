import { GlobalScrollbar } from "mac-scrollbar";
import { PagesProgressBar } from "next-nprogress-bar";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { useMedia } from "react-use";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "../../redux/store";
import PageLoading from "../shared/page-loading";
import ConfigProvider from "./config-provider";

// const GlobalScrollbar = dynamic(() => import("mac-scrollbar").then((m) => m.GlobalScrollbar), {
//   ssr: false,
// });

const Providers = ({ children }: React.PropsWithChildren) => {
  const mediaAbove768 = useMedia("(min-width: 768px)", true);

  return (
    <>
      <PagesProgressBar
        height="4px"
        color="#10b981"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <Provider store={store}>
        <PersistGate loading={<PageLoading />} persistor={persistor}>
          <Suspense fallback={<PageLoading />}>
            <ConfigProvider>{children}</ConfigProvider>
          </Suspense>
        </PersistGate>
      </Provider>
      {mediaAbove768 && <GlobalScrollbar suppressScrollX />}
    </>
  );
};

export default Providers;
