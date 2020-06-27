const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('../controllers/usuariosController');

//middle para proteger las rutas
const auth = require('../middleware/auth');

module.exports = function () {

    //********************************************
    //*********** CLIENTES **********************

    // POST AGREGAR NUEVOS CLIENTE
    router.post('/clientes', auth,
        clienteController.nuevoCliente);

    //GET OBTENER CLIENTES
    router.get('/clientes', auth,
        clienteController.obtenerClientes);

    //GET MUESTRA UN CLIENTE EN ESPECIFICO(ID)
    router.get('/clientes/:id', auth,
        clienteController.mostrarCliente);

    //PUT ACTUALIZAR CLIENTE
    router.put('/clientes/:id', auth,
        clienteController.actualizarCliente);

    //DELETE Eliminar cliente
    router.delete('/clientes/:id', auth,
        clienteController.eliminarCliente);




    //********************************************
    //*********** PRODUCTOS **********************

    //POST NUEVO PRODUCTO
    router.post('/productos', auth,
        productosController.subirImagen,
        productosController.nuevoProducto);

    //GET MUESTRA TODOS LOS PRODUCTOS
    router.get('/productos', auth,
        productosController.mostrarProductos);

    //GET MUESTRA UN PRODUCTO EN ESPECIFICO POR ID
    router.get('/productos/:id', auth,
        productosController.mostrarUnProducto);

    //PUT ACTUALIZAR PRODUCTOS
    router.put('/productos/:id', auth,
        productosController.subirImagen,
        productosController.actualizarProducto);

    // DELETE ELIMINAR PRODUCTOS
    router.delete('/productos/:id', auth,
        productosController.eliminarProducto);

    //BUSQUEDA DE PRODUCTOS
    router.post('/productos/busqueda/:query', auth,
        productosController.buscarProductos);



    //********************************************
    //*********** PEDIDOS **********************

    //POST - AGREGA UN NUEVO PEDIDO
    router.post('/pedidos/nuevo/:idCliente', auth,
        pedidosController.nuevoPedido);

    //GET - MUESTRA LOS PEDIDOS
    router.get('/pedidos', auth,
        pedidosController.mostrarPedidos);

    //Mostrar un pedido por su ID
    router.get('/pedidos/:id', auth,
        pedidosController.mostrarUnPedido);

    // PUT ACTUALIZAR PEDIDOS
    router.put('/pedidos/:id', auth,
        pedidosController.actualizarPedido);

    //DELETE ELIMINAR PEDIDOS
        router.delete('/pedidos/:id', auth,
            pedidosController.eliminarPedido);




    //********************************************
    //*********** USUARIOS **********************

    //POST CREAR CUENTA
    router.post('/crear-cuenta', usuariosController.RegistrarUsuario);


    //POST INICIAR SESION
    router.post('/iniciar-sesion', usuariosController.autenticarUsuario);





    return router;
};
