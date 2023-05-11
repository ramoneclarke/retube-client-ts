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
      <div className="flex h-96 w-2/5 min-w-[10rem] flex-col items-center gap-2 p-4 pt-8">
        <h1 className="mb-8 text-5xl font-semibold text-darkest dark:text-lightest">
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
