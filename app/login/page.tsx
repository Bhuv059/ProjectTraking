import { signIn } from "@/auth";
import LoginSubmitButton from "@/app/components/auth/LoginSubmitButton";
export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>

        <p className="login-description">Sign in to manage your projects.</p>

        <form
          action={async () => {
            "use server";
            await signIn("github", {
              redirectTo: "/dashboard",
            });
          }}
        >
          <LoginSubmitButton />
        </form>
      </div>
    </div>
  );
}
