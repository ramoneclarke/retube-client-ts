import { Inter, Montserrat } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import { ColorModeProvider } from "@/context/ColorModeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      <ColorModeProvider>
        <QueryClientProvider client={queryClient}>
          <main className={montserrat.className}>
            <Component {...pageProps} />
          </main>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ColorModeProvider>
    </SessionProvider>
  );
}
