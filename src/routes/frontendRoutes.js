const express = require('express');
const router = express.Router();
const loadAppHtml = require('../utils/loadAppHtml');
const itemsHtml = require('../controllers/middlewares/itemsMiddelware');
const productosController = require('../controllers/backend/productosController');

const tipo_plantilla = 'frontend';

router.get('/', (req, res) => {
    loadAppHtml(tipo_plantilla, 'index',`${process.env.APP_NAME}: Home` , indexContent, res);
});

router.get('/nosotros', (req, res) => {
    loadAppHtml(tipo_plantilla, 'nosotros', `${process.env.APP_NAME}: Nosotros`, nosotrosContent, res);
});

// router.get('/servicios', (req, res) => {
//     loadAppHtml(tipo_plantilla, 'servicios', `${process.env.APP_NAME}: Servicios`, itemsHtml.itemsCargar() , res);
// });

router.get('/servicios', (req,res) => {
    itemsHtml.itemsCargar(req, res);
});


router.get('/contacto', (req, res) => {
    loadAppHtml(tipo_plantilla, 'contacto', `${process.env.APP_NAME}: Contacto`, contactoContet, res);
});

module.exports = router;
