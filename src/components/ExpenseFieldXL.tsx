import ButtonExpense from "./ButtonExpense";

const ExpenseFieldXL = () => {
  return (
    <section>
      <div className="flex flex-col items-center bg-another-gradient rounded-lg ml-2 py-5 px-5 gap-4">
        <ButtonExpense />

        <div className="flex flex-col items-center">
          <p className="text-base text-white font-light mb-2">Expense</p>
          <p className="text-lg text-white font-semibold">- € 2,302</p>
        </div>
      </div>
    </section>
  );
};

export default ExpenseFieldXL;
