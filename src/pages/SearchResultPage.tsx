import { useState } from "react";
import supabaseClient from "../lib/supabaseClient";
import Navbar from "../components/Navbar";
import { Transactions } from "../types/supabase-types.own";
import Logo from "../components/Logo";

const SearchResultPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Transactions[]>([]);
  const fetchSearchResults = async (term: string) => {
    if (!term) {
      setSearchResults([]);
      return;
    }

    const { data, error } = await supabaseClient
      .from("transactions")
      .select("*")
      .ilike("name", `${term}%`);

    if (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    } else {
      setSearchResults(data);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    fetchSearchResults(term);
  };

  return (
    <div className="flex items-center justify-center">
      <section className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <div className="flex justify-between items-center mb-10 w-full">
          <Logo />
        </div>
        <div className="mb-5">
          <input
            type="text"
            placeholder="Search Transactions..."
            className="w-full p-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
        </div>

        <div>
          {searchResults.length > 0 ? (
            searchResults.map((transaction) => (
              <div
                className="flex justify-between gap-4 items-center mb-4 border-b pb-2"
                key={transaction.id}>
                <div>
                  <div className="font-semibold text-tBase">
                    {transaction.name}
                  </div>
                  <div className="text-small text-tBase">
                    {new Date(
                      transaction.transaction_date
                    ).toLocaleDateString()}
                  </div>
                </div>
                <div className="font-bold">
                  {transaction.income_expenses === "expense" ? "-" : "+"}
                  {Math.abs(transaction.amount).toFixed(2)} €
                </div>
              </div>
            ))
          ) : (
            <p>No transactions found.</p>
          )}
        </div>
      </section>
      <Navbar />
    </div>
  );
};

export default SearchResultPage;
