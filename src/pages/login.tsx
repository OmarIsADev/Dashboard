import { Lock, Mail, User2 } from "lucide-react";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import useAuth from "../hooks/useAuth";

import "../styles/login.css";

function Login() {
  const { login, isLoading, error, setError } = useAuth();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Typed form element to access email and password's values
    const event = e.target as {
      email: { value: string };
      password: { value: string };
    } & HTMLFormElement;

    const {
      email: { value: email },
      password: { value: password },
    }: { email: { value: string }; password: { value: string } } = event;

    login(email, password);
  };

  return (
    <div id="login">
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center gap-6 rounded-xl bg-white p-8 shadow-lg"
      >
        <User2 className="size-24 rounded-full bg-blue-500 text-white" />
        <div className="space-y-px">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p>Sign in to your account</p>
        </div>
        <div className="flex flex-col gap-2">
          <Input
            onChange={() => setError("")}
            label="Email"
            placeholder="Email"
            Prefix={Mail}
            name="email"
            type="email"
            required
            error={!!error}
          />
          <Input
            onChange={() => setError("")}
            label="Password"
            placeholder="Password"
            Prefix={Lock}
            name="password"
            type="password"
            required
            error={!!error}
          />
        </div>
        {error && <small className="text-red-600 -mt-6 self-start">{error}</small>}
        <div className="w-full text-center">
          <Button isLoading={isLoading} variant="primary" type="submit">
            Sign In
          </Button>
          <small>Demo: admin@example.com - admin</small>
        </div>
      </form>
    </div>
  );
}

export default Login;
