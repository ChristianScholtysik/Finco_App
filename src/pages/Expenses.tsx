import { useState, useEffect } from "react";
import ButtonBlue from "../components/ButtonBlue";
import supabaseClient from "../lib/supabaseClient";
import { TablesInsert } from "../types/supabase-types-gen";
import { useUserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const Expenses = () => {
  const userContext = useUserContext();
  const user = userContext?.user;

  if (!userContext) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [accountId, setAccountId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccountID = async () => {
      if (user) {
        const { data, error } = await supabaseClient
          .from("account")
          .select("id")
          .eq("profile_id", user.id)
          .single();

        if (error) {
          console.log("Error fetching account ID:", error);
          setErrorMessage("Failed to fetch account Id.");
          return;
        }

        if (data) {
          setAccountId(data.id);
        }
      }
    };
    fetchAccountID();
  }, [user]);

  useEffect(() => {
    // Set the initial date to today's date
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  const addExpense = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!accountId) {
      setErrorMessage("Account ID is not set. Please wait and try again.");
      return;
    }

    if (!amount || !categoryFilter || !date) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    try {
      const formattedAmount = parseFloat(amount.toFixed(2)) * 1;

      const expenseData: TablesInsert<"transactions"> = {
        name: name,
        amount: formattedAmount,
        category: categoryFilter as TablesInsert<"transactions">["category"],
        transaction_date: date,
        income_expenses: "expense",
        account_id: accountId,
      };

      const { error } = await supabaseClient
        .from("transactions")
        .insert([expenseData]);

      //* refetch transactions after new transaction was inserted to db
      userContext.fetchTransactions();

      if (error) {
        console.error("Error inserting data:", error);
        setErrorMessage("Failed to add expense. Please try again.");
        return;
      }

      const accountAmount = userContext.account?.amount ?? 0;
      const profileId = userContext.profile?.id;

      if (!profileId) {
        return;
      }

      const expenseToAmount: TablesInsert<"account"> = {
        amount: accountAmount - amount,
        profile_id: profileId,
      };

      const amountResponse = await supabaseClient
        .from("account")
        .update(expenseToAmount)
        .eq("profile_id", profileId);

      if (amountResponse.error) {
        console.error("Error inserting data:", error);
        setErrorMessage("Failed to update account. Please try again.");
        return;
      }

      userContext.setAccount({
        id: "",
        created_at: "",
        amount: expenseToAmount.amount,
        profile_id: userContext.profile?.id ?? "",
      });

      setSuccessMessage("Expense added successfully!");
      setErrorMessage("");
      setName("");
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
    <section className="flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-sm">
        <div className="mb-6">
          <Link to="/">
            <button className="text-black hover:text-gray font-medium">
              &larr;
            </button>
          </Link>
        </div>
        <h1 className="text-2xl text-expenses font-bold mb-6">Add Expense</h1>

        <form onSubmit={addExpense}>
          {/* Name */}
          <p className="mb-2 font-normal text-sm text-tBase">Name</p>
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-6 py-4 border-0 rounded-full text-tBase bg-gray"
              placeholder="Name"
            />
          </div>

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

          <div className="mb-4 custom-select relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              required
              className="w-full px-6 py-4 pr-10 border-0 rounded-full text-tBase bg-gray appearance-none">
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
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
              <IoIosArrowForward className="text-gray-400" />
            </div>
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
