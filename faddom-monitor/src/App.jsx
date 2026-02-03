import "./App.css";
import React from "react";
import Header from "./components/Header/Header.jsx";
import Input from "./components/Input/Input.jsx";
import DropDown from "./components/DropDown/DropDown.jsx";
import { INTERVAL_OPTIONS } from "./constants.jsx";
import Button from "./components/Button/Button.jsx";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

function App() {
  return (
    <>
      <Header text="AWS CPU Monitor" />
      <div className="user-input-fields">
        <Input text="start date" placeholder="Enter value" type="date" />
        <Input text="end date" placeholder="Enter value" type="date" />
        <Input text="ip address" placeholder="Enter IP Address" type="text" />
        <DropDown options={INTERVAL_OPTIONS} />
        <Button text="Submit" onClick={() => alert("Button clicked!")} />
      </div>
    </>
  );
}

export default App;
