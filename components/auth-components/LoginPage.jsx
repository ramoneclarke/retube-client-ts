import React from "react";
import SignInWithGoogleButton from "./SignInWithGoogleButton";
import Link from "next/link";
import Logo from "../Shared/Logo";

const LoginPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-lighter dark:bg-darker">
      <div className="absolute top-4 left-4">
        <Logo />
      </div>
      <div className="flex h-fit w-full min-w-[10rem] flex-col items-center gap-2 p-4 pt-8 md:h-96 lg:w-2/5">
        <h1 className="mb-2 text-4xl font-semibold text-darkest dark:text-lightest md:mb-8 md:text-5xl">
          Welcome back
        </h1>
        <SignInWithGoogleButton />
        <div className="">
          <p className="text-darkest dark:text-lightest">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-mid">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
