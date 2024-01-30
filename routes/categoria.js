var express = require('express');
var router = express.Router();


const {inserirCategoria} = require('../controller/Categoria')


const{ checkAuth } = require('./../middlewares/auth')

router.get("/cadastrar_categoria",checkAuth, (req, res) => {
    res.render('cadastrar_categoria')
  })
  router.post('/cadastrar_categoria', checkAuth, inserirCategoria)

  module.exports = router;