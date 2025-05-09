import express from "express";
import cors from "cors";
import { connectToMongo } from "./database/connect.js";
import router from "./routes.js";

connectToMongo();

const app = express();
app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
app.use(express.json());

// SETUP ROUTES
app.get("/", (req, res) => {
  res.status(200).send({ working: true });
});

app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;
