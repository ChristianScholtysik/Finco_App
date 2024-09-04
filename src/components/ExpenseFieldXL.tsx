import ButtonExpense from "./ButtonExpense";

const ExpenseFieldXL = () => {
  return (
    <section>
      <div className="flex flex-col items-center bg-gray rounded-lg py-9 px-8 gap-4">
        <ButtonExpense />

        <div className="flex flex-col items-center">
          <p className="text-base font-light mb-2">Expense</p>
          <p className="text-lg font-semibold">- € 2,302</p>
        </div>
      </div>
    </section>
  );
};

export default ExpenseFieldXL;
