import { Inter, Montserrat } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import { ColorModeProvider } from "@/context/ColorModeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      <ColorModeProvider>
        <QueryClientProvider client={queryClient}>
          <main className={montserrat.className}>
            <Component {...pageProps} />
          </main>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      </ColorModeProvider>
    </SessionProvider>
  );
}
