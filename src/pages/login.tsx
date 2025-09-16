import { Lock, Mail, User2 } from "lucide-react";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import useAuth from "../hooks/useAuth";

import "../styles/login.css";
import { Card } from "../components/ui/card";

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
      <Card className="shadow-lg max-w-sm">
        <form
          className="flex flex-col items-center gap-6"
          onSubmit={handleLogin}
        >
          <User2 className="bg-accent-blue text-text-light size-24 rounded-full" />
          <div className="space-y-px">
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p>Sign in to your account</p>
          </div>
          <div className="flex w-full flex-col gap-2">
            <Input
              required
              Prefix={Mail}
              error={!!error}
              label="Email"
              name="email"
              placeholder="Email"
              type="email"
              onChange={() => setError("")}
            />
            <Input
              required
              Prefix={Lock}
              error={!!error}
              label="Password"
              name="password"
              placeholder="Password"
              type="password"
              onChange={() => setError("")}
            />
          </div>
          {error && (
            <small className="text-error-text -mt-6 self-start">{error}</small>
          )}
          <div className="w-full text-center">
            <Button isLoading={isLoading} type="submit" variant="primary">
              Sign In
            </Button>
            <small>Demo: admin@example.com - admin</small>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Login;
