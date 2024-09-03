import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import supabaseClient from "../lib/supabaseClient";
import { useUserContext } from "../context/UserContext";
import { useProfileData } from "../context/ProfileContext";
import CreditCard from "../components/CreditCard";

const Home = () => {
  // const [cardNumber, setCardNumber] = useState<string | null>("");

  // const [cardHolderName, setCardHolderName] = useState<string | null>("");

  const { profile, setProfile } = useProfileData();

  const userContext = useUserContext();
  const user = userContext?.user;

  if (!user) {
    return;
  }

  useEffect(() => {
    const fetchProfileData = async () => {
      const profileResponse = await supabaseClient
        .from("profiles")
        .select("card_number, first_name, last_name")
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
    fetchProfileData();
  }, [user, setProfile]);

  if (!user) {
    return;
    <p>loading</p>;
  }

  return (
    <>
      <p>Card Number: {profile?.card_number}</p>
      <p>
        Card Holder: {profile?.first_name}
        {profile?.last_name}
      </p>
      <CreditCard />
      <Navbar />
    </>
  );
};

export default Home;
