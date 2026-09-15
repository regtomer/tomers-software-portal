import type { Metadata } from "next";
import { ChangePasswordForm } from "./change-password-form";

export const metadata: Metadata = {
  title: "Change password",
};

export default function ChangePasswordPage() {
  return (
    <main
      id="main"
      className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16 sm:px-8"
    >
      <div className="mb-6 h-px w-12 bg-accent" aria-hidden="true" />
      <h1 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
        Change password
      </h1>
      <p className="mt-3 text-sm text-muted">
        Choose a new password before continuing to the portal.
      </p>
      <div className="mt-10">
        <ChangePasswordForm />
      </div>
    </main>
  );
}
