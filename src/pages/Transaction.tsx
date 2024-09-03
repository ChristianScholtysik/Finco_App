import { IoFastFoodSharp } from "react-icons/io5";
import ButtonExpense from "../components/ButtonExpense";
import ExpenseField from "../components/ExpenseField";
import IncomeField from "../components/IncomeField";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";
import SearchIcon from "../components/SearchIcon";
import { AiOutlineSafety } from "react-icons/ai";
import { FaCaravan, FaMoneyBill1Wave } from "react-icons/fa6";
import { GiClothes, GiConsoleController } from "react-icons/gi";
import { BsFillHouseHeartFill } from "react-icons/bs";
import {
  MdCarRental,
  MdHealthAndSafety,
  MdOutlineRamenDining,
} from "react-icons/md";
import { TbPigMoney } from "react-icons/tb";

const Transaction = () => {
  const categoryIcons = {
    "Food & Drink": <IoFastFoodSharp />,
    " Salary ": <FaMoneyBill1Wave />,
    " Insurance ": <AiOutlineSafety />,
    "Clothing & Accessories": <GiClothes />,
    " Entertainment & Leisure": <GiConsoleController />,
    "Travel & Vacation": <FaCaravan />,
    " Utilities (Electricity, Water, Gas)": <BsFillHouseHeartFill />,
    "Rent/Mortgage": <MdCarRental />,
    "Healthcare & Medical Expenses": <MdHealthAndSafety />,
    "Dining Out & Takeaway": <MdOutlineRamenDining />,
    " Other": <TbPigMoney />,
  };

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
        <div className="flex w-full gap-4 mb-6">
          {" "}
          <IncomeField /> <ExpenseField />
        </div>
        <h2 className="flex justify-start w-full max-w-sm font-semibold">
          Total Transactions
        </h2>
        <section>
          <div className="flex justify-between gap-4">
            <div>icon</div>
            <div>
              <div>categoryname</div> <div>datum</div>
            </div>
            <div className="flex justify-end w-full  max-w-sm ">amount</div>
          </div>
        </section>
      </section>
      <Navbar />
    </div>
  );
};

export default Transaction;
