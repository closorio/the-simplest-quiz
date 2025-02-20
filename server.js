import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import getScoresRouter from "./api/getScores.js";
import saveScoreRouter from "./api/saveScore.js";

// Obtener __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir las funciones serverless
app.use("/api", getScoresRouter);
app.use("/api", saveScoreRouter);

// Servir el frontend (React)
app.use(express.static(path.join(__dirname, "dist")));  
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});