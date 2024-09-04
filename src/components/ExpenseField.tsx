import ButtonExpense from "./ButtonExpense";

interface ExpenseFieldProps {
  text: string;
}

const ExpenseField: React.FC<ExpenseFieldProps> = ({ text }) => {
  return (
    <section>
      <div className="flex items-center bg-gray rounded-full py-2 px-4 gap-2">
        <ButtonExpense />
        <div className="flex flex-col justify-end">
          <p className=" text-small">Expenses</p>
          <p className=" text-xs font-semibold">-{text}</p>
        </div>
      </div>
    </section>
  );
};

export default ExpenseField;
