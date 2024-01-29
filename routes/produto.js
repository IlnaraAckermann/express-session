var express = require('express');
var router = express.Router();


const {
    selectProdutos,
    selectProdutoEstoqueMin,
    ordernarMaiorPreco,
    ordernarMenorPreco,
    inserirProduto,
    deleteById,
    atualizar,
    selectProdutoById,
  } = require('../controller/Produto');

router.get("/", (req, res)=>res.render('index'))
router.get("/listar", selectProdutos)
router.get("/estoque_min", selectProdutoEstoqueMin)
router.get("/maior_preco", ordernarMaiorPreco)
router.get("/menor_preco", ordernarMenorPreco)
router.post("/delete", deleteById)
router.post("/atualizar", atualizar)
router.get('/atualiza_produtos', selectProdutoById) ;

router.get("/cadastrar_p", (req, res) => {
  res.render('cadastrar_produtos')
})

router.post("/inserir_produto", inserirProduto )


module.exports = router;