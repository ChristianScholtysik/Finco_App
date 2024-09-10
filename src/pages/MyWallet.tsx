import { useEffect, useState } from "react";
import CreditCard from "../components/CreditCard";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";

import { useUserContext } from "../context/UserContext";

import { BsCreditCard2Front } from "react-icons/bs";
import { RiBankLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const MyWallet = () => {
  const currentDate: string = new Date().toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const userContext = useUserContext();

  const [balance, setBalance] = useState<number | null>(null);

  const formattedText = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
  }).format(Number(balance));

  useEffect(() => {
    const updatedBalance = userContext.account?.amount;
    setBalance(updatedBalance ?? 0);
  }, [userContext.account]);

  if (balance === null) {
    return null;
  }

  return (
    <section>
      <div className="flex items-center justify-center">
        <section className="bg-white p-6 rounded-lg w-full max-w-sm">
          <div className="flex justify-between items-center mb-10 w-full">
            <Logo />
            {userContext?.profile?.avatar_url ? (
              <Link to="profile">
                <img
                  alt="User Avatar"
                  src={userContext.profile.avatar_url}
                  className="inline-block h-14 w-14 rounded-full cursor-pointer object-cover object-center"
                />
              </Link>
            ) : (
              <div className="inline-block h-14 w-14 rounded-full bg-gray-300 flex items-center justify-center">
                No image
              </div>
            )}
          </div>
          <div className="flex justify-between items-center gap-16 mb-8 w-full max-w-sm">
            <h1 className="font-bold text-2xl">My Wallet</h1>
          </div>

          <div
            className={`w-full max-w-lg mt-6 mb-6  ${
              balance >= 0 ? "bg-custom-gradient" : "bg-another-gradient"
            } text-white rounded-lg shadow-md py-4 px-10 relative`}>
            {/* <div className="absolute top-4 right-3 text-sm text-gray-700">
              {currentDate}
            </div> */}

            <div className="flex justify-center items-center mb-6 px-4">
              <div className="flex flex-col">
                <p className="text-normal mt-4 font-semibold mb-2 ">
                  There are currently
                </p>
                <div className="flex items-center flex-col">
                  <p className="text-xxl font-bold mb-1 text-white">
                    {formattedText}
                  </p>
                  <p className="text-normal mt-4 font-semibold mb-2 ">
                    in your wallet!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Link to="/addaccount">
            <button className="bg-slate-200 text-tBase font-Urbanist text-small rounded-full shadow-lg px-24 py-4 w-full flex justify-between items-center mb-6">
              Add Bank Account <RiBankLine />
            </button>
          </Link>
          <section className=" mb-4 mt-10">
            <CreditCard />
          </section>
          <button className="bg-slate-200 text-tBase font-Urbanist text-small rounded-full shadow-lg px-24 py-4 w-full flex justify-between items-center mb-6">
            Add Credit Card <BsCreditCard2Front />
          </button>

          <section className="flex gap-4 mb-10 mt-6"></section>
        </section>
      </div>
      <div className="flex justify-center">
        <Navbar />
      </div>
    </section>
  );
};

export default MyWallet;
