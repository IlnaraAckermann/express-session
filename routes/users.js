var express = require('express');
var router = express.Router();


const { 
    selectClientes,
    cadastrarCliente, 
    selectClientToUpdate, 
    atualizarCliente,
    deleteClienteById,
    userLogged,
    userLogin
  } = require('../controller/clientes')
  

router.get('/atualizar_cliente', selectClientToUpdate) 
router.post('/atualizar_cliente', atualizarCliente)

router.post("/cadastrar_cliente", cadastrarCliente)

router.get("/cadastrar_cliente", (req, res) => {
  res.render('cadastrar_cliente')
})


router.get("/listar_c", selectClientes)
router.post("/delete_cliente", deleteClienteById)



//auth


router.get('/login', (req, res)=> res.render('login'));
router.post('/login', userLogged);


module.exports = router;