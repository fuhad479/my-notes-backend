import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import users from "./routes/users.js";
import connect from "./database/connect.js";
import { validation } from "./middlewares/users.js";

dotenv.config();

const app = express();

// use builtin or external middleware functions
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// this endpoint will check if the server is up and running
app.get("/api", (req, res) => {
  res.status(200).json({ message: "ready to rock🚀🚀" });
});

// use REST api endpoints
app.use("/api/users", validation, users);

async function establishConnection() {
  try {
    // establish a successful connection with mongodb database
    await connect();

    // start the application server
    app.listen(process.env.PORT, () => {
      console.log(`http://localhost:${process.env.PORT || 5000}`);
    });
  } catch (error) {
    console.log(error);
  }
}

establishConnection();
