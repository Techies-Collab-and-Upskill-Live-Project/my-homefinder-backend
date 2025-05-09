import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (_req, res) => {
  res.send("MyHomeFinder Backend API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});