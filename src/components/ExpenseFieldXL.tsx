import ButtonExpense from "./ButtonExpense";

interface ExpenseFieldXLProps {
  text: string;
}

const ExpenseFieldXL: React.FC<ExpenseFieldXLProps> = ({ text }) => {
  const formattedText = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
  }).format(Number(text));
  return (
    <section className="flex-grow w-full">
      <div className="flex flex-col items-center bg-gray rounded-lg py-5 px-7 gap-4">
        <ButtonExpense />
        <div className="flex flex-col items-center">
          <p className="text-base text-tBase font-light mb-2">Expense</p>
          <p className="text-base text-tBase font-semibold">-{formattedText}</p>
        </div>
      </div>
    </section>
  );
};

export default ExpenseFieldXL;
