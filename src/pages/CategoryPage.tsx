// src/pages/CategoryPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Logo from "../components/Logo";
import supabaseClient from "../lib/supabaseClient";
import { Transactions } from "../types/supabase-types.own";
import { useProfileData } from "../context/ProfileContext";
import categoryIcons from "../assets/categoryIcons";

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [groupedTransactions, setGroupedTransactions] = useState<{
    [date: string]: Transactions[];
  }>({});
  const { profile } = useProfileData();

  useEffect(() => {
    const fetchCategoryTransactions = async () => {
      const { data, error } = await supabaseClient
        .from("transactions")
        .select("*")
        .eq("category", category);

      if (error) {
        console.error(error);
        setTransactions([]);
      } else {
        setTransactions(data);
      }
    };

    fetchCategoryTransactions();
  }, [category]);

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

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex items-center justify-center">
        <section className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="flex justify-between items-center mb-10 w-full">
            <Logo />
            {profile?.avatar_url ? (
              <img
                alt="User Avatar"
                src={profile.avatar_url}
                className="inline-block h-14 w-14 rounded-full ring-2 ring-white cursor-pointer object-cover object-center"
              />
            ) : (
              <div className="inline-block h-14 w-14 rounded-full bg-gray-300 flex items-center justify-center">
                No image
              </div>
            )}
          </div>
          <button
            onClick={() => window.history.back()}
            className="text-black hover:text-gray font-medium"
          >
            &larr;
          </button>
          <h1 className="font-bold text-2xl mb-4">Category: {category}</h1>

          {Object.keys(groupedTransactions).map((date) => (
            <div key={date}>
              <p className="text-small text-tBase">
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </p>
              <h2 className="font-semibold text-lg mb-4">
                {new Date(date).toLocaleDateString()}
              </h2>
              <section className="mb-8">
                {groupedTransactions[date].map((transaction) => (
                  <div
                    className="flex justify-between gap-4 items-center mb-4"
                    key={transaction.id}
                  >
                    <div className="text-lg rounded-full p-2 bg-gray w-12 h-12 flex items-center justify-center">
                      {categoryIcons[transaction.category] || "🛒"}
                    </div>
                    <div>
                      <div className="font-semibold text-tBase w-40 text-base">
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
                      }`}
                    >
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
    </div>
  );
};

export default CategoryPage;