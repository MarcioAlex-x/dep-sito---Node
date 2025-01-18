import express from "express";
import cors from "cors";
import conn from "./src/db/conn.js";
import { Produto } from "./src/models/Produto.js";

const app = express();

app.get("/", (req, res) => {
  try {
    res.send("Deu certo!");
  } catch (err) {
    console.log(err.message);
  }
});

conn.sync()
    .then(3000,()=>{
        app.listen(()=>{
            'http://localhost:3000'
        })
    }).catch(err=>{
        console.log(err)
    })
