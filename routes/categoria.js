var express = require('express');
var router = express.Router();


const {inserirCategoria} = require('../controller/Categoria')



router.get("/cadastrar_categoria", (req, res) => {
    res.render('cadastrar_categoria')
  })
  router.post('/cadastrar_categoria', inserirCategoria)

  module.exports = router;