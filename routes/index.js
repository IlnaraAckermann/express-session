var express = require('express');
var router = express.Router();
const usersRouter = require('./users')
const productsRouter = require('./produto')
const categoriaRouter = require('./categoria')

router.use(usersRouter);
router.use(productsRouter);
router.use(categoriaRouter);




module.exports = router;
