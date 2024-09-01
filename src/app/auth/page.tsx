"use client";
import { useState } from "react";
import SignUpPage from "./components/SignUp";
import SignInPage from "./components/SignIn";
import { AuthMode } from "@/types/auth.types";

const AuthPage = () => {
  const [authMode, setauthMode] = useState<AuthMode>("signIn");

  return (
    <div className="h-full flex items-center justify-center bg-back">
      {authMode === "signIn" ? (
        <SignInPage setauthMode={setauthMode} />
      ) : (
        <SignUpPage setauthMode={setauthMode} />
      )}
    </div>
  );
};

export default AuthPage;
