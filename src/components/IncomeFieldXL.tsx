import ButtonIncome from "./ButtonIncome";

interface IncomeFieldXLProps {
  text: string;
}

const IncomeFieldXL: React.FC<IncomeFieldXLProps> = ({ text }) => {
  return (
    <section className="flex-grow w-full">
      <div className="flex flex-col items-center bg-gray rounded-lg py-5 px-7 gap-4">
        <ButtonIncome />
        <div className="flex flex-col items-center">
          <p className="text-base text-tBase font-light mb-2">Income</p>
          <p className="text-lg text-tBase font-semibold">+{text}</p>
        </div>
      </div>
    </section>
  );
};

export default IncomeFieldXL;
