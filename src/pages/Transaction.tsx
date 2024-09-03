import { IoFastFoodSharp } from "react-icons/io5";

import ExpenseField from "../components/ExpenseField";
import IncomeField from "../components/IncomeField";

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
import Logo from "../components/Logo";

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
    <div className="flex items-center justify-center h-screen">
      <section className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm h-screen">
        <div
          className="flex justify-between items-center mb-10 w-full
        ">
          <Logo />
          <img
            className="inline-block h-10 w-10 rounded-full ring-2 ring-white "
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
            alt=""></img>
        </div>
        <div className="flex justify-between items-center gap-16 mb-8 w-full max-w-sm">
          <h1 className="font-bold text-2xl">All Transactions</h1>
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
