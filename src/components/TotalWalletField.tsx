import { MdExpandMore } from "react-icons/md";

interface TotalWalletFieldProps {
  onToggle: () => void;
}

const balance = -2000; // TODO: balance dynamisch machen

const TotalWalletField: React.FC<TotalWalletFieldProps> = ({ onToggle }) => {
  const currentDate: string = new Date().toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <section
      className={`w-full max-w-lg ${
        balance >= 0 ? "bg-custom-gradient" : "bg-another-gradient"
      } text-white rounded-lg shadow-md py-4 px-10 relative`}
    >
      <div className="absolute top-4 right-3 text-sm text-gray-700">
        {currentDate}
      </div>

      <div className="flex justify-between items-center mb-4 px-4">
        <div className="flex flex-col">
          <p className="text-2xl mt-4 font-semibold mb-2 text-gray-900">
            Balance
          </p>
          <div className="flex items-center">
            <p className="text-xl font-semibold mb-1 text-white">
              {balance.toFixed(2)} €
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
