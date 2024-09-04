import { useEffect, useState } from "react";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Chart } from "react-chartjs-2";
import supabaseClient from "../lib/supabaseClient";
import { useProfileData } from "../context/ProfileContext";
import { SupabaseClient } from "@supabase/supabase-js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const Report: React.FC = () => {
  const [data, setData] = useState<{ labels: string[]; values: number[] }>({
    labels: [],
    values: [],
  });
  const [loading, setLoading] = useState(true);

  const { profile } = useProfileData();

  if (!profile) {
    console.log("No profile found.");
    return;
  }

  useEffect(() => {
    const fetchMonthlyExpensesByCategory = async () => {
      console.log("Fetching data...");

      if (!profile) {
        console.log("No profile found, aborting...");
        setLoading(false);
        return;
      }

      console.log("Profile found:", profile);

      const accountResponse = await supabaseClient
        .from("account")
        .select("id")
        .eq("profile_id", profile.id)
        .single();

      if (!accountResponse) {
        return "no Account found";
      }
      const accountId = accountResponse.data?.id;

      if (!accountId) {
        return "no Account found";
      }

      const { data: transactions, error } = await supabaseClient
        .from("transactions")
        .select("category, amount")
        .eq("account_id", accountId) // Verwende die account_id aus dem Profil
        .gte("transaction_date", new Date().toISOString().slice(0, 7) + "-01") // Beginn des aktuellen Monats
        .lt("transaction_date", new Date().toISOString().slice(0, 7) + "-30"); // Ende des aktuellen Monats
      console.log(new Date().toISOString().slice(0, 7) + "-30");

      const now = new Date();

      // Berechnung des ersten Tages des letzten Monats
      const startOfLastMonth = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        1
      );

      // Berechnung des letzten Tages des letzten Monats
      const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

      if (error) {
        console.log("Error fetching transactions:", error);
        setLoading(false);
        return;
      }

      console.log("Fetched transactions:", transactions);

      const categoryTotals: Record<string, number> = {};
      transactions.forEach((transaction) => {
        console.log("Processing transaction:", transaction);

        // Überprüfen, ob die Kategorie vorhanden ist
        if (!categoryTotals[transaction.category]) {
          console.log(
            `Category ${transaction.category} not found, initializing.`
          );
          categoryTotals[transaction.category] = 0;
        }

        // wenn kategorie existiert, addiere ihr den betrag
        categoryTotals[transaction.category] += transaction.amount;
        console.log(
          `Updated category ${transaction.category}:`,
          categoryTotals[transaction.category]
        );
      });

      console.log("Final category totals:", categoryTotals);

      // Setze die aggregierten Daten für die Darstellung im Chart
      setData({
        labels: Object.keys(categoryTotals), // Kategorienamen als Labels
        values: Object.values(categoryTotals), // Summen als Werte
      });

      setLoading(false); // Setze den Ladezustand auf false
      console.log("Data set for chart:", {
        labels: Object.keys(categoryTotals),
        values: Object.values(categoryTotals),
      });
    };

    // Daten werden abgerufen
    fetchMonthlyExpensesByCategory();
  }, [profile]); // Profile als Abhängigkeit hinzufügen

  if (loading) {
    console.log("Loading...");
    return <>Loading...</>; // Zeige einen Ladeindikator an, solange die Daten abgerufen werden
  }

  // Daten Donut

  const chartData = {
    labels: data.labels, // Kategorien
    datasets: [
      {
        data: data.values, // Summen
        backgroundColor: [
          "#FF6384", // Hintergrundfarbe für die Segmente
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

  console.log("Rendering chart with data:", chartData);

  // Optionen Diagramm

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const, // Legende
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || ""; // Label Segment
            const value = context.raw || 0; // Wert Segment
            return `${label}: ${value.toFixed(2)} €`; // Formatierter Tooltip
          },
        },
      },
    },
  };

  return (
    <>
      <div className="">
        <h2>Monthly Expenses by Category</h2>
        <Chart type="doughnut" data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default Report;
