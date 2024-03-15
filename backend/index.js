import express from "express";
import mongoose from "mongoose";
import { PORT, MONGO_URI } from "./config.js";
import { Book } from "./models/bookModel.js";
import bookRoute from "./routes/bookRoute.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS

//Option 1 - Allowing all origins with Default of cors(*)
// app.use(cors());

//Option 2 - Allowing custom origin
app.use(cors({ origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));

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
