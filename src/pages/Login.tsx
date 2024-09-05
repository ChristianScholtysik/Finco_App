import { useState } from "react";
import ButtonBlue from "../components/ButtonBlue";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import supabaseClient from "../lib/supabaseClient";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const userContext = useUserContext();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const authResponse = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (authResponse.error) {
      console.error("Login error", authResponse.error.message);
      setErrorMessage(authResponse.error.message);
      return;
    }

    if (authResponse.data.user) {
      console.log("Useranmeldung erfolgreich", authResponse.data.user);
      setSuccessMessage("Login successful.");

      userContext?.setUser(authResponse.data.user);
      setTimeout(() => navigate("/"), 1000);
    }
  };

  const handleResetPassword = async (e: React.MouseEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const resetResponse = await supabaseClient.auth.resetPasswordForEmail(
      email
    );

    if (resetResponse.error) {
      console.error(resetResponse.error.message);
      setErrorMessage(resetResponse.error.message);
      return;
    }

    if (resetResponse.data) {
      setSuccessMessage("Password reset link has been sent to your email.");
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md ">
        <Logo />
        <h2 className="text-3xl font-semibold text-center mb-4 text-tBase">
          Welcome back
        </h2>
        <p className="text-center mb-12 mt-4 font-normal text-sm text-tBase p-2">
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
        <p
          className="flex justify-end text-tBase mb-16 text-small cursor-pointer"
          onClick={handleResetPassword}>
          Forgot password?
        </p>

        <div className="w-full mb-6">
          <ButtonBlue text="Login" />
        </div>
        {errorMessage && (
          <p className=" text-red-600 text-sm text-center font-sm mb-10">
            {errorMessage}
          </p>
        )}
        {successMessage && (
          <p className="text-green-600 text-sm text-center font-sm mb-10">
            {successMessage}
          </p>
        )}
        <div className="flex justify-center gap-2">
          <p className="text-tBase text-center text-small">
            Don’t have any account?
          </p>

          <p
            className="text-sky-600 text-center text-small cursor-pointer"
            onClick={handleSignUp}>
            Sign up
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
