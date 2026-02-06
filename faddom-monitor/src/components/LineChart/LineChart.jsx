import { Line } from "react-chartjs-2";

export default function LineChart({ chartData }) {
  return (
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
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            tension: 0.1,
          },
        ],
      }}
    />
  );
}
