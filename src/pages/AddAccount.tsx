import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import supabaseClient from "../lib/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import ButtonBlue from "../components/ButtonBlue";
import Logo from "../components/Logo";

const AddAccount = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [amount, setAmount] = useState<string | null>(null);
  const userContext = useUserContext();
  const profileId = userContext.profile?.id;

  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (amount === null || amount.trim() === "") {
      setErrorMessage("Amount is required.");
      return;
    }

    const amountAsNumber = Number(amount);

    const accountResponse = await supabaseClient.from("account").insert([
      {
        profile_id: profileId,
        amount: amountAsNumber,
      },
    ]);

    if (accountResponse.error) {
      console.error(
        "Error inserting into profiles",
        accountResponse.error.message
      );
      setErrorMessage(
        "There was an issue setting up your account. Please try again."
      );
      return;
    }

    setSuccessMessage("adding Account successful.");
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <section>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <form
          onSubmit={handleAddAccount}
          className="w-full max-w-sm bg-white p-8 rounded-lg">
          {/* <Logo /> */}
          <div className="mb-6 mt-6">
            <Link to="/">
              <button
                // onClick={() => navigate(-1)}
                className="text-black hover:text-gray font-medium">
                &larr;
              </button>
            </Link>
          </div>
          <h2 className="text-3xl font-semibold text-center mb-4 text-income ">
            Add Account
          </h2>
          <p className="text-center mb-12 mt-4 font-normal text-sm text-tBase p-2">
            Create your account to start managing your finances today.
          </p>
          <div className="mb-4">
            <input
              type="text"
              id="amount"
              value={amount ?? ""}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full px-6 py-4 border border-border rounded-full text-tBase"
              placeholder="Amount"
            />
          </div>
          <div className="w-full mb-6">
            <ButtonBlue text="Add account" />
          </div>
          {errorMessage && (
            <p className="text-red-600 text-sm text-center font-sm mb-10">
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
              Don’t have any account? Contact your bank
            </p>
            {/* <p
              className="text-sky-600 text-center text-small cursor-pointer"
              onClick={handleAddAccount}>
              Sign up
            </p> */}
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddAccount;
