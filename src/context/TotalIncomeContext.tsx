// import { createContext, useContext, useEffect, useState } from "react";
// import supabaseClient from "../lib/supabaseClient";
// import { Transactions } from "../types/supabase-types.own";
// import { useUserContext } from "./UserContext";

// interface ITransactionContext {
//   totalIncome: number | null;
//   setTotalIncome: React.Dispatch<React.SetStateAction<number | null>>;
//   totalExpenses: number | null;
//   setTotalExpenses: React.Dispatch<React.SetStateAction<number | null>>;
//   transactions: Transactions[];
//   setTransactions: React.Dispatch<React.SetStateAction<Transactions[]>>;
// }

// const IncomeExpensesContext = createContext<ITransactionContext | null>(null);

// export const TransactionProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [totalIncome, setTotalIncome] = useState<number | null>(null);
//   const [transactions, setTransactions] = useState<Transactions[]>([]);
//   const [totalExpenses, setTotalExpenses] = useState<number | null>(null);
//   const userContext = useUserContext();
//   const accountId = userContext?.account?.id || "";
//   console.log("Account Id im Context", accountId);

//   useEffect(() => {
//     const fetchIncomeTransactions = async () => {
//       console.log("Account ID:", accountId);

//       const { data, error } = await supabaseClient
//         .from("transactions")
//         .select("*")
//         .eq("income_expenses", "income")
//         .eq("account_id", accountId);

//       if (error) {
//         console.error("Error fetching income transactions:", error);
//         setTotalIncome(0);
//       } else if (data) {
//         setTransactions(data);

//         const total = data.reduce(
//           (sum, transaction) => sum + (transaction.amount || 0),
//           0
//         );
//         setTotalIncome(total);
//         console.log("TotalIncome", total);
//       }
//     };

//     fetchIncomeTransactions();
//   }, [accountId]);

//   useEffect(() => {
//     const fetchExpensesTransactions = async () => {
//       const { data, error } = await supabaseClient
//         .from("transactions")
//         .select("*")
//         .eq("income_expenses", "expense")
//         .eq("account_id", accountId);

//       if (error) {
//         console.error("Error fetching expenses transactions:", error);
//         setTotalExpenses(0);
//       } else if (data) {
//         setTransactions(data);

//         const total = data.reduce(
//           (sum, transaction) => sum + (transaction.amount || 0),
//           0
//         );
//         setTotalExpenses(total);
//       }
//     };

//     fetchExpensesTransactions();
//   }, [accountId]);

//   return (
//     <IncomeExpensesContext.Provider
//       value={{
//         totalIncome,
//         setTotalIncome,
//         transactions,
//         setTransactions,
//         totalExpenses,
//         setTotalExpenses,
//       }}>
//       {children}
//     </IncomeExpensesContext.Provider>
//   );
// };

// export const useTransactionContext = () => {
//   const context = useContext(IncomeExpensesContext);
//   if (!context) {
//     throw new Error(
//       "useTransactionContext must be used within a TransactionProvider"
//     );
//   }
//   return context;
// };
