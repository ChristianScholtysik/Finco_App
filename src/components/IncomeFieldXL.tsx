import ButtonIncome from "./ButtonIncome";

const IncomeFieldXL = () => {
  return (
    <section className="flex-grow w-full">
      <div className="flex flex-col items-center bg-income-gradient rounded-lg py-5 px-7 gap-4">
        <ButtonIncome />
        <div className="flex flex-col items-center">
          <p className="text-base text-white font-light mb-2">Income</p>
          <p className="text-lg text-white font-semibold">+ € 4,302</p>
        </div>
      </div>
    </section>
  );
};

export default IncomeFieldXL;
