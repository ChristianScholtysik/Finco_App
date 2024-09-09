import { useNavigate } from "react-router-dom";
import supabaseClient from "../lib/supabaseClient";
import { useState } from "react";
import Logo from "../components/Logo";
import ButtonBlue from "../components/ButtonBlue";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!termsAccepted) {
      setErrorMessage("You must agree to the terms and service.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const authResponse = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          cardnumber: cardNumber,
        },
      },
    });

    if (authResponse.error) {
      console.error("Sign-up error", authResponse.error.message);
      setErrorMessage(authResponse.error.message);
      return;
    }

    if (authResponse.data.user) {
      console.log("User registration successful", authResponse.data.user);
      setSuccessMessage(
        "Sign-up successful. Please check your email to confirm your account."
      );

      setTimeout(() => navigate("/login"), 2000);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="flex justify-center items-center bg-gray-100">
        <form
          onSubmit={handleSignUp}
          className="w-full max-w-sm bg-white p-8 rounded-lg">
          <Logo />
          <h2 className="text-3xl font-semibold text-center mb-2 text-tBase">
            Create an account
          </h2>
          <p className="text-center mb-4 mt-2 font-normal text-sm text-tBase p-2">
            Sign up for Finco to effortlessly track your income and expenses,
            and take control of your financial future.
          </p>
          <div className="mb-2">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-6 py-4 border border-border rounded-full text-tBase"
              placeholder="Email"
            />
          </div>
          <div className="mb-2">
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
          <div className="mb-2">
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-6 py-4 border border-border rounded-full text-tBase"
              placeholder="Confirm Password"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="firstname"
              value={cardNumber}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full px-6 py-4 border border-border rounded-full text-tBase"
              placeholder="First Name"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="lastname"
              value={cardNumber}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full px-6 py-4 border border-border rounded-full text-tBase"
              placeholder="Last Name"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              id="cardnumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
              className="w-full px-6 py-4 border border-border rounded-full text-tBase"
              placeholder="Card Number"
            />
          </div>
          <div className="mb-10">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mr-2  "
            />
            <label htmlFor="terms" className="text-xs text-tBase ">
              Agree to our <b>Terms and Service</b>
              {/* <a href="/terms" className="text-small text-blue-500 underline"> */}
              {/* Terms and Service */}
              {/* </a> */}
            </label>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-500 text-sm mb-4">{successMessage}</p>
          )}
          <div className="w-full mb-2">
            <ButtonBlue text="Sign Up" />
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
              Already have an account?
            </p>

            <p
              className="text-sky-600 text-center text-small cursor-pointer"
              onClick={handleLogin}>
              Login
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
