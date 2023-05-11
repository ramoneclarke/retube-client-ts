import React from "react";
import Logo from "../Shared/Logo";
import SignUpWithGoogleButton from "./SignUpWithGoogleButton";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-lighter dark:bg-darker">
      <div className="absolute top-4 left-4">
        <Logo />
      </div>
      <div className="flex h-96 w-2/5 min-w-[10rem] flex-col items-center gap-2 p-4 pt-8">
        <h1 className="mb-8 text-5xl font-semibold text-darkest dark:text-lightest">
          Create your account
        </h1>
        <SignUpWithGoogleButton />
        <div className="">
          <p className="text-darkest dark:text-lightest">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-mid">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
