import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import supabaseClient from "../lib/supabaseClient";

interface IUserContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
}
const UserContext = createContext<IUserContext | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionResponse = await supabaseClient.auth.getSession();
      if (sessionResponse.error) {
        return;
      }

      if (sessionResponse.data.session) {
        setUser(sessionResponse.data.session.user);
      }
      setLoading(false);
    };

    fetchSession();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
