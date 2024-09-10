import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useUserContext } from "../context/UserContext";
import CreditCard from "../components/CreditCard";
import ExpenseFieldXL from "../components/ExpenseFieldXL";
import IncomeFieldXL from "../components/IncomeFieldXL";
import TotalWalletField from "../components/TotalWalletField";

const Home: React.FC = () => {
  const userContext = useUserContext();

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const totalIncome = userContext.totalIncome?.toFixed(2) ?? "0.00";

  console.log(totalIncome);
  const expenseFieldText = userContext.totalExpenses?.toFixed(2) ?? "0.00";

  return (
    <div className="flex items-center justify-center flex-col h-full">
      <section className="bg-white p-6 rounded-lg w-full max-w-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-Urbanist text-sm">Welcome back</h2>
            <p className="font-Urbanist text-lg">
              {userContext.profile?.first_name} {userContext.profile?.last_name}
            </p>
          </div>

          {userContext.profile?.avatar_url ? (
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

        <CreditCard />
        <p className="font-Urbanist text-lg mb-8 mt-7 text-tBase">
          Total wallet
        </p>

        <TotalWalletField onToggle={toggleDetails} />

        <div
          className={`transition-transform duration-200 ease-out transform ${
            showDetails
              ? "translate-y-0 opacity-100"
              : "-translate-y-10 opacity-0"
          } flex gap-2 mt-6 mb-12`}>
          <IncomeFieldXL text={totalIncome} />
          <ExpenseFieldXL text={expenseFieldText} />
        </div>
      </section>

      <Navbar />
    </div>
  );
};

export default Home;
