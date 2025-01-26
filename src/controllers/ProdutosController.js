import { Op } from "sequelize";
import { Produto } from "../models/Produto.js";

class ProdutosController {

  static async addProduto(req, res) {
    if (req.body.nome && req.body.preco && req.body.quantidade) {
      const produto = {
        nome: req.body.nome,
        preco: req.body.preco,
        quantidade: req.body.quantidade,
      };
      try {
        await Produto.create(produto);
        return res.status(201).json(produto);
      } catch (err) {
        return res.status(400).json("Não foi possível salvar os dados!");
      }
    } else {
      return res.status(401).json("Todos os dados precisam ser preenchidos.");
    }
  }

  static async buscar (req,res){
    try{
      const produtos = await Produto.findAll()
      return res.status(200).json(produtos)
    }catch(err){
      return res.status(400).json("Não foi possível obter os dados.")
    } 
  }

  static async atualizarProduto (req,res) {
    const { id } = req.params
    const produto = {
      nome:req.body.nome,
      preco:req.body.preco,
      quantidade:req.body.quantidade
    }
    try{
      await Produto.update(produto, { where: { id } })
      return res.status(200).json(produto)
    }catch(err){
      return res.status(400).json("Não foi possível atualizar o produto")
    }
  }

  static async apagarProduto (req, res) {
    const id = req.params.id
    try{
      await Produto.destroy({ where: { id } })
      return res.status(200).json("Produto apagado com sucesso.")
    }catch(err){
      return res.status(400).json("Não foi possível apagar o produto.")
    }
  }

  static async buscarId (req,res) {
    const { id } = req.params
    try{
      const produto = await Produto.findOne({ where:{ id } })
      return res.status(200).json(produto)
    }catch(err){
      return res.status(400).json('Não possível encontrar o produto buscado.')
    }
  }

  static async buscarNome (req, res){
    const {nome} = req.params

    try{
      const produto = await Produto.findAll({ 
        where:{ 
          nome:{
            [Op.like]:`%${nome}%`
          }
         } 
      })
      return res.status(200).json(produto)
    }catch(err){
      return res.status(400).json("Não foi possível encontrar")
    }
  }

  static async venda (req, res){
    const { id } = req.params
    const { valor } = req.body
    if(!valor || valor <= 0){
      return res.status(400).json('O quantidade que pretende vender precisa ser maior que zero.')
      
    }
    try{
      const produto = await Produto.findOne({ where:{ id } })
      if( !produto ){
        return res.status(400).json('Produto não encontrado no estoque.')
        
      }
      if ( produto.quantidade < valor ) {
        return res.status(400).json(`Quantidade de ${produto.nome} é insuficiente no estoque.`)
        
      }
      await Produto.decrement('quantidade',{
        by: valor,
        where:{
          id
        },
      })
      return res.status(200).json(`Venda de ${valor} ${produto.nome}(s) realizada com sucesso.`)

    }catch(err){
      return res.status(400).json('Não foi possível efetuar a venda do produto.')
      
    }
  }

  static async reposicao (req, res) {
    const { id } = req.params
    const { valor } = req.body

    if(!valor || valor <= 0){
      return res.status(400).json('O valor precisa ser maior que zero.')
    }
    try{
      const produto = await Produto.findOne({ where: { id }})
      if(!produto){
        return res.status(400).json('Produto não encontrado.')
      }

      await Produto.increment('quantidade',{
        by: valor,
        where:{
          id
        }
      })
      return res.status(200).json(`Reposição de ${valor} ${produto.nome}(s) realizada com sucesso.`)
    }catch(err){
      return res.status(400).json('Não foi possível repor o estoque.')
    }
  }
}

export default ProdutosController;
