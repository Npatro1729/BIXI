import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {Appbar} from "../components/appbar"
import { SessionProvider } from "next-auth/react";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
    <Appbar/>
    <Component {...pageProps} />
    </SessionProvider>
  );
}
