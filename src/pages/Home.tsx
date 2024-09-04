import { useEffect } from "react";
import Navbar from "../components/Navbar";
import supabaseClient from "../lib/supabaseClient";
import { useUserContext } from "../context/UserContext";
import { useProfileData } from "../context/ProfileContext";
import CreditCard from "../components/CreditCard";
import ExpenseFieldXL from "../components/ExpenseFieldXL";
import IncomeFieldXL from "../components/IncomeFieldXL";

const Home = () => {
  const { profile, setProfile } = useProfileData();

  const userContext = useUserContext();
  const user = userContext?.user;

  if (!user) {
    return null;
  }

  useEffect(() => {
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
    <div className="flex items-center justify-center">
      <section className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-Urbanist text-sm">Welcome back</h2>
            <p className="font-Urbanist text-lg">
              {profile.first_name} {profile.last_name}
            </p>
          </div>

          <img
            className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
            alt="Profile"
          />
        </div>

        <CreditCard />
        <p className="font-Urbanist text-lg mb-6 mt-7">Total wallet</p>
        <div className="flex gap-5 mb-10">
          <IncomeFieldXL />
          <ExpenseFieldXL />
        </div>
      </section>
      <Navbar />
    </div>
  );
};

export default Home;
