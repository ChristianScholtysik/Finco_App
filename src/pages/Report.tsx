import { useEffect, useState } from "react";
import { Chart as ChartJS, Title, Tooltip, ArcElement } from "chart.js";
import { Chart } from "react-chartjs-2";
import supabaseClient from "../lib/supabaseClient";


import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Navbar from "../components/Navbar";
import Logo from "../components/Logo";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useUserContext } from "../context/UserContext";





ChartJS.register(Title, Tooltip, ArcElement, ChartDataLabels);

const Report: React.FC = () => {
  const userContext = useUserContext();

  const [data, setData] = useState<{ labels: string[]; values: number[] }>({
    labels: [],
    values: [],
  });
  const [loading, setLoading] = useState(true);



  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(),
    key: "selection",
  });

  const [openCalendar, setOpenCalendar] = useState(false);
  const today = new Date();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonth = monthNames[today.getMonth()];

  if (!userContext?.profile) {
    console.log("No profile found.");
    return null;
  }

  useEffect(() => {
    const fetchMonthlyExpensesByCategory = async () => {
      console.log("Fetching data...");

      if (!userContext.profile) {
        console.log("No profile found, aborting...");
        setLoading(false);
        return;
      }

      console.log("Profile found:", userContext.profile);

      const accountResponse = await supabaseClient
        .from("account")
        .select("id")
        .eq("profile_id", userContext.profile.id)
        .single();

      if (accountResponse.error || !accountResponse.data) {
        console.log("Error or no account found.");
        setLoading(false);
        return;
      }

      const accountId = accountResponse.data.id;

      const { data: transactions, error } = await supabaseClient
        .from("transactions")

        .select("category, amount")
        .eq("account_id", accountId)
        .gte("transaction_date", selectionRange.startDate.toISOString())
        .lte("transaction_date", selectionRange.endDate.toISOString());


      if (error) {
        console.log("Error fetching transactions:", error);
        setLoading(false);
        return;
      }

      const categoryTotals: Record<string, number> = {};
      transactions.forEach((transaction) => {
        if (!categoryTotals[transaction.category]) {
          categoryTotals[transaction.category] = 0;
        }
        categoryTotals[transaction.category] += transaction.amount;
      });

      const positiveCategoryTotals = Object.fromEntries(
        Object.entries(categoryTotals).filter(([_, amount]) => amount > 0)
      );

      setData({
        labels: Object.keys(positiveCategoryTotals),
        values: Object.values(positiveCategoryTotals),
      });

      setLoading(false);
    };

    fetchMonthlyExpensesByCategory();
  }, [userContext.profile, selectionRange]);

  if (loading) {
    console.log("Loading...");
    return <>Loading...</>;
  }

  const categoryIcons: Record<string, string> = {
    "Food & Drink": "🍕",
    Salary: "💵",
    Insurance: "🧯",
    "Clothing & Accessories": "👚",
    "Entertainment & Leisure": "🎮",
    "Travel & Vacation": "🏖️",
    "Utilities (Electricity, Water, Gas)": "🪫",
    "Rent/Mortgage": "🏠",
    "Healthcare & Medical Expenses": "⛑️",
    "Dining Out & Takeaway": "🥂",
    Other: "💰",
  };

  const labelsWithEmojis = data.labels.map(
    (label) => `${categoryIcons[label] || "📊"} ${label}`
  );

  const chartData = {
    labels: labelsWithEmojis,
    datasets: [
      {
        data: data.values,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#E0E0E0",
          "#FF5733",
          "#C70039",
          "#900C3F",
          "#581845",
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
        display: true,
        formatter: (value: number, context: any) => {
          const total = context.chart?.data.datasets[0].data.reduce(
            (a: number, b: number) => a + b,
            0
          );
          const percentage = total ? ((value / total) * 100).toFixed(2) : "0";
          return `${percentage}%`;
        },
        anchor: "end",
        align: "center",
        offset: 10,
        font: { size: 14, weight: "bold" },
      },
    },
  };

  return (
    <section className="flex items-center justify-center flex-col">
      <div className="bg-white max-w-sm w-full shadow-md">
        <div className="p-6">
          <Logo />
          <h2 className="text-2xl font-bold mb-4">
            Your Expenses in {currentMonth}
          </h2>
          <div className="relative text-center">
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
                  onChange={(item: any) => setSelectionRange(item.selection)}
                  minDate={new Date(1900, 0, 1)}
                  maxDate={today}
                  showDateDisplay={false}
                  rangeColors={["#298bff"]}
                />
              </div>
            )}
          </div>

          {/* Chart */}
          <div className="flex items-center justify-center px-8">
            <Chart type="doughnut" data={chartData} options={chartOptions} />
          </div>

          <div className="mt-6">
            <h2 className="text-md font-semibold mb-4">Main Categories</h2>
            {data.labels.map((category, index) => (
              <div
                key={category}
                className="mb-4 p-4 border-md border rounded-md"
              >
                <h4 className="text-md font-medium text-gray-800">
                  {categoryIcons[category]} {category}
                </h4>
                <p>Amount: {data.values[index].toFixed(2)} €</p>
                <p className="text-gray-600">
                  Percentage:{" "}
                  {(
                    (data.values[index] /
                      data.values.reduce((a, b) => a + b, 0)) *
                    100
                  ).toFixed(2)}
                  %
                </p>
                <a
                  href={`/category/${category}`}
                  className="text-blue-500 text-sm hover:underline"
                >
                  View Details
                </a>
              </div>
            ))}
          </div>
        </div>
        <Navbar />
      </div>
    </section>
  );
};

export default Report;
