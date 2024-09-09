import { MdExpandMore } from "react-icons/md";
import { useUserContext } from "../context/UserContext";
import { useEffect, useState } from "react";

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
  console.log(balance);

  const formattedText = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
  }).format(Number(balance));

  useEffect(() => {
    const updatedBalance = userContext.account?.amount;
    setBalance(updatedBalance ?? 0);
  }, [userContext.account]);

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
      {/* if(!account && balance === null){
        button-.....


}else{ */}
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
    </section>
  );
};

export default TotalWalletField;
