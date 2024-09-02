import ButtonBlue from "../components/ButtonBlue";
import Logo from "../components/Logo";
import SearchIcon from "../components/SearchIcon";

const Transaction = () => {
  return (
    <>
      <section className="flex flex-col mx-w-sm items-center min-h-screen font-Urbanist ">
        <div className="flex justify-start">
          <Logo />
        </div>
        <div className="flex justify-between items-center gap-16">
          <h1 className="font-bold text-lg">All Transactions</h1>
          <SearchIcon />
        </div>
      </section>
    </>
  );
};

export default Transaction;
