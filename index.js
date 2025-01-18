import express, { urlencoded } from "express";
import cors from "cors";
import conn from "./src/db/conn.js";
import { Produto } from "./src/models/Produto.js";
import { router as produtosRouter } from "./src/routes/produtosRoute.js";

const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(produtosRouter)

app.get("/", (req, res) => {
  try {
    res.send("Deu certo!");
  } catch (err) {
    console.log(err.message);
  }
});

conn.sync()
    .then(()=>{
        app.listen(3000,()=>{
            'http://localhost:3000'
        })
    }).catch(err=>{
        console.log(err)
    })
