import { useState, useEffect } from "react";
import { Collapse } from "react-collapse";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import supabaseClient from "../lib/supabaseClient";
import categoryIcons from "../assets/categoryIcons";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Navbar from "../components/Navbar";
import Logo from "../components/Logo";
import { useUserContext } from "../context/UserContext";









ChartJS.register(
  Title,
  Tooltip,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ChartDataLabels
);

const Report: React.FC = () => {
  const userContext = useUserContext();

  const [data, setData] = useState<{
    labels: string[];
    values: number[];
    incomeExpenses: string[];
  }>({

    labels: [],
    values: [],
    incomeExpenses: [],
  });
  const [loading, setLoading] = useState(true);


  const [isWeeklyOpen, setIsWeeklyOpen] = useState(true);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(),
    key: "selection",
  });
  const [openCalendar, setOpenCalendar] = useState(false);
  const today = new Date();


  useEffect(() => {
    const fetchMonthlyExpensesByCategory = async () => {
      if (!userContext.profile) {

        setLoading(false);
        return;
      }

      const accountResponse = await supabaseClient
        .from("account")
        .select("id")
        .eq("profile_id", userContext.profile.id)
        .single();

      if (accountResponse.error || !accountResponse.data) {
        setLoading(false);
        return;
      }

      const accountId = accountResponse.data.id;
      const { data: transactions, error } = await supabaseClient
        .from("transactions")
        .select("category, amount, income_expenses")
        .eq("account_id", accountId)
        .gte("transaction_date", selectionRange.startDate.toISOString())
        .lte("transaction_date", selectionRange.endDate.toISOString());

      if (error) {
        setLoading(false);
        return;
      }

      const categoryTotals: Record<
        string,
        { amount: number; income_expenses: string }
      > = {};

      transactions.forEach((transaction) => {
        if (!categoryTotals[transaction.category]) {
          categoryTotals[transaction.category] = {
            amount: 0,
            income_expenses: transaction.income_expenses,
          };
        }
        categoryTotals[transaction.category].amount += transaction.amount;
      });

      const filteredCategoryData = Object.entries(categoryTotals)
        .filter(([_, data]) => data.amount !== 0) // Filter positive/negative amounts if needed
        .map(([category, data]) => ({
          category,
          amount: data.amount,
          income_expenses: data.income_expenses,
        }));

      setData({
        labels: filteredCategoryData.map((item) => item.category),
        values: filteredCategoryData.map((item) => item.amount),
        incomeExpenses: filteredCategoryData.map(
          (item) => item.income_expenses
        ),
      });

      setLoading(false);
    };

    fetchMonthlyExpensesByCategory();
  }, [userContext.profile, selectionRange]);

  if (loading) {
    return <>Loading...</>;
  }

  const labelsWithEmojis = data.labels.map(
    (label) => `${categoryIcons[label] || "📊"} ${label}`
  );

  const chartData = {
    labels: labelsWithEmojis,
    datasets: [
      {
        data: data.values,
        backgroundColor: [
          "#FF5733",
          "#C70039",
          "#900C3F",
          "#581845",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#F7786B",
          "#8E44AD",
          "#28B463",
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value.toFixed(2)} €`;
          },
        },
      },
      datalabels: {
        color: "#000",
        anchor: "center",
        align: "center",
        offset: 10,
        display: true,
        formatter: (value: number, context: any) => {
          const total = context.chart?.data.datasets[0].data.reduce(
            (a: number, b: number) => a + b,
            0
          );
          const percentage = total ? ((value / total) * 100).toFixed() : "0";
          return `${percentage}%`;
        },
        font: { size: 14 },
      },
    },
  };

  const lineChartData = {
    labels: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
    datasets: [
      {
        label: "Weekly Expenses",
        data: [18, 26, 14, 22, 12, 20, 12],
        fill: false,
        borderColor: "#FF5733",
        backgroundColor: "rgba(255, 87, 51, 0.2)",
        borderWidth: 2,
        pointBackgroundColor: "#FF5733",
        pointBorderColor: "#FFFFFF",
        pointBorderWidth: 3,
        pointHoverBackgroundColor: "#FF5733",
        pointHoverBorderColor: "rgba(255, 87, 51, 0.2)",
        pointHoverBorderWidth: 10,
        lineTension: 0.1,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    elements: {
      point: {
        radius: 6,
        hitRadius: 6,
        hoverRadius: 6,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (tooltipItems: any) => tooltipItems.yLabel + "€",
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: { display: false },
        ticks: { color: "#000" },
      },
      y: {
        display: true,
        grid: { color: "#e0e0e0" },
        ticks: {
          color: "#000",
          callback: (value: any) => value + "€",
        },
      },
    },
  };

  return (
    <section className="flex items-center justify-center flex-col h-100">
      <div className="h-100 bg-white p-6 rounded-lg w-full max-w-sm">
        <div className="flex justify-between items-center mb-10 w-full h-10">
          <Logo />
          {userContext.profile?.avatar_url ? (
            <img
              alt="User Avatar"
              src={userContext.profile.avatar_url}
              className="inline-block h-14 w-14 rounded-full cursor-pointer object-cover object-center"
            />
          ) : (
            <div className="inline-block h-full w-auto aspect-square rounded-full bg-gray-300 flex items-center justify-center">
              No image
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex justify-between items-center gap-16 mb-2 w-full max-w-sm">
          <h1 className="font-bold text-2xl mb-4">Expense Analysis</h1>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <button
            className={`h-10 text-center bg-gray px-4 py-2 rounded-lg transition-colors duration-300 w-full ${
              isWeeklyOpen ? "bg-gray" : "bg-gray-600 hover:bg-gray-600"
            }`}
            onClick={() => setIsWeeklyOpen(!isWeeklyOpen)}
          >
            {isWeeklyOpen ? "Hide" : "Show"} Weekly Spending Analysis
          </button>

          <Collapse isOpened={isWeeklyOpen}>
            <div className="my-6 flex justify-center align-center">
              <Chart
                type="line"
                data={lineChartData}
                options={lineChartOptions}
              />
            </div>
          </Collapse>

          <button
            className={`h-10 text-center bg-gray px-4 py-2 rounded-lg transition-colors duration-300 w-full ${
              isCategoryOpen ? "bg-gray" : "bg-gray-600 hover:bg-gray-600"
            }`}
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          >
            {isCategoryOpen ? "Hide" : "Show"} Category Spending Analysis
          </button>

          <Collapse isOpened={isCategoryOpen}>
            <div className="">
              <div className="flex flex-col items-center justify-center p-6 w-full">
                <Chart
                  type="doughnut"
                  data={chartData}
                  options={chartOptions}
                />
                <div className="relative text-center mt-6">
                  <button
                    onClick={() => setOpenCalendar(!openCalendar)}
                    className="px-4 py-2 border border-gray-300 text-xs rounded-lg shadow-sm mb-4 bg-gray-200 text-inactive"
                  >
                    {selectionRange.startDate.toDateString()} -{" "}
                    {selectionRange.endDate.toDateString()}
                  </button>
                  {openCalendar && (
                    <div className="absolute z-10 mt-2">
                      <DateRange
                        ranges={[selectionRange]}
                        onChange={(item: any) =>
                          setSelectionRange(item.selection)
                        }
                        minDate={new Date(1900, 0, 1)}
                        maxDate={today}
                        showDateDisplay={false}
                        rangeColors={["#298bff"]}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-16">
              <h2 className="text-lg font-semibold mb-4">Main Categories</h2>

              {data.labels.map((category, index) => (
                <div key={category}>
                  <a href={`/category/${category}`} className="cursor-pointer">
                    <div className="flex flex-col mb-8 w-full shadow-md px-2 py-4 rounded-lg">
                      <div className="flex justify-between w-full">
                        <div className="text-md rounded-full mr-4 p-2 bg-gray w-12 h-12 flex items-center justify-center">
                          {categoryIcons[category] || "🛒"}
                        </div>
                        <div>
                          <p className="font-semibold text-base w-44">
                            {category}
                          </p>
                        </div>
                        <div className="flex justify-end w-1/4 max-w-sm font-bold">
                          <div className="w-full">
                            <p
                              className={`text-small text-tBase ${
                                data.incomeExpenses[index] === "income"
                                  ? "text-income"
                                  : "text-expenses"
                              }`}
                            >
                              {new Intl.NumberFormat("en-GB", {
                                style: "currency",
                                currency: "EUR",
                              }).format(data.values[index])}
                            </p>
                            <p className="font-normal text-sm text-slate-500">
                              {(
                                (data.values[index] /
                                  data.values.reduce((a, b) => a + b, 0)) *
                                100
                              ).toFixed(0)}
                              %
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </Collapse>
        </div>
      </div>
      <Navbar />
    </section>
  );
};

export default Report;
