import { MdExpandMore } from "react-icons/md";
import { useUserContext } from "../context/UserContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface TotalWalletFieldProps {
  onToggle: () => void;
}

const TotalWalletField: React.FC<TotalWalletFieldProps> = ({ onToggle }) => {
  const userContext = useUserContext();
  const account = userContext.account;
  const currentDate: string = new Date().toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const updatedBalance = account?.amount;
    setBalance(updatedBalance ?? 0);
  }, [account]);

  if (balance === null) {
    return null;
  }

  const formattedText = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
  }).format(Number(balance));

  if (balance === null) {
    return null;
  }

  return (
    <section
      className={`w-full max-w-lg ${
        balance >= 0 ? "bg-custom-gradient" : "bg-another-gradient"
      } text-white rounded-lg shadow-md py-4 px-10 relative`}>
      <div className="absolute top-4 right-3 text-sm text-gray-700">
        {currentDate}
      </div>
      <div>
        {!account && balance === 0 ? (
          <Link to="/addaccount">
            <div className="flex mt-6 cursor:pointer">
              <button className="bg-slate-200 text-tBase text-small rounded-full shadow-lg px-12 py-4 w-full mb-6">
                Add Account
              </button>
            </div>
            <button className="bg-slate-200 text-tBase text-small font-semibold shadow-lg px-12 py-4 w-full mb-6 flex justify-between items-center">
              To see data add an account
            </button>
          </Link>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4 px-1">
              <div className="flex flex-col">
                <p className="text-2xl mt-4 font-semibold mb-2 text-gray-900">
                  Balance
                </p>
                <div className="flex items-center">
                  <p className="text-xl font-semibold mb-1 text-white">
                    {formattedText}
                  </p>
                </div>
              </div>
            </div>
            <div
              onClick={onToggle}
              className="flex items-center cursor-pointer absolute bottom-1 right-2">
              <MdExpandMore className="text-xl mr-1" />
              <span>Details</span>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TotalWalletField;
