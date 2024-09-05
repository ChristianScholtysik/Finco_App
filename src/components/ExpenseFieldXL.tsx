import ButtonExpense from "./ButtonExpense";

interface ExpenseFieldXLProps {
  text: string;
}

const ExpenseFieldXL: React.FC<ExpenseFieldXLProps> = ({ text }) => {
  return (
    <section className="flex-grow w-full">
      <div className="flex flex-col items-center bg-gray rounded-lg py-5 px-7 gap-4">
        <ButtonExpense />
        <div className="flex flex-col items-center">
          <p className="text-base text-tBase font-light mb-2">Expense</p>
          <p className="text-lg text-tBase font-semibold">-{text}</p>
        </div>
      </div>
    </section>
  );
};

export default ExpenseFieldXL;
