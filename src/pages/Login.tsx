import { useState } from "react";
import ButtonBlue from "../components/ButtonBlue";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <Logo />
        <h2 className="text-3xl font-semibold text-center mb-6 text-tBase">
          Welcome back
        </h2>
        <p className="text-center mb-16 mt-6 font-normal text-sm text-tBase p-2">
          Ready to dive in and take charge of your finances again?
        </p>
        <div className="mb-4">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-6 py-4 border border-border  rounded-full text-tBase"
            placeholder="Email"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-6 py-4 border border-border rounded-full text-tBase"
            placeholder="Password"
          />
        </div>
        <p className="flex justify-end text-tBase mb-20 text-small">
          Forgot password?
        </p>
        <div className="w-full mb-20">
          <ButtonBlue text="Login" />
        </div>
        <div className="flex justify-center gap-2">
          <p className="text-tBase text-center text-small">
            Don’t have any account?
          </p>
          <Link to="/signup">
            <p className="text-sky-600 text-center text-small">Sign up</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
