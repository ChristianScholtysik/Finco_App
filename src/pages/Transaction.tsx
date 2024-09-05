// import ExpenseField from "../components/ExpenseField";
// import IncomeField from "../components/IncomeField";
// import Navbar from "../components/Navbar";
// import SearchIcon from "../components/SearchIcon";
// import categoryIcons from "../assets/categoryIcons";
// import Logo from "../components/Logo";
// import { Transactions } from "../types/supabase-types.own";
// import { useEffect, useState } from "react";
// import supabaseClient from "../lib/supabaseClient";
// import { useUserContext } from "../context/UserContext";
// import { useTransactionContext } from "../context/TotalIncomeContext";

// // import { DateRange } from "react-date-range";
// // import "react-date-range/dist/styles.css";
// // import "react-date-range/dist/theme/default.css";

// const Transaction = () => {
//   const userContext = useUserContext();



//   const [transactions, setTransactions] = useState<Transactions[]>([]);
//   const [groupedTransactions, setGroupedTransactions] = useState<{
//     [date: string]: Transactions[];
//   }>({});


//   const [income, setIncome] = useState<Transactions[]>([]);
//   const [expenses, setExpenses] = useState<Transactions[]>([]);

//   // const [selectionRange, setSelectionRange] = useState({
//   //   startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
//   //   endDate: new Date(),
//   //   key: "selection",
//   // });

//   // const [openCalendar, setOpenCalendar] = useState(false);

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
//       const grouped = transactions.reduce(
//         (acc, transaction) => {
//           const date = new Date(
//             transaction.transaction_date
//           ).toLocaleDateString("en-CA");

//           if (!acc[date]) {
//             acc[date] = [];
//           }
//           acc[date].push(transaction);
//           return acc;
//         },
//         {} as { [date: string]: Transactions[] }
//       );

//       const sortedGrouped = Object.keys(grouped)
//         .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
//         .reduce(
//           (acc, date) => {
//             acc[date] = grouped[date];
//             return acc;
//           },
//           {} as { [date: string]: Transactions[] }
//         );

//       setGroupedTransactions(sortedGrouped);
//     }
//   }, [transactions]);

//   console.log(transactions);
//   console.log(groupedTransactions);

//   useEffect(() => {
//     const fetchIncomeTransactions = async () => {
//       const { data, error } = await supabaseClient
//         .from("transactions")
//         .select("*")
//         .eq("income_expenses", "income");

//       if (error) {
//         console.error(error);
//         setIncome([]);
//       } else {
//         setIncome(data);
//       }
//     };

//     fetchIncomeTransactions();
//   }, []);

//   const totalIncome = transactions.reduce((sum, transaction) => {
//     return sum + (transaction.amount || 0);
//   }, 0);



//   useEffect(() => {
//     const fetchExpenseTransactions = async () => {
//       const { data, error } = await supabaseClient
//         .from("transactions")
//         .select("*")
//         .eq("income_expenses", "expense");

//       if (error) {
//         console.error(error);
//         setExpenses([]);
//       } else {
//         setExpenses(data);
//       }
//     };

//     fetchExpenseTransactions();
//   }, []);

//   const totalExpenses = expenses.reduce((total, expense) => {
//     return total + expense.amount;
//   }, 0);

//   console.log("Income", income);
//   console.log("Expenses:", expenses);

//   return (
//     <div className="flex items-center justify-center">
//       <section className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
//         <div className="flex justify-between items-center mb-10 w-full">
//           <Logo />
//           {userContext?.profile?.avatar_url ? (
//             <img
//               alt="User Avatar"
//               src={userContext.profile.avatar_url}
//               className="inline-block h-14 w-14 rounded-full ring-2 ring-white cursor-pointer object-cover object-center"
//             />
//           ) : (
//             <div className="inline-block h-14 w-14 rounded-full bg-gray-300 flex items-center justify-center">
//               No image
//             </div>
//           )}
//         </div>
//         <div className="flex justify-between items-center gap-16 mb-8 w-full max-w-sm">
//           <h1 className="font-bold text-2xl">All Transactions</h1>
//           <SearchIcon />
//         </div>
//         <div className="flex w-full gap-4 mb-10">
//           <IncomeField text={totalIncome.toFixed(2)} />{" "}
//           <ExpenseField text={totalExpenses.toFixed(2)} />
//         </div>
// {/* 
//         <div className="relative text-center">
//             <button
//               onClick={() => setOpenCalendar(!openCalendar)}
//               className="px-4 py-2 border border-gray-300 text-xs rounded-lg shadow-sm mb-4 bg-gray-200 text-inactive"
//             >
//               {selectionRange.startDate.toDateString()} -{" "}
//               {selectionRange.endDate.toDateString()}
//             </button>

//             {openCalendar && (
//               <div className="absolute z-10 mt-2">
//                 <DateRange
//                   ranges={[selectionRange]}
//                   onChange={(item: any) => setSelectionRange(item.selection)}
//                   minDate={new Date(1900, 0, 1)}
//                   maxDate={today}
//                   showDateDisplay={false}
//                   rangeColors={["#298bff"]}
//                 />
//               </div> 
//             )}
//           </div>*/}


//         {Object.keys(groupedTransactions).map((date) => (
//           <div key={date}>
//             <p className="text-small text-tBase">
//               {new Date(date).toLocaleDateString("en-US", { weekday: "long" })}
//             </p>
//             <h2 className="font-semibold text-lg mb-4">
//               {new Date(date).toLocaleDateString()}
//             </h2>
//             <section className="mb-8">
//               {groupedTransactions[date].map((transaction) => (
//                 <div
//                   className="flex justify-between gap-4 items-center mb-4 "
//                   key={transaction.id}>
//                   <div className="text-lg rounded-full p-2 bg-gray w-12 h-12 flex items-center justify-center">
//                     {categoryIcons[transaction.category] || "🛒"}
//                   </div>
//                   <div>
//                     <div className="font-semibold text-tBase w-40 text-base">
//                       {/* {transaction.category} */}
//                       {transaction.name}
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
import categoryIcons from "../assets/categoryIcons";
import Logo from "../components/Logo";
import { Transactions } from "../types/supabase-types.own";
import { useEffect, useState } from "react";
import supabaseClient from "../lib/supabaseClient";
import { useUserContext } from "../context/UserContext";
import { useTransactionContext } from "../context/TotalIncomeContext";

// import { DateRange } from "react-date-range";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";

const Transaction = () => {
  const userContext = useUserContext();

  const incomeExpenses=useTransactionContext() 


  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [groupedTransactions, setGroupedTransactions] = useState<{
    [date: string]: Transactions[];
  }>({});


  const [income, setIncome] = useState<Transactions[]>([]);
  const [expenses, setExpenses] = useState<Transactions[]>([]);


  // const [selectionRange, setSelectionRange] = useState({
  //   startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  //   endDate: new Date(),
  //   key: "selection",
  // });

  // const [openCalendar, setOpenCalendar] = useState(false);

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
      const grouped = transactions.reduce(
        (acc, transaction) => {
          const date = new Date(
            transaction.transaction_date
          ).toLocaleDateString("en-CA");

          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(transaction);
          return acc;
        },
        {} as { [date: string]: Transactions[] }
      );

      const sortedGrouped = Object.keys(grouped)
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
        .reduce(
          (acc, date) => {
            acc[date] = grouped[date];
            return acc;
          },
          {} as { [date: string]: Transactions[] }
        );

      setGroupedTransactions(sortedGrouped);
    }
  }, [transactions]);

  console.log(transactions);
  console.log(groupedTransactions);

  useEffect(() => {
    const fetchIncomeTransactions = async () => {
      const { data, error } = await supabaseClient
        .from("transactions")
        .select("*")
        .eq("income_expenses", "income");

      if (error) {
        console.error(error);
        setIncome([]);
      } else {
        setIncome(data);
      }
    };

    fetchIncomeTransactions();
  }, []);

  // const totalIncome = transactions.reduce((sum, transaction) => {
  //   return sum + (transaction.amount || 0);
  // }, 0);

  useEffect(() => {
    const fetchExpenseTransactions = async () => {
      const { data, error } = await supabaseClient
        .from("transactions")
        .select("*")
        .eq("income_expenses", "expense");

      if (error) {
        console.error(error);
        setExpenses([]);
      } else {
        setExpenses(data);
      }
    };

    fetchExpenseTransactions();
  }, []);

  // const totalExpenses = expenses.reduce((total, expense) => {
  //   return total + expense.amount;
  // }, 0);

  console.log("Income", income);
  console.log("Expenses:", expenses);

  const incomeFieldText = incomeExpenses.totalIncome?.toFixed(2) ?? "0.00";

  const expenseFieldText = incomeExpenses.totalExpenses?.toFixed(2) ?? "0.00";

  console.log(incomeFieldText);

  return (
    <div className="flex items-center justify-center">
      <section className="bg-white p-6 rounded-lg  w-full max-w-sm">
        <div className="flex justify-between items-center mb-10 w-full">
          <Logo />
          {userContext?.profile?.avatar_url ? (
            <img
              alt="User Avatar"
              src={userContext.profile.avatar_url}
              className="inline-block h-14 w-14 rounded-full cursor-pointer object-cover object-center"
            />
          ) : (
            <div className="inline-block h-14 w-14 rounded-full bg-gray-300 flex items-center justify-center">
              No image
            </div>
          )}
        </div>
        <div className="flex justify-between items-center gap-16 mb-8 w-full max-w-sm">
          <h1 className="font-bold text-2xl">All Transactions</h1>
          <SearchIcon />
        </div>
        <div className="flex w-full gap-4 mb-10">
          <IncomeField text={incomeFieldText} />
          <ExpenseField text={expenseFieldText} />
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
                  className="flex justify-between gap-4 items-center mb-4 "
                  key={transaction.id}>
                  <div className="text-lg rounded-full p-2 bg-gray w-12 h-12 flex items-center justify-center">
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
