// import { createContext, useContext, useEffect, useState } from "react";
// import supabaseClient from "../lib/supabaseClient";
// import { IncomeExpenses, Transactions } from "../types/supabase-types.own";

// interface ITransaction {
//   totalIncome: number | null;
//   setTotalIncome: React.Dispatch<React.SetStateAction<number | null>>;
//   //   totalExpenses: Transactions | null;
//   //   setTotalExpenses: React.Dispatch<React.SetStateAction<Transactions | null>>;
// }

// const IncomeExpensesContext = createContext<ITransaction | null>(null);

// export const TransactionProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [totalIncome, setTotalIncome] = useState<Transactions | null>(null);
//   //   const [totalExpenses, setTotalExpenses] = useState<Transactions>(null);

//   const [transactions, setTransactions] = useState<Transactions[]>([]);

//   //   useEffect(() => {
//   //     const fetchAllTransactions = async () => {
//   //       const { data, error } = await supabaseClient
//   //         .from("transactions")
//   //         .select("*");
//   //       if (error) {
//   //         console.error(error);
//   //         setTransactions([]);
//   //       } else {
//   //         setTransactions(data);
//   //       }
//   //     };

//   //     fetchAllTransactions();
//   //   }, []);

//   useEffect(() => {
//     const fetchIncomeTransactions = async () => {
//       const { data, error } = await supabaseClient
//         .from("transactions")
//         .select("*")
//         .eq("income_expenses", "income");

//       if (error) {
//         console.error(error);
//         setTotalIncome([]);
//       } else {
//         setTotalIncome(data);
//       }
//     };

//     fetchIncomeTransactions();
//   }, []);

//   const totalIncomeResult = transactions.reduce((sum, transaction) => {
//     return sum + (transaction.amount || 0);
//   }, 0);

//   setTotalIncome(totalIncomeResult);

//   return (
//     <IncomeExpensesContext.Provider value={{ totalIncome, setTotalIncome }}>
//       {children}
//     </IncomeExpensesContext.Provider>
//   );
// };

// export const useUserContext = () => {
//   const context = useContext(IncomeExpensesContext);
//   if (!context) {
//     throw new Error("useUserContext must be used within a UserProvider");
//   }
//   return context;
// };

import { createContext, useContext, useEffect, useState } from "react";
import supabaseClient from "../lib/supabaseClient";
import { Transactions } from "../types/supabase-types.own";
import { useUserContext } from "./UserContext";

interface ITransactionContext {
  totalIncome: number | null;
  setTotalIncome: React.Dispatch<React.SetStateAction<number | null>>;
  totalExpenses: number | null;
  setTotalExpenses: React.Dispatch<React.SetStateAction<number | null>>;
  transactions: Transactions[];
  setTransactions: React.Dispatch<React.SetStateAction<Transactions[]>>;
}

const IncomeExpensesContext = createContext<ITransactionContext | null>(null);

export const TransactionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [totalIncome, setTotalIncome] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [totalExpenses, setTotalExpenses] = useState<number | null>(null);
  const userContext = useUserContext();
  const accountId = userContext?.account?.id || "";

  useEffect(() => {
    const fetchIncomeTransactions = async () => {
      const { data, error } = await supabaseClient
        .from("transactions")
        .select("*")
        .eq("income_expenses", "income")
        .eq("account_id", accountId);

      if (error) {
        console.error("Error fetching income transactions:", error);
        setTotalIncome(0);
      } else if (data) {
        setTransactions(data);

        const total = data.reduce(
          (sum, transaction) => sum + (transaction.amount || 0),
          0
        );
        setTotalIncome(total);
      }
    };

    fetchIncomeTransactions();
  }, []);

  useEffect(() => {
    const fetchExpensesTransactions = async () => {
      const { data, error } = await supabaseClient
        .from("transactions")
        .select("*")
        .eq("income_expenses", "expense")
        .eq("account_id", accountId);

      if (error) {
        console.error("Error fetching expenses transactions:", error);
        setTotalExpenses(0);
      } else if (data) {
        setTransactions(data);

        const total = data.reduce(
          (sum, transaction) => sum + (transaction.amount || 0),
          0
        );
        setTotalExpenses(total);
      }
    };

    fetchExpensesTransactions();
  }, []);

  return (
    <IncomeExpensesContext.Provider
      value={{
        totalIncome,
        setTotalIncome,
        transactions,
        setTransactions,
        totalExpenses,
        setTotalExpenses,
      }}>
      {children}
    </IncomeExpensesContext.Provider>
  );
};

export const useTransactionContext = () => {
  const context = useContext(IncomeExpensesContext);
  if (!context) {
    throw new Error(
      "useTransactionContext must be used within a TransactionProvider"
    );
  }
  return context;
};
