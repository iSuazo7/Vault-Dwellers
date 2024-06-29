const express = require('express');
const router = express.Router();
const loadAppHtml = require('../utils/loadAppHtml');
const authMiddleware = require('../controllers/middlewares/authMiddleware'); // Importa el middleware
const dashboardMiddleware = require('../controllers/middlewares/dashboardMiddleware');
const productosController = require('../controllers/backend/productosController');
const {listarProductos, editarProducto, guardarEdicion} = require('../controllers/backend/productosController');

const tipo_plantilla = 'backend';

//TODO: acortar los enrutadores, similar a como esta el modulo de listar refugios

router.get('/dashboard', authMiddleware, (req, res) => {
    dashboardMiddleware.dashboardFormulario(req, res);
});
// router.post('/form-endpoint', authMiddleware, (req,res) => {
//     productosController.agregarProductos(req, res);
// });

router.get('/modulo-listar-refugios', authMiddleware, listarProductos);
router.get('/modulo-editar-refugio/:id', authMiddleware, editarProducto);
router.post('/modulo-editar-refugio', authMiddleware, guardarEdicion);


router.get('/modulo-usuarios', authMiddleware, (req, res) => {
    loadAppHtml(tipo_plantilla, 'usuarios', `${process.env.APP_NAME}: Módulo Usuarios`, 'Gestión de usuarios', res);
});

router.get('/modulo-clientes', authMiddleware, (req, res) => {
    loadAppHtml(tipo_plantilla, 'clientes', `${process.env.APP_NAME}: Módulo Clientes`, 'Gestión de Clientes', res);
});

router.get('/modulo-proveedores', authMiddleware, (req, res) => {
    loadAppHtml(tipo_plantilla, 'proveedores', `${process.env.APP_NAME}: Módulo Proveedores`, 'Gestión de Proveedores', res);
});

module.exports = router;
