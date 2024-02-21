import type { AppProps } from "next/app";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Layout } from "@/components/layout/layout";
import { Providers } from "../../providers";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextThemesProvider defaultTheme="system" attribute="class">
      <Providers>
        <Layout>
        <h1>Product Table</h1>
        </Layout>
      </Providers>
    </NextThemesProvider>
  );
}

export default MyApp;
