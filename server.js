//require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 3000
//const USER = process.env.USER
//const PASSWORD = process.env.PASSWORD
//mongoose.connect(`mongodb://${USER}:${PASSWORD}@0.0.0.0:27017/teztz`, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(express.json())

mongoose.connect('mongodb://localhost:27017/teztz', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión a la base de datos establecida')
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos', err)
  })

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  password: String
})

const Usuario = mongoose.model('usuarios', usuarioSchema)

app.get("/", (req, res) => {
  res.status(200).send("Hola mundo")
})

app.get("/usuarios", async (req, res) => {
    try{
        const usuarios = await Usuario.find()
        res.status(200).json(usuarios)
    }
    catch (error){
        res.status(500).json({ error: error.message })
    }
});

app.get("/usuarios/:nombre", async (req, res) => {
    try{
        const { nombre } = req.params
        const usuario = await Usuario.findOne({ nombre })
        res.status(200).json(usuario)
    }
    catch (error){
        res.status(500).json({ error: error.message })
    }
});

app.post("/usuarios", async (req, res) => {
  const { nombre, password } = req.body
  try {
    const usuario = new Usuario({ nombre, password })
    await usuario.save()
    res.status(201).json(usuario)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
});

app.put("/usuarios/:nombre", async (req, res) => {
    try{
        const { nombre } = req.params
        const { password } = req.body
        const usuario = await Usuario.findOneAndUpdate({ nombre }, { password }, { new: true })
        res.status(200).json(usuario)
    }
    catch (error){
        res.status(500).json({ error: error.message })
    }
});

app.delete("/usuarios/:nombre", async (req, res) => {
    try{
        const { nombre } = req.params
        const usuario = await Usuario.findOneAndDelete({ nombre })
        res.status(204).json(usuario)
    }
    catch (error){
        res.status(500).json({ error: error.message })
    }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})