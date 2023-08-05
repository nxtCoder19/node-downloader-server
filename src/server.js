import express from "express";
import routes from "./routes/index.js";

const app = express();

const port = process.env.PORT;

app.use("/api", routes);
app.use("/", (req, res) => {
  console.log(req.path);
  res.send(`running on port: ${port}`);
});

app.listen(process.env.PORT, () => console.log(`Listening  on port ${port}`));
