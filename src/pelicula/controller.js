import { ObjectId } from "mongodb";
import { client } from "../common/db.js";
import { Pelicula } from "./pelicula.js";

const peliculaCollection = client
  .db("cine-db")
  .collection("peliculas");

export async function handleInsertPeliculaRequest(req, res) {
  const { nombre, generos, anioEstreno } = req.body;

  const pelicula = new Pelicula(nombre, generos, anioEstreno);

  peliculaCollection.insertOne(pelicula)
    .then(result => res.status(201).json(result))
    .catch(error => res.status(500).json({ error: error.message }));
}

export async function handleGetPeliculasRequest(req, res) {
  peliculaCollection.find().toArray()
    .then(result => res.status(200).json(result))
    .catch(error => res.status(500).json({ error: error.message }));
}

export async function handleGetPeliculaByIdRequest(req, res) {
  try {
    const id = new ObjectId(req.params.id);

    peliculaCollection.findOne({ _id: id })
      .then(result => {
        if (!result) {
          return res.status(404).json({ mensaje: "Película no encontrada" });
        }

        res.status(200).json(result);
      })
      .catch(error => res.status(500).json({ error: error.message }));

  } catch {
    res.status(400).json({ mensaje: "Id mal formado" });
  }
}

export async function handleUpdatePeliculaByIdRequest(req, res) {
  try {
    const id = new ObjectId(req.params.id);

    peliculaCollection.updateOne(
      { _id: id },
      { $set: req.body }
    )
      .then(result => {
        if (result.matchedCount === 0) {
          return res.status(404).json({ mensaje: "Película no encontrada" });
        }

        res.status(200).json(result);
      })
      .catch(error => res.status(500).json({ error: error.message }));

  } catch {
    res.status(400).json({ mensaje: "Id mal formado" });
  }
}

export async function handleDeletePeliculaByIdRequest(req, res) {
  try {
    const id = new ObjectId(req.params.id);

    peliculaCollection.deleteOne({ _id: id })
      .then(result => {
        if (result.deletedCount === 0) {
          return res.status(404).json({ mensaje: "Película no encontrada" });
        }

        res.status(200).json(result);
      })
      .catch(error => res.status(500).json({ error: error.message }));

  } catch {
    res.status(400).json({ mensaje: "Id mal formado" });
  }
}