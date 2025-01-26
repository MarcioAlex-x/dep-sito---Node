import express from 'express'
import ProdutosController from '../controllers/ProdutosController.js';

export const router = express.Router()

router.get('/buscar', ProdutosController.buscar)
router.get('/buscarId/:id', ProdutosController.buscarId)
router.get('/buscarNome/:nome',ProdutosController.buscarNome)
router.post('/create', ProdutosController.addProduto)
router.post('/venda/:id', ProdutosController.venda)
router.post('/reposicao/:id', ProdutosController.reposicao)
router.put('/atualizar/:id', ProdutosController.atualizarProduto)
router.delete('/apagar/:id', ProdutosController.apagarProduto)

