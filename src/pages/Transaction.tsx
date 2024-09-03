// import ExpenseField from "../components/ExpenseField";
// import IncomeField from "../components/IncomeField";
// import Navbar from "../components/Navbar";
// import SearchIcon from "../components/SearchIcon";

// import Logo from "../components/Logo";
// import { Transactions } from "../types/supabase-types.own";
// import { useEffect, useState } from "react";
// import supabaseClient from "../lib/supabaseClient";

// const Transaction = () => {
//   const categoryIcons = {
//     "Food & Drink": "🍕",
//     Salary: "💵",
//     Insurance: "🧯",
//     "Clothing & Accessories": "👚",
//     "Entertainment & Leisure": "🎮",
//     "Travel & Vacation": "🏖️",
//     "Utilities (Electricity, Water, Gas)": "🪫",
//     "Rent/Mortgage": "🏠",
//     "Healthcare & Medical Expenses": "⛑️",
//     "Dining Out & Takeaway": "🥂",
//     Other: "💰",
//   };

//   const [transactions, setTransactions] = useState<Transactions[]>([]);
//   const [groupedTransactions, setGroupedTransactions] = useState<{
//     [date: string]: Transactions[];
//   }>({});

//   useEffect(() => {
//     const fetchAllTransactions = async () => {
//       const { data, error } = await supabaseClient
//         .from("transactions")
//         .select("*");
//       if (error) {
//         console.error(error);
//         setTransactions([]);
//       } else {
//         setTransactions(data);
//       }
//     };

//     fetchAllTransactions();
//   }, []);

//   useEffect(() => {
//     if (transactions.length > 0) {
//       const grouped = transactions.reduce((acc, transaction) => {
//         const date = new Date(
//           transaction.transaction_date
//         ).toLocaleDateString();
//         if (!acc[date]) {
//           acc[date] = [];
//         }
//         acc[date].push(transaction);
//         return acc;
//       }, {} as { [date: string]: Transactions[] });

//       const sortedGrouped = Object.keys(grouped)
//         .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
//         .reduce((acc, date) => {
//           acc[date] = grouped[date];
//           return acc;
//         }, {} as { [date: string]: Transactions[] });

//       setGroupedTransactions(sortedGrouped);
//     }
//   }, [transactions]);
//   console.log(transactions);
//   console.log(groupedTransactions);

//   return (
//     <div className="flex items-center justify-center">
//       <section className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
//         <div className="flex justify-between items-center mb-10 w-full">
//           <Logo />
//           <img
//             className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
//             src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
//             alt=""
//           />
//         </div>
//         <div className="flex justify-between items-center gap-16 mb-8 w-full max-w-sm">
//           <h1 className="font-bold text-2xl">All Transactions</h1>
//           <SearchIcon />
//         </div>
//         <div className="flex w-full gap-4 mb-10">
//           <IncomeField /> <ExpenseField />
//         </div>

//         {Object.keys(groupedTransactions).map((date) => (
//           <div key={date}>
//             <p className="text-small text-tBase">
//               {new Date(date).toLocaleDateString("en-US", { weekday: "long" })}
//             </p>
//             <h2 className="font-semibold text-lg mb-4">{date}</h2>
//             <section className="mb-8">
//               {groupedTransactions[date].map((transaction) => (
//                 <div
//                   className="flex justify-between gap-4 items-center mb-4"
//                   key={transaction.id}>
//                   <div className="rounded-full p-3 bg-gray">
//                     {categoryIcons[transaction.category] || "🛒"}
//                   </div>
//                   <div>
//                     <div className="font-semibold text-tBase w-40 text-base">
//                       {transaction.category}
//                     </div>
//                     <div className="text-small text-tBase">
//                       {new Date(
//                         transaction.transaction_date
//                       ).toLocaleDateString()}
//                     </div>
//                   </div>
//                   <div
//                     className={`flex justify-end w-full max-w-sm font-bold ${
//                       transaction.income_expenses === "income"
//                         ? "text-income"
//                         : "text-expenses"
//                     }`}>
//                     {transaction.income_expenses === "expense" &&
//                     transaction.amount > 0
//                       ? "-"
//                       : ""}
//                     {Math.abs(transaction.amount).toFixed(2)} €
//                   </div>
//                 </div>
//               ))}
//             </section>
//           </div>
//         ))}
//       </section>
//       <Navbar />
//     </div>
//   );
// };

// export default Transaction;

import ExpenseField from "../components/ExpenseField";
import IncomeField from "../components/IncomeField";
import Navbar from "../components/Navbar";
import SearchIcon from "../components/SearchIcon";

import Logo from "../components/Logo";
import { Transactions } from "../types/supabase-types.own";
import { useEffect, useState } from "react";
import supabaseClient from "../lib/supabaseClient";

const Transaction = () => {
  const categoryIcons = {
    "Food & Drink": "🍕",
    Salary: "💵",
    Insurance: "🧯",
    "Clothing & Accessories": "👚",
    "Entertainment & Leisure": "🎮",
    "Travel & Vacation": "🏖️",
    "Utilities (Electricity, Water, Gas)": "🪫",
    "Rent/Mortgage": "🏠",
    "Healthcare & Medical Expenses": "⛑️",
    "Dining Out & Takeaway": "🥂",
    Other: "💰",
  };

  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [groupedTransactions, setGroupedTransactions] = useState<{
    [date: string]: Transactions[];
  }>({});

  useEffect(() => {
    const fetchAllTransactions = async () => {
      const { data, error } = await supabaseClient
        .from("transactions")
        .select("*");
      if (error) {
        console.error(error);
        setTransactions([]);
      } else {
        setTransactions(data);
      }
    };

    fetchAllTransactions();
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      const grouped = transactions.reduce((acc, transaction) => {
        const date = new Date(transaction.transaction_date).toLocaleDateString(
          "en-CA"
        );

        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(transaction);
        return acc;
      }, {} as { [date: string]: Transactions[] });

      const sortedGrouped = Object.keys(grouped)
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
        .reduce((acc, date) => {
          acc[date] = grouped[date];
          return acc;
        }, {} as { [date: string]: Transactions[] });

      setGroupedTransactions(sortedGrouped);
    }
  }, [transactions]);

  console.log(transactions);
  console.log(groupedTransactions);

  return (
    <div className="flex items-center justify-center">
      <section className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <div className="flex justify-between items-center mb-10 w-full">
          <Logo />
          <img
            className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
            alt=""
          />
        </div>
        <div className="flex justify-between items-center gap-16 mb-8 w-full max-w-sm">
          <h1 className="font-bold text-2xl">All Transactions</h1>
          <SearchIcon />
        </div>
        <div className="flex w-full gap-4 mb-10">
          <IncomeField /> <ExpenseField />
        </div>

        {Object.keys(groupedTransactions).map((date) => (
          <div key={date}>
            <p className="text-small text-tBase">
              {new Date(date).toLocaleDateString("en-US", { weekday: "long" })}
            </p>
            <h2 className="font-semibold text-lg mb-4">
              {new Date(date).toLocaleDateString()}
            </h2>
            <section className="mb-8">
              {groupedTransactions[date].map((transaction) => (
                <div
                  className="flex justify-between gap-4 items-center mb-4"
                  key={transaction.id}>
                  <div className="rounded-full p-3 bg-gray">
                    {categoryIcons[transaction.category] || "🛒"}
                  </div>
                  <div>
                    <div className="font-semibold text-tBase w-40 text-base">
                      {/* {transaction.category} */}
                      {transaction.name}
                    </div>
                    <div className="text-small text-tBase">
                      {new Date(
                        transaction.transaction_date
                      ).toLocaleDateString()}
                    </div>
                  </div>
                  <div
                    className={`flex justify-end w-full max-w-sm font-bold ${
                      transaction.income_expenses === "income"
                        ? "text-income"
                        : "text-expenses"
                    }`}>
                    {transaction.income_expenses === "expense" &&
                    transaction.amount > 0
                      ? "-"
                      : ""}
                    {Math.abs(transaction.amount).toFixed(2)} €
                  </div>
                </div>
              ))}
            </section>
          </div>
        ))}
      </section>
      <Navbar />
    </div>
  );
};

export default Transaction;
