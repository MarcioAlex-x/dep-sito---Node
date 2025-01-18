import express from 'express'
import ProdutosController from '../controllers/ProdutosController.js';

export const router = express.Router()

router.post('/create', ProdutosController.addProduto)
