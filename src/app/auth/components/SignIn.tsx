import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { TriangleAlert } from "lucide-react";

import { SignInPageProps } from "@/types/auth.types";
import { useAuthActions } from "@convex-dev/auth/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const SignInPage: React.FC<SignInPageProps> = ({ setauthMode }) => {
  const { signIn, signOut } = useAuthActions();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");

  const [isloading, setisloding] = useState(false);
  const handleonPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setisloding(true);

    signIn("password", { email, password, flow: "signIn" })
      .catch((e) => {
        seterror("Email or password is incorrect");
      })
      .finally(() => {
        setisloding(false);
      });
  };

  const handleProviderSignIn = (value: "github" | "google") => {
    setisloding(true);
    signIn(value).finally(() => {
      setisloding(false);
    });
  };

  return (
    <div>
      <Card className="w-full h-full p-8 bg-primary">
        <CardHeader className="pt-0 px-0">
          <CardTitle className="text-xl ">Login to Continue</CardTitle>
          <CardDescription>use email or Other service</CardDescription>
        </CardHeader>
        {!!error && (
          <div className=" bg-red-400/70 mb-2 text-red-700  text-sm p-3 rounded-xl flex gap-x-2 items-center">
            <TriangleAlert />
            <p>{error}</p>
          </div>
        )}

        <CardContent className="space-y-5 px-0 pb-0">
          <form onSubmit={handleonPasswordSignIn} className="space-y-3">
            <Input
              type="email"
              placeholder="Email"
              disabled={false}
              required
              onChange={(e) => setemail(e.target.value)}
              className="rounded-lg w-[300px]"
            />
            <Input
              type="password"
              placeholder="Password"
              disabled={false}
              required
              onChange={(e) => setpassword(e.target.value)}
              className="rounded-lg w-[300px]"
            />

            <Button
              className="w-full bg-Button hover:bg-Button/70 rounded-xl duration-200"
              size="lg"
              disabled={false}
              type="submit">
              Continue
            </Button>
          </form>

          <Separator className="bg-gray-500" />
          <div className="flex flex-col justify-center items-center gap-2">
            <Button
              size="lg"
              className="w-full rounded-xl bg-Button hover:bg-Button relative"
              onClick={() => handleProviderSignIn("google")}
              disabled={false}>
              <FcGoogle className="absolute left-6 size-5" />
              Continue at Google
            </Button>
            <Button
              size="lg"
              onClick={() => handleProviderSignIn("github")}
              className="w-full rounded-xl bg-Button hover:bg-Button relative"
              disabled={false}>
              <FaGithub className="absolute left-6 size-5" />
              Continue at GitHub
            </Button>
            <p>
              Don&apos;t have account
              <span
                className="underline text-blue-600"
                onClick={() => setauthMode("signUp")}>
                Sign Up
              </span>
            </p>
          </div>
        </CardContent>
        <button onClick={() => signOut()}>sogn</button>
      </Card>
    </div>
  );
};
export default SignInPage;
