import "./App.css";
import React, { useState } from "react";
import Header from "./components/Header/Header.jsx";
import Input from "./components/Input/Input.jsx";
import DropDown from "./components/DropDown/DropDown.jsx";
import { INTERVAL_OPTIONS } from "./constants.jsx";
import Button from "./components/Button/Button.jsx";

import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";

const dummyData = [
  { Timestamp: "2026-01-01T00:00:00.000Z", Average: 0.7951470285405211 },
  { Timestamp: "2026-01-01T00:05:00.000Z", Average: 0.8614405500055184 },
  { Timestamp: "2026-01-01T00:10:00.000Z", Average: 0.774989929812294 },
  { Timestamp: "2026-01-01T00:15:00.000Z", Average: 0.7801582804152412 },
  { Timestamp: "2026-01-01T00:20:00.000Z", Average: 0.7731939128444727 },
  { Timestamp: "2026-01-01T00:25:00.000Z", Average: 0.760000158905027 },
  { Timestamp: "2026-01-01T00:30:00.000Z", Average: 0.7750018426547354 },
  { Timestamp: "2026-01-01T00:35:00.000Z", Average: 0.8634239069826034 },
  { Timestamp: "2026-01-01T00:40:00.000Z", Average: 0.7900176613783481 },
  { Timestamp: "2026-01-01T00:45:00.000Z", Average: 0.77166278265368 },
  { Timestamp: "2026-01-01T10:50:00.000Z", Average: 0.789857565463171 },
  { Timestamp: "2026-01-01T10:55:00.000Z", Average: 0.7616652507284638 },
  { Timestamp: "2026-01-01T11:00:00.000Z", Average: 0.788338498590089 },
  { Timestamp: "2026-01-01T11:05:00.000Z", Average: 0.7650053784224605 },
  { Timestamp: "2026-01-01T11:10:00.000Z", Average: 0.8568778960133152 },
  { Timestamp: "2026-01-01T11:15:00.000Z", Average: 0.7866441919968059 },
];

function App() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [interval, setInterval] = useState(INTERVAL_OPTIONS[0].value);
  const [chartData, setChartData] = useState(null);

  async function handleOnSubmit() {
    //post request to server with startDate, endDate, ipAddress, interval
    //send data to server
    const requestData = {
      ipAddress,
      startDate,
      endDate,
      interval,
    };
    const response = await fetch("http://localhost:3000/cpu-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    // save response in chartData state
    const data = await response.json();
    setChartData(data.data);
  }

  return (
    <>
      <Header text="AWS CPU Monitor" />
      <div className="user-input-fields">
        <Input
          text="start date"
          placeholder="Enter value"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Input
          text="end date"
          placeholder="Enter value"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <Input
          text="ip address"
          placeholder="Enter IP Address"
          type="text"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
        />
        <DropDown
          options={INTERVAL_OPTIONS}
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
        />
        <Button text="Submit" onClick={() => handleOnSubmit()} />
      </div>
      <div className="charts-container">
        <div className="chart-item">
          <h2>CPU Utilization</h2>
          <Line
            data={{
              labels: chartData
                ? chartData.map((d) =>
                    new Date(d.Timestamp).toLocaleTimeString(),
                  )
                : dummyData.map((d) =>
                    new Date(d.Timestamp).toLocaleTimeString(),
                  ),
              datasets: [
                {
                  label: "CPU Utilization (%)",
                  data: chartData
                    ? chartData.map((d) => d.Average)
                    : dummyData.map((d) => d.Average),
                  fill: false,
                  backgroundColor: "rgba(75,192,192,0.4)",
                  borderColor: "rgba(75,192,192,1)",
                  tension: 0.1,
                },
              ],
            }}
          />
        </div>
      </div>
    </>
  );
}

export default App;
/*
            "Timestamp": "2026-01-01T10:50:00.000Z",
            "Average": 0.789857565463171,
            "Unit": "Percent"
        },
        {
            "Timestamp": "2026-01-01T10:55:00.000Z",
            "Average": 0.7616652507284638,
            "Unit": "Percent"
        },
        {
            "Timestamp": "2026-01-01T11:00:00.000Z",
            "Average": 0.788338498590089,
            "Unit": "Percent"
        },
        {
            "Timestamp": "2026-01-01T11:05:00.000Z",
            "Average": 0.7650053784224605,
            "Unit": "Percent"
        },
        {
            "Timestamp": "2026-01-01T11:10:00.000Z",
            "Average": 0.8568778960133152,
            "Unit": "Percent"
        },
        {
            "Timestamp": "2026-01-01T11:15:00.000Z",
            "Average": 0.7866441919968059,
            "Unit": "Percent"
        },
        */
