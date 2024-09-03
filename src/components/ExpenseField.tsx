import ButtonExpense from "./ButtonExpense";

const ExpenseField = () => {
  return (
    <section>
      <div className="flex items-center bg-gray rounded-full px-4 py-4  gap-6">
        <ButtonExpense />
        <div className="flex flex-col px-2">
          <p className=" font-normal">Income</p>
          <p className=" font-semibold">+ € 4,302</p>
          {/* TODO: Zahlenfeld Dynamisch machen */}
        </div>
      </div>
    </section>
  );
};

export default ExpenseField;
