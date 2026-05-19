import { ObjectId } from "mongodb";
import { client } from "../common/db.js";
import { Actor } from "./actor.js";

const actorCollection = client
  .db("cine-db")
  .collection("actores");

const peliculaCollection = client
  .db("cine-db")
  .collection("peliculas");

export async function handleInsertActorRequest(req, res) {
  const {
    nombrePelicula,
    nombre,
    edad,
    estaRetirado,
    premios
  } = req.body;

  peliculaCollection.findOne({ nombre: nombrePelicula })
    .then(pelicula => {
      if (!pelicula) {
        return res.status(404).json({ mensaje: "Película no encontrada" });
      }

      const actor = new Actor(
        pelicula._id.toString(),
        nombre,
        edad,
        estaRetirado,
        premios
      );

      actorCollection.insertOne(actor)
        .then(result => res.status(201).json(result))
        .catch(error => res.status(500).json({ error: error.message }));
    })
    .catch(error => res.status(500).json({ error: error.message }));
}

export async function handleGetActoresRequest(req, res) {
  actorCollection.find().toArray()
    .then(result => res.status(200).json(result))
    .catch(error => res.status(500).json({ error: error.message }));
}

export async function handleGetActorByIdRequest(req, res) {
  try {
    const id = new ObjectId(req.params.id);

    actorCollection.findOne({ _id: id })
      .then(result => {
        if (!result) {
          return res.status(404).json({ mensaje: "Actor no encontrado" });
        }

        res.status(200).json(result);
      })
      .catch(error => res.status(500).json({ error: error.message }));

  } catch {
    res.status(400).json({ mensaje: "Id mal formado" });
  }
}

export async function handleGetActoresByPeliculaRequest(req, res) {
  try {
    const peliculaId = req.params.pelicula;

    actorCollection.find({ idPelicula: peliculaId }).toArray()
      .then(result => res.status(200).json(result))
      .catch(error => res.status(500).json({ error: error.message }));

  } catch {
    res.status(400).json({ mensaje: "Id mal formado" });
  }
}