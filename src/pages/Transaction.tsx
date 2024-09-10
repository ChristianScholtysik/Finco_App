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
import { Link } from "react-router-dom";

const Transaction = () => {
  const userContext = useUserContext();
  const accountId = userContext?.account?.id || "";
  const incomeExpenses = useTransactionContext();
  console.log(incomeExpenses);

  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [groupedTransactions, setGroupedTransactions] = useState<{
    [date: string]: Transactions[];
  }>({});

  const [income, setIncome] = useState<Transactions[]>([]);

  const [expenses, setExpenses] = useState<Transactions[]>([]);

  useEffect(() => {
    const fetchAllTransactions = async () => {
      const { data, error } = await supabaseClient
        .from("transactions")
        .select("*")
        .eq("account_id", accountId);

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

  useEffect(() => {
    const fetchIncomeTransactions = async () => {
      const { data, error } = await supabaseClient
        .from("transactions")
        .select("*")
        .eq("account_id", accountId)
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
        .eq("income_expenses", "expense")
        .eq("account_id", accountId);

      if (error) {
        console.error(error);
        setExpenses([]);
      } else {
        setExpenses(data);
      }
    };

    fetchExpenseTransactions();
  }, []);

  console.log("Income", income);
  console.log("Expenses:", expenses);
  console.log(incomeExpenses.totalIncome);
  console.log(incomeExpenses.totalExpenses);

  const incomeFieldText = incomeExpenses.totalIncome?.toFixed(2) ?? "0.00";

  const expenseFieldText = incomeExpenses.totalExpenses?.toFixed(2) ?? "0.00";

  const formattedIncomeFieldText = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
  }).format(Number(incomeFieldText));

  const formattedExpenseFieldText = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
  }).format(Number(expenseFieldText));

  return (
    <div className="flex items-center justify-center">
      <section className="bg-white p-6 rounded-lg  w-full max-w-sm">
        <div className="flex justify-between items-center mb-10 w-full">
          <Logo />
          {userContext?.profile?.avatar_url ? (
            <Link to="profile">
              <img
                alt="User Avatar"
                src={userContext.profile.avatar_url}
                className="inline-block h-14 w-14 rounded-full cursor-pointer object-cover object-center"
              />
            </Link>
          ) : (
            <Link to="profile">
              <div className=" h-14 w-14 rounded-full bg-stone-300 flex items-center text-xs text-center text-tBase">
                Add image
              </div>
            </Link>
          )}
        </div>
        <div className="flex justify-between items-center gap-16 mb-8 w-full max-w-sm">
          <h1 className="font-bold text-2xl">All Transactions</h1>
          <Link to="/search-result">
            <SearchIcon />
          </Link>
        </div>
        <div className="flex w-full gap-4 mb-10">
          <IncomeField text={formattedIncomeFieldText} />
          <ExpenseField text={formattedExpenseFieldText} />
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
                  <div className="text-lg rounded-full px-4 bg-gray w-12 h-12 flex items-center justify-center">
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
                      ? "- "
                      : ""}
                    {new Intl.NumberFormat("en-GB", {
                      style: "currency",
                      currency: "EUR",
                    }).format(Number(transaction.amount))}
                    {/* {Math.abs(transaction.amount).toFixed(2)} € */}
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
