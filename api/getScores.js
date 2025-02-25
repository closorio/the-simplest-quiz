import fs from "fs";
import path from "path";

export default async (req, res) => {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ message: "Método no permitido" });
    }

    // Usar process.cwd() para obtener la ruta correcta en Vercel
    const scoresFilePath = path.join(process.cwd(), "scores.json");

    const data = await fs.promises.readFile(scoresFilePath, "utf8");
    const scores = JSON.parse(data);

    res.status(200).json(scores);
  } catch (err) {
    console.error("Error al leer los puntajes:", err);
    res.status(500).json({ message: "Error al leer los puntajes", error: err });
  }
};

/* Usa esta implementación si estás en un entorno local 
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// Obtener __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta al archivo scores.json
const scoresFilePath = path.join(__dirname, "../scores.json");

router.get("/getScores", (req, res) => {
    fs.readFile(scoresFilePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error al leer los puntajes:", err); // Depuración
        return res.status(500).json({ message: "Error al leer los puntajes", error: err });
      }
  
      const scores = JSON.parse(data);
      console.log("Puntajes leídos:", scores); // Depuración
      res.status(200).json(scores);
    });
  });

export default router;
*/