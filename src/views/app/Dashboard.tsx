import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
  // Dummy totals
  const totalProject = 12;
  const totalBuilding = 8;
  const totalReport = 24;
  const totalAnnotation = 56;

  // Dummy projects per month
  const projectPerMonth = [2, 3, 1, 5, 4, 6, 3, 2, 4, 5, 3, 4];

  const stats = [
    { title: "Total Project", value: totalProject },
    { title: "Total Building", value: totalBuilding },
    { title: "Total Report", value: totalReport },
    { title: "Total Annotation", value: totalAnnotation },
  ];

  const data = {
    labels: [
      "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
    ],
    datasets: [
      {
        label: "Projects Per Month",
        data: projectPerMonth,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Projects Per Month" },
    },
    maintainAspectRatio: false, // Important for full-screen
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        padding: "20px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f0f2f5",
      }}
    >
      <h1 style={{ margin: 0, marginBottom: "20px" }}>Dashboard</h1>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.title}
            style={{
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              textAlign: "center",
              flex: 1,
            }}
          >
            <h3>{stat.title}</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Graph */}
      <div
        style={{
          flex: 1,
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;
