import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scoresFilePath = path.join(__dirname, "../scores.json");

export default async (req, res) => {
  try {
    // Verificar que la solicitud sea POST
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Método no permitido" });
    }

    // Leer el cuerpo de la solicitud
    const { name, score } = req.body;

    // Validar que se proporcionen nombre y puntaje
    if (!name || typeof score !== "number") {
      return res.status(400).json({ message: "Nombre y puntaje son requeridos" });
    }

    // Leer los puntajes actuales desde el archivo JSON
    const data = await fs.promises.readFile(scoresFilePath, "utf8");
    const scores = JSON.parse(data);

    // Agregar el nuevo puntaje
    scores.push({ name, score });

    // Escribir los puntajes actualizados en el archivo JSON
    await fs.promises.writeFile(scoresFilePath, JSON.stringify(scores, null, 2));

    // Responder con éxito
    res.status(200).json({ message: "Puntaje guardado correctamente", scores });
  } catch (err) {
    console.error("Error al guardar el puntaje:", err);
    res.status(500).json({ message: "Error al guardar el puntaje", error: err });
  }
};

/* Usa esta implementación si estás en un entorno local 
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scoresFilePath = path.join(__dirname, "../scores.json");

// Función para leer y escribir de manera segura
const readScores = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(scoresFilePath, "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
};

const writeScores = (scores) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(scoresFilePath, JSON.stringify(scores, null, 2), (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

router.post("/saveScore", (req, res) => {
  console.log("Solicitud recibida:", req.body); // Depuración: Verificar los datos recibidos

  const { name, score } = req.body;

  // Validar que se proporcionen nombre y puntaje
  if (!name || typeof score !== "number") {
    return res.status(400).json({ message: "Nombre y puntaje son requeridos" });
  }

  // Leer los puntajes actuales desde el archivo JSON
  fs.readFile(scoresFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error al leer los puntajes:", err); // Depuración
      return res.status(500).json({ message: "Error al leer los puntajes", error: err });
    }

    const scores = JSON.parse(data);
    console.log("Puntajes actuales:", scores); // Depuración: Verificar los puntajes leídos

    // Agregar el nuevo puntaje
    scores.push({ name, score });
    console.log("Puntajes actualizados:", scores); // Depuración: Verificar los puntajes actualizados

    // Escribir los puntajes actualizados en el archivo JSON
    fs.writeFile(scoresFilePath, JSON.stringify(scores, null, 2), (err) => {
      if (err) {
        console.error("Error al guardar los puntajes:", err); // Depuración
        return res.status(500).json({ message: "Error al guardar los puntajes", error: err });
      }

      console.log("Puntaje guardado correctamente"); // Depuración
      res.status(200).json({ message: "Puntaje guardado correctamente", scores });
    });
  });
});

export default router;
*/