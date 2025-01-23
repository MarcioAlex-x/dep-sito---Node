import express from 'express'
import ProdutosController from '../controllers/ProdutosController.js';
import { Produto } from '../models/Produto.js';

export const router = express.Router()

router.get('/produtos', ProdutosController.consultarProdutos)
router.get('/produto/:nome', ProdutosController.buscarProduto)
router.get('/produto/:id', ProdutosController.constultarProduto)
router.post('/create', ProdutosController.addProduto)
router.put('/atualizar/:id',ProdutosController.atualizarProduto)
router.delete('/apagar/:id', ProdutosController.apagarProduto)
