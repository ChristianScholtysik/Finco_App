import ButtonExpense from "../components/ButtonExpense";
import ExpenseField from "../components/ExpenseField";
import IncomeField from "../components/IncomeField";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";
import SearchIcon from "../components/SearchIcon";

const Transaction = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <section className="flex flex-col items-center h-screen ">
        <div className="flex justify-start w-full max-w-sm">
          <Logo />
        </div>
        <div className="flex justify-between items-center gap-16 mb-8 w-full max-w-sm">
          <h1 className="font-bold text-lg">All Transactions</h1>
          <SearchIcon />
        </div>
        <div className="flex w-full gap-4">
          {" "}
          <IncomeField /> <ExpenseField />
        </div>
      </section>
      <Navbar />
    </div>
  );
};

export default Transaction;
