import express from "express";
import mongoose from "mongoose";
import { PORT, MONGO_URI } from "./config.js";
import { Book } from "./models/bookModel.js";
import bookRoute from "./routes/bookRoute.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("Welcome to List Keeper!");
});

app.use('/books', bookRoute);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error:", error);
  });
