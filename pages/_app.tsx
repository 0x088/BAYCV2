import "../styles/style.css";
import { AppProps } from "next/app";
import RainbowProvider from "@/providers/Rainbow";
import Head from "next/head";

const BAYCV2 = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>BAYCV2</title>
      </Head>
      <RainbowProvider>
        <Component {...pageProps} />
      </RainbowProvider>
    </>
  );
};

export default BAYCV2;
