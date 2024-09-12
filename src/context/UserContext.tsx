import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import supabaseClient from "../lib/supabaseClient";
import { IAccount, IProfile } from "../types/supabase-types.own";

interface IUserContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  account: IAccount | null;
  setAccount: React.Dispatch<React.SetStateAction<IAccount | null>>;
  profile: IProfile | null;
  setProfile: React.Dispatch<React.SetStateAction<IProfile | null>>;
  loading: boolean;
}

const UserContext = createContext<IUserContext | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [account, setAccount] = useState<IAccount | null>(null);
  const [profile, setProfile] = useState<IProfile | null>(null);

  useEffect(() => {
    const fetchSessionAndProfile = async () => {
      setLoading(true);

      const { data: sessionData, error: sessionError } =
        await supabaseClient.auth.getSession();

      if (sessionError || !sessionData?.session) {
        setLoading(false);
        console.error("Error fetching session:", sessionError?.message);
        return;
      }

      const user = sessionData.session.user;
      setUser(user);

      //* Profile
      const { data: profileData, error: profileError } = await supabaseClient
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError || !profileData) {
        console.error("Error fetching profile:", profileError?.message);
        setLoading(false);
        return;
      }

      setProfile(profileData);
      //* account
      const { data: accountData, error: accountError } = await supabaseClient
        .from("account")
        .select("*")
        .eq("profile_id", profileData.id)
        .single();

      if (accountError || !accountData) {
        console.error("Error fetching account:", accountError?.message);
        setLoading(false);
        return;
      }

      setAccount(accountData);
      setLoading(false);
    };

    fetchSessionAndProfile();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        profile,
        account,
        setAccount,
        setUser,
        setProfile,
        loading,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
