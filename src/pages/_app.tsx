import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();

  // Define an array of routes where you don't want the Navbar to appear
  const excludedRoutes = ["/login", "/register"];

  // Check if the current route is in the excludedRoutes array
  const isNavbarVisible = !excludedRoutes.includes(router.pathname);

  return (
    <SessionProvider session={session}>
      {isNavbarVisible && <Navbar />}
      <Component {...pageProps} />
    </SessionProvider>
  );
}
