var express = require('express');
var router = express.Router();


const{ checkAuth } = require('./../middlewares/auth')

const { 
    selectClientes,
    cadastrarCliente, 
    selectClientToUpdate, 
    atualizarCliente,
    deleteClienteById,
    userLogged,
    userLogin
  } = require('../controller/Clientes')
  

router.get('/atualizar_cliente',checkAuth, selectClientToUpdate) 
router.post('/atualizar_cliente',checkAuth, atualizarCliente)

router.post("/cadastrar_cliente", cadastrarCliente)

router.get("/cadastrar_cliente", (req, res) => {
  res.render('cadastrar_cliente')
})


router.get("/listar_c", selectClientes)
router.post("/delete_cliente",checkAuth, deleteClienteById)



//auth


router.get('/login', (req, res)=> res.render('login'));
router.post('/login', userLogged);


module.exports = router;