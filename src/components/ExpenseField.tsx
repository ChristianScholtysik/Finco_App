import ButtonExpense from "./ButtonExpense";

const ExpenseField = () => {
  return (
    <section>
      <div className="flex items-center bg-gray rounded-full py-2 px-4 gap-2">
        <ButtonExpense />
        <div className="flex flex-col justify-end">
          <p className=" text-small">Income</p>
          <p className=" text-small font-semibold">+ € 4,302</p>
          {/* TODO: Zahlenfeld Dynamisch machen */}
        </div>
      </div>
    </section>
  );
};

export default ExpenseField;
