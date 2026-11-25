"use client";

import { useFormStatus } from "react-dom";

export default function LoginSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="login-button" disabled={pending}>
      {pending && <span className="spinner" />}
      {pending ? "Signing in..." : "Continue with GitHub"}
    </button>
  );
}
