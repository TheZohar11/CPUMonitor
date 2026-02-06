import { Line } from "react-chartjs-2";
import "./LineChart.css";
import "../../colors.css";

export default function LineChart({ chartData }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        grid: {
          color: "#3e3e3e33",
        },
      },
      x: {
        grid: {
          color: "#3e3e3e22",
        },
      },
    },
  };

  return (
    <div className="line-chart-container">
      <Line
        data={{
          labels: chartData
            ? chartData.map((d) => new Date(d.Timestamp).toLocaleTimeString())
            : [],
          datasets: [
            {
              label: "CPU Utilization (%)",
              data: chartData ? chartData.map((d) => d.Average) : [],
              fill: false,
              backgroundColor: "#689bb566",
              borderColor: "#689bb5",
              tension: 0.1,
            },
          ],
        }}
        options={options}
      />
    </div>
  );
}
