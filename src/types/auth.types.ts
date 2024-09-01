export type AuthMode = "signUp" | "signIn";
export interface SignInPageProps {
  setauthMode: React.Dispatch<React.SetStateAction<AuthMode>>;
}
