import { useState, useEffect } from "react";
import { Collapse } from "react-collapse";
import { Bar, Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Legend,
  ChartOptions,
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
  ChartDataLabels,
  BarElement,
  Legend
);

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
interface MonthlyData {
  income: number;
  expenses: number;
}

const Report: React.FC = () => {
  const userContext = useUserContext();
  const [loading, setLoading] = useState(true);
  console.log(loading);

  // Jahresspends pro Monat Diagramm und Fetch

  const [isYearlyOpen, setIsYearlyOpen] = useState(true);
  const [monthlyDataYear, setMonthlyDataYear] = useState<MonthlyData[]>(
    Array(12).fill({ income: 0, expenses: 0 })
  );

  // Fetch für Monatsanalyse
  useEffect(() => {
    const fetchYearlyTransactionsPerMonth = async () => {
      console.log("Fetch started.");
      if (!userContext || !userContext.profile) {
        console.log("No profile found.");
        setLoading(false);
        return;
      }
      // Abrufen der Kontoinformationen
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

      // Wir holen uns income und expenses
      try {
        const { data, error } = await supabaseClient
          .from("transactions")
          .select("amount, transaction_date, income_expenses")
          .eq("account_id", accountId);

        if (error) {
          setLoading(false);
          console.error("Error fetching transactions:", error);
          return;
        }
        if (data) {
          console.log("Daten da");
          const monthlyDataTemp = Array(12).fill({ income: 0, expenses: 0 });

          // Aggregation der Daten pro Monat
          data.forEach((transaction: any) => {
            const transactionMonth = new Date(
              transaction.transaction_date
            ).getMonth(); // Denk dran, die Monate sind immer 0-11 !!
            if (transaction.income_expenses == "income") {
              monthlyDataTemp[transactionMonth] = {
                ...monthlyDataTemp[transactionMonth],
                income:
                  monthlyDataTemp[transactionMonth].income + transaction.amount,
              };
            } else if (transaction.income_expenses === "expenses") {
              monthlyDataTemp[transactionMonth] = {
                ...monthlyDataTemp[transactionMonth],
                expenses:
                  monthlyDataTemp[transactionMonth].expenses +
                  transaction.amount,
              };
            }
          });
          setMonthlyDataYear(monthlyDataTemp);
        }
      } catch (error) {
        console.log("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchYearlyTransactionsPerMonth();
  }, []);

  // Diagramm Daten Balken

  const dataMonthlySpendsPerYear = {
    labels: months,
    datasets: [
      {
        label: "Income",
        data: monthlyDataYear.map((month) => month.income),
        backgroundColor: "#FF9900",
        borderWidth: 0,
      },
      {
        label: "Expense",
        data: monthlyDataYear.map((month) => month.expenses),
        backgroundColor: "#1e78fe",
        borderWidth: 0,
      },
    ],
  };

  const dataMonthlySpendsPerYearOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: "easeInOutBounce",
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            family: "Urbanist",
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: "Income and Expenses per Month",
        font: {
          family: "Urbanist-semi",
          size: 12,
        },
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "Urbanist-semi",
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          callback: function (value: any) {
            if (value >= 1000) {
              return value / 1000 + "T€";
            }
            return value;
          },
          font: {
            family: "Urbanist-semi",
          },
        },
      },
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20,
      },
    },
  };

  // Kreisdiagramm

  const [isCategoryOpen, setIsCategoryOpen] = useState(true);

  const [data, setData] = useState<{
    labels: string[];
    values: number[];
    incomeExpenses: string[];
  }>({
    labels: [],
    values: [],
    incomeExpenses: [],
  });

  const [selectionCategoryRange, setSelectionCategoryRange] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(),
    key: "selection",
  });
  const [openCategoryCalendar, setOpenCategoryCalendar] = useState(false);
  const today = new Date();

  // useEffect-Hook zum Abrufen der monatlichen Ausgaben nach Kategorie
  useEffect(() => {
    const fetchMonthlyExpensesByCategory = async () => {
      if (!userContext.profile) {
        setLoading(false);
        return;
      }

      // Abrufen der Kontoinformationen
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

      // Abrufen der Transaktionen basierend auf der Auswahl im Kalender
      const { data: transactions, error } = await supabaseClient
        .from("transactions")
        .select("category, amount, income_expenses")
        .eq("account_id", accountId)
        .gte("transaction_date", selectionCategoryRange.startDate.toISOString())
        .lte("transaction_date", selectionCategoryRange.endDate.toISOString());

      if (error) {
        setLoading(false);
        return;
      }

      // Berechnung der Gesamtausgaben pro Kategorie
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

      // Filtern der Kategorien mit einem positiven oder negativen Betrag
      const filteredCategoryData = Object.entries(categoryTotals)
        .filter(([_, data]) => data.amount !== 0)
        .map(([category, data]) => ({
          category,
          amount: data.amount,
          income_expenses: data.income_expenses,
        }));

      // Setzen der Daten für das Diagramm
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
  }, [userContext.profile, selectionCategoryRange]);

  // Labels mit Emojis für die Kategorien
  const labelsWithEmojis = data.labels.map(
    (label) => `${categoryIcons[label] || "📊"} ${label}`
  );

  // Konfiguration der Daten für das Kreisdiagramm
  const chartData = {
    labels: labelsWithEmojis,
    datasets: [
      {
        data: data.values,
        backgroundColor: [
          "#FF9900", // Orange
          "#F58C1F",
          "#F27E3E",
          "#EE704E",
          "#E9616F",
          "#E5538F",
          "#D946AF",
          "#C63ACF",
          "#A52BF0",
          "#8568F4",
          "#5A74F6",
          "#1e78fe", // Blau
        ],
      },
    ],
  };

  // Optionen für das Kreisdiagramm
  const chartOptions: ChartOptions<"doughnut"> = {
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
        color: "white",
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
        font: {
          family: "Urbanist",
          size: 14,
          weight: "normal",
        },
      },
    },
  };

  return (
    <section className="flex items-center justify-center flex-col h-100 font-Urbanist">
      <div className="h-100 bg-white p-6 w-full max-w-sm">
        {/* Benutzer-Avatar und Logo */}
        <div className="flex justify-between items-center mb-10 w-full h-10">
          <Logo />
          {userContext.profile?.avatar_url ? (
            <img
              alt="User Avatar"
              src={userContext.profile.avatar_url}
              className="inline-block h-14 w-14 rounded-full cursor-pointer object-cover object-center"
            />
          ) : (
            <div className="h-full w-auto aspect-square rounded-full bg-gray-300 flex items-center justify-center">
              No image
            </div>
          )}
        </div>

        {/* Hauptinhalt */}
        <div className="flex justify-between items-center gap-16 mb-2 w-full max-w-sm">
          <h1 className="font-bold text-2xl mb-4">Expense Analysis</h1>
        </div>

        <div className="flex flex-col justify-center gap-2">
          {/* Button zum Anzeigen/Verbergen der monatlichen Analyse */}
          <button
            className="h-10 text-center font-normal text-stone-500 bg-gray px-4 py-2 rounded-lg w-full"
            onClick={() => setIsYearlyOpen(!isYearlyOpen)}>
            {isYearlyOpen ? "" : "Show"} Spending Analysis per Month
          </button>
          {/* Chart Yearly Analysis */}
          <Collapse isOpened={isYearlyOpen}>
            <div className="w-full max-w-xl h-64 rounded-lg p-2 mb-4">
              <Bar
                data={dataMonthlySpendsPerYear}
                options={dataMonthlySpendsPerYearOptions}
              />
            </div>
          </Collapse>

          {/* Button zum Anzeigen/Verbergen der Kategorieanalyse */}
          <button
            className="h-10 text-center px-4 py-2 rounded-lg w-full text-stone-500 bg-gray"
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
            {isCategoryOpen ? "" : "Show"} Category Spending Analysis
          </button>

          {/* Kollabierbarer Bereich für die Kategorieanalyse */}
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
                    onClick={() =>
                      setOpenCategoryCalendar(!openCategoryCalendar)
                    }
                    className="px-4 py-2 border border-gray-300 text-xs rounded-lg shadow-sm mb-4 bg-gray-200 text-inactive">
                    {selectionCategoryRange.startDate.toDateString()} -{" "}
                    {selectionCategoryRange.endDate.toDateString()}
                  </button>
                  {/* Kalender für die Auswahl des Datumsbereichs */}
                  {openCategoryCalendar && (
                    <div className="z-10 mt-2">
                      <DateRange
                        ranges={[selectionCategoryRange]}
                        onChange={(item: any) =>
                          setSelectionCategoryRange(item.selection)
                        }
                        minDate={new Date(1900, 0, 1)}
                        maxDate={today}
                        showDateDisplay={false}
                        rangeColors={["#FF9900"]}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Kategorienübersicht */}
            <div className="mb-16">
              <h2 className="text-lg font-semibold mb-4">Main Categories</h2>

              {data.labels.map((category, index) => (
                <div key={category}>
                  <a href={`/category/${category}`} className="cursor-pointer">
                    <div className="flex flex-col mb-8 w-full px-2 py-4">
                      <div className="flex justify-between w-full">
                        <div className="text-md rounded-full mr-4 px-4 bg-gray w-12 h-12 flex items-center justify-center">
                          {categoryIcons[category] || "🛒"}
                        </div>
                        <div>
                          <p className="font-semibold text-base w-44">
                            {category}
                          </p>
                        </div>
                        <div className="flex justify-end w-1/3 font-bold">
                          <div className="w-full">
                            {/* Anzeige des Werts und Prozentsatzes für jede Kategorie */}
                            <p
                              className={`text-small ${
                                data.incomeExpenses[index] === "income"
                                  ? "text-income"
                                  : "text-expenses"
                              }`}>
                              {data.incomeExpenses[index] === "expense" &&
                              data.values[index] > 0
                                ? "- "
                                : ""}
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
