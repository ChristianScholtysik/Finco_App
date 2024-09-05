import ButtonIncome from "./ButtonIncome";

const IncomeFieldXL = () => {
  return (
    <section>
      <div className="flex flex-col items-center bg-custom-gradient rounded-lg ml-5 py-5 px-5 gap-4">
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
