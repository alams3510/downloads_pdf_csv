const express = require("express");
require("dotenv").config();
const cors = require("cors");
const pdfRoutes = require("./routes/pdfRoutes");
const csvRoutes = require("./routes/csvRoutes");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
const port = process.env.PORT || 8000;

app.use("/pdf", pdfRoutes);
app.use("/csv", csvRoutes);

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.listen(port, () => {
  console.log("server is started on port : ", port);
});
