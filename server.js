import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "ready to rock🚀🚀" });
});

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT || 5000}`);
});
