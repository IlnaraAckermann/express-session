var express = require('express');
var router = express.Router();

const{ checkAuth } = require('./../middlewares/auth')

const {
    selectProdutos,
    selectProdutoEstoqueMin,
    ordernarMaiorPreco,
    ordernarMenorPreco,
    inserirProduto,
    deleteById,
    atualizar,
    selectProdutoById,
    selectMeusProdutos,
  } = require('../controller/Produto');

router.get("/", selectProdutos)
router.get("/listar", selectProdutos)
router.get("/listar_meus_produtos",checkAuth, selectMeusProdutos)
router.get("/estoque_min", selectProdutoEstoqueMin)
router.get("/maior_preco", ordernarMaiorPreco)
router.get("/menor_preco", ordernarMenorPreco)
router.post("/delete",checkAuth, deleteById)
router.post("/atualizar",checkAuth, atualizar)
router.get('/atualiza_produtos',checkAuth, selectProdutoById) ;

router.get("/cadastrar_p", checkAuth, (req, res) => {
  res.render('cadastrar_produtos')
})

router.post("/inserir_produto", checkAuth, inserirProduto )


module.exports = router;