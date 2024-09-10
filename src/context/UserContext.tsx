// import { User } from "@supabase/supabase-js";
// import { createContext, useContext, useEffect, useState } from "react";
// import supabaseClient from "../lib/supabaseClient";
// import { IAccount, IProfile, Transactions } from "../types/supabase-types.own";

// interface IUserContext {
//   user: User | null;
//   setUser: React.Dispatch<React.SetStateAction<User | null>>;
//   account: IAccount | null;
//   setAccount: React.Dispatch<React.SetStateAction<IAccount | null>>;
//   profile: IProfile | null;
//   setProfile: React.Dispatch<React.SetStateAction<IProfile | null>>;
//   totalIncome: number | null;
//   setTotalIncome: React.Dispatch<React.SetStateAction<number | null>>;
//   totalExpenses: number | null;
//   setTotalExpenses: React.Dispatch<React.SetStateAction<number | null>>;
//   transactions: Transactions[];
//   setTransactions: React.Dispatch<React.SetStateAction<Transactions[]>>;
//   loading: boolean;
//   fetchTransactions: () => Promise<void>;
// }

// const UserContext = createContext<IUserContext | null>(null);

// export const UserProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [account, setAccount] = useState<IAccount | null>(null);
//   const [profile, setProfile] = useState<IProfile | null>(null);
//   const [totalIncome, setTotalIncome] = useState<number | null>(null);
//   const [totalExpenses, setTotalExpenses] = useState<number | null>(null);
//   const [transactions, setTransactions] = useState<Transactions[]>([]);

//   //* Fetch transactions for income and expenses
//   const fetchTransactions = async () => {
//     if (!account?.id) return;

//     console.log("Account ID", account.id);

//     //* Fetch income transactions
//     const { data: incomeData, error: incomeError } = await supabaseClient
//       .from("transactions")
//       .select("*")
//       .eq("income_expenses", "income")
//       .eq("account_id", account.id);

//     if (incomeError) {
//       console.error("Error fetching income transactions:", incomeError);
//       setTotalIncome(0);
//     } else if (incomeData) {
//       setTransactions((prev) => [...prev, ...incomeData]);

//       const incomeTotal = incomeData.reduce(
//         (sum, transaction) => sum + (transaction.amount || 0),
//         0
//       );
//       setTotalIncome(incomeTotal);
//     }

//     //* Fetch expense transactions
//     const { data: expenseData, error: expenseError } = await supabaseClient
//       .from("transactions")
//       .select("*")
//       .eq("income_expenses", "expense")
//       .eq("account_id", account.id);

//     if (expenseError) {
//       console.error("Error fetching expense transactions:", expenseError);
//       setTotalExpenses(0);
//     } else if (expenseData) {
//       setTransactions((prev) => [...prev, ...expenseData]);

//       const expenseTotal = expenseData.reduce(
//         (sum, transaction) => sum + (transaction.amount || 0),
//         0
//       );
//       setTotalExpenses(expenseTotal);
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     const fetchSessionAndProfile = async () => {
//       setLoading(true);

//       const { data: sessionData, error: sessionError } =
//         await supabaseClient.auth.getSession();

//       if (sessionError || !sessionData?.session) {
//         setLoading(false);
//         console.error("Error fetching session:", sessionError?.message);
//         return;
//       }

//       const user = sessionData.session.user;
//       setUser(user);

//       //* Profile
//       const { data: profileData, error: profileError } = await supabaseClient
//         .from("profiles")
//         .select("*")
//         .eq("id", user.id)
//         .single();

//       if (profileError || !profileData) {
//         console.error("Error fetching profile:", profileError?.message);
//         setLoading(false);
//         return;
//       }

//       setProfile(profileData);
//       //* account
//       const { data: accountData, error: accountError } = await supabaseClient
//         .from("account")
//         .select("*")
//         .eq("profile_id", profileData.id)
//         .single();

//       if (accountError || !accountData) {
//         console.error("Error fetching account:", accountError?.message);
//         setLoading(false);
//         return;
//       }

//       setAccount(accountData);
//     };

//     fetchSessionAndProfile();
//   }, []);

//   //*
//   useEffect(() => {
//     fetchTransactions();
//   }, [account]);

//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         profile,
//         account,
//         setAccount,
//         setUser,
//         setProfile,
//         totalIncome,
//         setTotalIncome,
//         totalExpenses,
//         setTotalExpenses,
//         transactions,
//         setTransactions,
//         loading,
//         fetchTransactions,
//       }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUserContext = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUserContext must be used within a UserProvider");
//   }
//   return context;
// };

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
