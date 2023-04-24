import { Inter, Montserrat } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import { ColorModeProvider } from "@/context/ColorModeContext";
const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      <ColorModeProvider>
        <main className={montserrat.className}>
          <Component {...pageProps} />
        </main>
      </ColorModeProvider>
    </SessionProvider>
  );
}
