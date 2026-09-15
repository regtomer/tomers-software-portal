import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function LoginPage() {
  return (
    <main
      id="main"
      className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16 sm:px-8"
    >
      <div className="mb-6 h-px w-12 bg-accent" aria-hidden="true" />
      <h1 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
        Sign in
      </h1>
      <p className="mt-3 text-sm text-muted">
        Invite-only access. Use the credentials you were given.
      </p>
      <div className="mt-10">
        <LoginForm />
      </div>
    </main>
  );
}
