import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

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
import { TriangleAlert } from "lucide-react";

const SignUpPage: React.FC<SignInPageProps> = ({ setauthMode }) => {
  const { signIn, signOut } = useAuthActions();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [conformPassword, setconformPassword] = useState("");
  const [error, seterror] = useState("");
  const [isloading, setisloding] = useState(false);

  const handleonPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== conformPassword) {
      seterror("Password and conform password not match");
      return;
    }
    setisloding(true);

    signIn("password", { email, password, flow: "signUp" })
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
          <CardTitle className="text-xl ">Create Account Continue</CardTitle>
          <CardDescription>use email or Other service</CardDescription>
        </CardHeader>
        {!!error && (
          <div className=" bg-red-400/70 mb-2 text-red-700  text-sm p-2 rounded-xl flex gap-x-2 items-center w-[300px]">
            <TriangleAlert />
            <p>{error}</p>
          </div>
        )}
        <CardContent className="space-y-5 px-0 pb-0">
          <form onSubmit={handleonPasswordSignUp} className="space-y-3">
            <Input
              type="email"
              placeholder="Email"
              disabled={isloading}
              required
              onChange={(e) => setemail(e.target.value)}
              className="rounded-lg w-[300px]"
            />
            <Input
              type="password"
              placeholder="Password"
              disabled={isloading}
              required
              onChange={(e) => setpassword(e.target.value)}
              className="rounded-lg w-[300px]"
            />

            <Input
              type="password"
              placeholder="Conform Password"
              disabled={isloading}
              required
              onChange={(e) => setconformPassword(e.target.value)}
              className="rounded-lg w-[300px]"
            />

            <Button
              className="w-full bg-Button hover:bg-Button/70 rounded-xl duration-200"
              size="lg"
              disabled={isloading}
              type="submit">
              Continue
            </Button>
          </form>

          <Separator className="bg-gray-500" />
          <div className="flex flex-col justify-center items-center gap-2">
            <Button
              size="lg"
              className="w-full rounded-xl bg-Button hover:bg-Button relative"
              disabled={isloading}
              onChange={() => handleProviderSignIn("google")}>
              <FcGoogle className="absolute left-6 size-5" />
              Continue at Google
            </Button>
            <Button
              onClick={() => handleProviderSignIn("github")}
              size="lg"
              className="w-full rounded-xl bg-Button hover:bg-Button relative"
              disabled={isloading}>
              <FaGithub className="absolute left-6 size-5" />
              Continue at GitHub
            </Button>
            <p>
              Have an Account
              <span
                className="underline text-blue-600"
                onClick={() => setauthMode("signIn")}>
                Sign IN
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
