import React, { useEffect, useState } from "react";
// import supabaseClient from "../lib/supabaseClient";

interface CreditCardProps {
  profileId: string;
}

const CreditCard: React.FC<CreditCardProps> = ({ profileId }) => {
  const [cardNumber, setCardNumber] = useState<string | null>("1234");
  const [cardHolderName, setCardHolderName] = useState<string | null>(
    "John Doe"
  );

  // useEffect(() => {
  //   const fetchProfileData = async () => {
  //     const { data, error } = await supabaseClient
  //       .from("profiles")
  //       .select("card_number, first_name, last_name")
  //       .eq("id", profileId)
  //       .single();

  //     if (error) {
  //       console.error("Error fetching profile data:", error);
  //     } else {
  //       setCardNumber(
  //         data?.card_number ? data.card_number.toString().slice(-4) : null
  //       );

  //       setCardHolderName(`${data?.first_name} ${data?.last_name}`);
  //     }
  //   };

  //   fetchProfileData();
  // }, [profileId]);

  return (
    <div className="w-80 h-48 rounded-2xl shadow-xl bg-gradient-to-r from-purple-500 to-blue-500 p-4 flex flex-col justify-between text-white">
      <header className="flex justify-between items-center text-sm font-Urbanist">
        <img src="public/mastercard.svg" alt="Card Icon" className="w-8 h-8" />
        <span className="bg-yellow-400 w-5 h-5 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </span>
      </header>

      <p className="font-Urbanist text-sm ml-2">
        {cardHolderName ? cardHolderName : "Loading..."}
      </p>

      <p className="font-Urbanist text-sm ml-2">
        {cardNumber ? `**** ${cardNumber}` : "**** ****"}
      </p>

      <div className="flex justify-between items-center">
        <img src="public/Group.svg" alt="Card Icon" className="w-8 h-6" />
        <span className="text-xs">09/25</span>
      </div>
    </div>
  );
};

export default CreditCard;
