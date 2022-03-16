require("dotenv").config();
require("express-async-errors");
const express = require("express");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const connectToDb = require("./db/connect");
const router = require("./routes/products");
const PORT = process.env.PORT || 3000;

const app = express();

// middlewares
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Waheguru!");
});

// product routes
app.use("/api/v1/products", router);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
  try {
    await connectToDb(process.env.MONGO_URI);

    console.log("Connected To MongoDb!");

    app.listen(
      PORT,
      console.log(`Server Listening At http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
