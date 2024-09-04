import ButtonIncome from "./ButtonIncome";

const IncomeFieldXL = () => {
  return (
    <section>
      <div className="flex flex-col items-center bg-gray rounded-lg py-4 px-4 gap-4">
        <ButtonIncome />

        <div className="flex flex-col items-center">
          <p className="text-base font-light mb-2">Income</p>

          <p className="text-lg font-semibold">+ € 4,302</p>
        </div>
      </div>
    </section>
  );
};

export default IncomeFieldXL;
