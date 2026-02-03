import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { fetchCPUDataFromCloudWatch } from "./fetchCPUDataFromCloudWatch.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.post("/cpu-data", async (req, res) => {
  const { ipAddress, startDate, endDate, interval } = req.body;
  const data = await fetchCPUDataFromCloudWatch(
    ipAddress,
    startDate,
    endDate,
    interval,
  );
  if (!data) {
    return res
      .status(404)
      .json({ error: "Instance not found for the given IP address" });
  }
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
