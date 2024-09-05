import { createContext, useContext, useEffect, useState } from "react";
import supabaseClient from "../lib/supabaseClient";

import { IProfile } from "../types/supabase-types.own";

interface IProfileContext {
  profile: IProfile | null;
  setProfile: React.Dispatch<React.SetStateAction<IProfile | null>>;
  loading: boolean;
}

export const ProfileContext = createContext<IProfileContext | null>(null);

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabaseClient
        .from("profiles")
        .select("*")
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
        return;
      }

      if (data) {
        const formattedProfile: IProfile = {
          ...data,
          created_at: new Date(data.created_at),
        };
        setProfile(formattedProfile);
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile, loading }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }

  return context;
};
