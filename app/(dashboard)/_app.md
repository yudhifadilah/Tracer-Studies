// pages/_app.tsx
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Dshomeewe from "./admin/page";
import Dshomeqq from "./user/page";
import { Layout } from "@/components/layout/layout";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Dshomeqq />
    </SessionProvider>
  );
}

export default MyApp;
