import { Produto } from "../models/Produto.js"

class ProdutosController{

    static async addProduto(req,res){
        if(req.body.nome && req.body.preco && req.body.quantidade){
            const produto = {
                nome:req.body.nome, 
                preco:req.body.preco, 
                quantidade:req.body.quantidade
            }
            try{
                await Produto.create(produto)
                res.status(201).json(produto)
            }catch(err){
                res.status(400).json('Não foi possível salvar os dados!')
            }
        }else{
            res.status(401).json('Todos os dados precisam ser preenchidos.')
        }
       
        
    }
}

export default ProdutosController
