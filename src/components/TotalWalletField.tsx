import { FaEuroSign } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";

interface TotalWalletFieldProps {
  onToggle: () => void;
}
const balance = -2000;
// TODO:balance dynamisch machen
const TotalWalletField: React.FC<TotalWalletFieldProps> = ({ onToggle }) => {
  return (
    <section
      className={`w-full max-w-lg ${
        balance >= 0 ? "bg-custom-gradient " : "bg-another-gradient"
      } text-white rounded-lg shadow-md py-4 px-10 relative`}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-lg font-semibold mb-2 text-gray-900">Balance</p>
          <div className="flex items-center">
            <div className="bg-white p-1 rounded-full flex justify-center items-center w-11 h-11">
              <FaEuroSign
                className={`text-2xl ${
                  balance >= 0 ? "text-green-500" : "text-red-500"
                }`}
              />
            </div>
            <p className="text-xl font-semibold ml-4 mb-1 text-white">
              {balance.toFixed(2)}
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
