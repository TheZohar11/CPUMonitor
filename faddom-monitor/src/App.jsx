import "./App.css";
import React, { useState } from "react";
import Header from "./components/Header/Header.jsx";
import Input from "./components/Input/Input.jsx";
import DropDown from "./components/DropDown/DropDown.jsx";
import { INTERVAL_OPTIONS } from "./constants.jsx";
import Button from "./components/Button/Button.jsx";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import LineChart from "./components/LineChart/LineChart.jsx";

export default function App() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [interval, setInterval] = useState(INTERVAL_OPTIONS[0].value);
  const [chartData, setChartData] = useState(null);

  async function handleOnSubmit() {
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
        <Header text="CPU Status" />
        <LineChart chartData={chartData} />
      </div>
    </>
  );
}
