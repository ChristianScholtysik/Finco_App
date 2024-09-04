import ButtonIncome from "./ButtonIncome";

interface IncomeFieldProps {
  text: string;
}

const IncomeField: React.FC<IncomeFieldProps> = ({ text }) => {
  return (
    <section>
      <div className="flex items-center bg-gray rounded-full py-2 px-4 gap-2">
        <ButtonIncome />
        <div className="flex flex-col justify-end">
          <p className=" text-small">Income</p>

          <p className="text-xs font-semibold"> +{text}</p>
        </div>
      </div>
    </section>
  );
};

export default IncomeField;
