import Head from "next/head";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex h-64 w-64 items-center justify-center bg-green-400">
          <p className="text-4xl font-extrabold text-black">ReTube</p>
        </div>
      </main>
    </>
  );
}
