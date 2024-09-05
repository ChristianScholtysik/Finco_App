import { useContext, useState } from "react";
import { ProfileContext } from "../context/ProfileContext";

const CreditCard = () => {
  const profile = useContext(ProfileContext);

  return (
    <div className="w-81 h-48 rounded-2xl shadow-xl bg-gradient-to-r from-purple-500 to-blue-500 p-4 flex flex-col justify-between text-white">
      <header className="flex justify-between items-center text-sm font-Urbanist">
        <img src="public/mastercard.svg" alt="Card Icon" className="w-8 h-8" />
        <span className="bg-yellow-400 w-5 h-5 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </span>
      </header>
      <div className="flex">
        <p className="font-Urbanist text-sm ml-2 ">
          {profile?.profile?.first_name}
        </p>
        <p className="font-Urbanist text-sm ml-2 ">
          {profile?.profile?.last_name}
        </p>
      </div>
      <p className="font-Urbanist text-sm ml-2">
        **** **** **** {profile?.profile?.card_number.toString().slice(-4)}
      </p>

      <div className="flex justify-between items-center">
        <img src="public/Group.svg" alt="Card Icon" className="w-8 h-6" />
        <span className="text-xs">09/25</span>
      </div>
    </div>
  );
};

export default CreditCard;
