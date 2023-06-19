import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { I18nProvider, SSRProvider } from "react-aria";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "src/redux/store";
import "src/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress color="#0D90F3" options={{ showSpinner: false }} />
      <SSRProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <I18nProvider>
              <Component {...pageProps} />
            </I18nProvider>
          </PersistGate>
        </Provider>
      </SSRProvider>
    </>
  );
}
