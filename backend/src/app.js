const express = require("express");
const testRoutes = require("./routes/test.routes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Internet Speed Tester API",
  });
});

app.use("/api/test", testRoutes);

module.exports = app;