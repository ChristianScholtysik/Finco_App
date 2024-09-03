import { useEffect } from "react";
import Navbar from "../components/Navbar";
import supabaseClient from "../lib/supabaseClient";
import { useUserContext } from "../context/UserContext";
import { useProfileData } from "../context/ProfileContext";
import CreditCard from "../components/CreditCard";

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
    <>
      <p>Card Number: {profile.card_number}</p>
      <p>
        Card Holder: {profile.first_name} {profile.last_name}
      </p>
      <CreditCard />
      <Navbar />
    </>
  );
};

export default Home;
