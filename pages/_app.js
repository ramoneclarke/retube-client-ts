import { Inter, Montserrat } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      <main className={montserrat.className}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}
