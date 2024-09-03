import { useState } from "react";
import ButtonBlue from "../components/ButtonBlue";
import supabaseClient from "../lib/supabaseClient";
import { TablesInsert } from "../types/supabase-types-gen";

const Expenses = () => {
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const addExpense = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !categoryFilter || !date) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    try {
      const formattedAmount = parseFloat(amount.toFixed(2)) * -1; // Betrag als negativ formatieren

      // Objekt kreieren
      const expenseData: TablesInsert<"transactions"> = {
        name: "Expense",
        amount: formattedAmount,
        category: categoryFilter as TablesInsert<"transactions">["category"],
        transaction_date: date,
        income_expenses: "expense",
      };

      // Insert Befehl an Supabase
      const { data, error } = await supabaseClient
        .from("transactions")
        .insert([expenseData]);

      if (error) {
        console.error("Error inserting data:", error);
        setErrorMessage("Failed to add expense. Please try again.");
        return;
      }

      // Danach wieder alles leeren
      setSuccessMessage("Expense added successfully!");
      setErrorMessage("");
      setAmount(undefined);
      setCategoryFilter("");
      setDate("");
    } catch (error: any) {
      console.error("Unexpected error:", error);
      setErrorMessage("Failed to add expense. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <div className="mb-6">
          <button
            onClick={() => window.history.back()}
            className="text-black hover:text-gray font-medium"
          >
            &larr;
          </button>
        </div>
        <h1 className="text-2xl text-orange-600 font-bold mb-6">Add Expense</h1>

        <form onSubmit={addExpense}>
          {/* Amount */}
          <p className="mb-2 font-normal text-sm text-tBase">Amount</p>
          <div className="mb-4">
            <input
              type="number"
              step="0.01"
              min="0"
              value={amount !== undefined ? amount.toString() : ""}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              required
              className="w-full px-6 py-4 border-0 rounded-full text-tBase bg-gray"
              placeholder="Amount"
            />
          </div>

          {/* Category */}
          <p className="mb-2 font-normal text-sm text-tBase">Category</p>
          <div className="mb-4 custom-select">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              required
              className="w-full px-6 py-4 border-0 rounded-full text-tBase bg-gray"
            >
              <option value="">Categories</option>
              <option value="Food & Drink">Food & Drink</option>
              <option value="Salary">Salary</option>
              <option value="Insurance">Insurance</option>
              <option value="Clothing & Accessories">
                Clothing & Accessories
              </option>
              <option value="Entertainment & Leisure">
                Entertainment & Leisure
              </option>
              <option value="Travel & Vacation">Travel & Vacation</option>
              <option value="Utilities (Electricity, Water, Gas)">
                Utilities (Electricity, Water, Gas)
              </option>
              <option value="Rent/Mortgage">Rent/Mortgage</option>
              <option value="Healthcare & Medical Expenses">
                Healthcare & Medical Expenses
              </option>
              <option value="Dining Out & Takeaway">
                Dining Out & Takeaway
              </option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Date */}
          <p className="mb-2 font-normal text-sm text-tBase">Date</p>
          <div className="mb-4">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-6 py-4 border-0 rounded-full text-tBase bg-gray"
              placeholder="Date"
            />
          </div>

          <div className="w-full mt-10 mb-6">
            <ButtonBlue text="Add Expense" />
          </div>

          {/* Error Messages */}
          <div>
            {errorMessage && (
              <p className="text-red-600 text-sm text-center font-sm">
                {errorMessage}
              </p>
            )}
            {successMessage && (
              <p className="text-green-600 text-sm text-center font-sm">
                {successMessage}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Expenses;
