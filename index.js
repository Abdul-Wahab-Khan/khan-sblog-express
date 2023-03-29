const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middlwares/checkMiddleware");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const cors = require("cors");

var corsOptions = {
  origin: process.env.CORS_URL,
  credentials: true,
};

connectDb();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json());

app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/author", require("./routes/authorRoutes"));
app.use("/api/page", require("./routes/pageRoutes"));

app.all("*", (req, res) => {
  res.status(404);
  return res.json({ message: "Page not found" });
});

app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({ message: "Post get" });
});

app.listen(port, () => {
  console.log(`Listening at ${port}`);
});
