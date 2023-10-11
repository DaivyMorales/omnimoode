import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();

  const excludedRoutes = [
    "/login",
    "/register",
    "/register/confirm",
    "/recovery",
    "/recovery/changePassword",
  ];

  const isNavbarVisible = !excludedRoutes.includes(router.pathname);

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        {isNavbarVisible ? (
          <Navbar>
            <Component {...pageProps} />
          </Navbar>
        ) : (
          <Component {...pageProps} />
        )}
      </Provider>
    </SessionProvider>
  );
}

