import React, { useState } from "react";
import Navbar from "../components/Navbar";
import supabaseClient from "../lib/supabaseClient";
import { useUserContext } from "../context/UserContext";
import { useProfileData } from "../context/ProfileContext";
import CreditCard from "../components/CreditCard";
import ExpenseFieldXL from "../components/ExpenseFieldXL";
import IncomeFieldXL from "../components/IncomeFieldXL";
import TotalWalletField from "../components/TotalWalletField";

const Home: React.FC = () => {
  const { profile, setProfile } = useProfileData();
  const userContext = useUserContext();
  const user = userContext?.user;

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  if (!user) {
    return null;
  }

  React.useEffect(() => {
    const fetchProfileData = async () => {
      const profileResponse = await supabaseClient
        .from("profiles")
        .select(
          "id, card_number, first_name, last_name, avatar_url, created_at"
        )
        .eq("id", user?.id)
        .single();

      if (profileResponse.error) {
        console.error("Error fetching profile data:", profileResponse.error);
      } else {
        setProfile(profileResponse.data);
      }
    };

    if (user) {
      fetchProfileData();
    }
  }, [user, setProfile]);

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <section className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-Urbanist text-sm">Welcome back</h2>
            <p className="font-Urbanist text-lg">
              {profile.first_name} {profile.last_name}
            </p>
          </div>

          {profile?.avatar_url ? (
            <img
              alt="User Avatar"
              src={profile.avatar_url}
              className="inline-block h-14 w-14 rounded-full ring-2 ring-white cursor-pointer object-cover object-center"
            />
          ) : (
            <div className="inline-block h-14 w-14 rounded-full bg-gray-300 flex items-center justify-center">
              No image
            </div>
          )}
        </div>

        <CreditCard />
        <p className="font-Urbanist text-lg mb-3 mt-7">Total wallet</p>

        <TotalWalletField onToggle={toggleDetails} />

        <div
          className={`transition-transform duration-200 ease-out transform ${
            showDetails
              ? "translate-y-0 opacity-100"
              : "-translate-y-10 opacity-0"
          } flex gap-5 mt-6`}
        >
          <IncomeFieldXL />
          <ExpenseFieldXL />
        </div>
      </section>

      <Navbar />
    </div>
  );
};

export default Home;
