import { FaEuroSign } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";

interface TotalWalletFieldProps {
  onToggle: () => void;
}

const TotalWalletField: React.FC<TotalWalletFieldProps> = ({ onToggle }) => {
  return (
    <section className="w-full max-w-lg bg-custom-gradient text-white rounded-lg shadow-md py-4 px-10 relative">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-lg font-semibold mb-2 text-gray-900">Balance</p>
          <div className="flex items-center">
            <div className="bg-white p-1 rounded-full flex justify-center items-center w-11 h-11">
              <FaEuroSign className="text-green-500 text-2xl" />
            </div>
            <p className="text-xl font-semibold ml-4 mb-1 text-white">
              2000.00
            </p>
          </div>
        </div>
      </div>

      <div
        onClick={onToggle}
        className="flex items-center cursor-pointer absolute bottom-1 right-2"
      >
        <MdExpandMore className="text-xl mr-1" />
        <span>Details</span>
      </div>
    </section>
  );
};

export default TotalWalletField;
