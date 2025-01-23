import { Produto } from "../models/Produto.js";
import { Op, where } from "sequelize";

class ProdutosController {
  static async consultarProdutos(req, res) {
    try {
      const produtos = await Produto.findAll();
      res.status(200).json(produtos);
    } catch (err) {
      res
        .status(400)
        .json("Aconteceu um erro ao tentar consultar os produtos.");
    }
  }

  static async buscarProduto(req, res) {
    const { nome } = req.params;

    try {
      const produto = await Produto.findAll({
        where: {
          nome: {
            [Op.like]: `%${nome}%`,
          },
        },
      });
      res.status(200).json(produto);
    } catch (err) {
      res.status(400).json("Erro ao tentar buscar por produtos.");
    }
  }

  static async constultarProduto(req, res) {
    const id = req.params.id;

    try {
      const produto = await Produto.findOne({ where: { id } });
      res.status(200).json(produto);
    } catch (err) {
      res.status(400).json("Produto não encontrado");
    }
  }

  static async addProduto(req, res) {
    if (req.body.nome && req.body.preco && req.body.quantidade) {
      const produto = {
        nome: req.body.nome,
        preco: req.body.preco,
        quantidade: req.body.quantidade,
      };
      try {
        await Produto.create(produto);
        res.status(201).json(produto);
      } catch (err) {
        res.status(400).json("Não foi possível salvar os dados!");
      }
    } else {
      res.status(401).json("Todos os dados precisam ser preenchidos.");
    }
  }

  static async atualizarProduto(req, res) {
    const { id } = req.params
    const produto = { 
        nome : req.body.nome, 
        preco: req.body.preco, 
        quantidade: req.body.quantidade }
    try{
        await Produto.update(produto, {where: { id } })
        res.status(200).json(produto)
    }catch(err){
        res.status(400).json('Não foi possível atuaizar.')
        console.log(err)
    }
  }

  static async apagarProduto(req,res){
    const id = req.params.id
    try{
        await Produto.destroy({ where: { id } })
        res.status(200).json('Produto apagado com sucesso.')
    }catch(err){
        res.status(400).json('Impossível apagar o dado.')
    }
  }
}

export default ProdutosController;
