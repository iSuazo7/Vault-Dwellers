const express = require('express');
const router = express.Router();
const loadAppHtml = require('../utils/loadAppHtml');
const itemsHtml = require('../controllers/middlewares/itemsMiddelware');

const tipo_plantilla = 'frontend';

// router.get('/', (req, res) => {
//     loadAppHtml(tipo_plantilla, 'index',`${process.env.APP_NAME}: Home` , 'Index', res);
// });

router.get('/', (req, res) => {
    itemsHtml.indexCargar(req, res);
});

// router.get('/nosotros', (req, res) => {
//     loadAppHtml(tipo_plantilla, 'nosotros', `${process.env.APP_NAME}: Nosotros`, 'Nosotros', res);
// });

router.get('/nosotros', (req, res) => {
    itemsHtml.nosotrosCargar(req, res);
});

// router.get('/servicios', (req, res) => {
//     loadAppHtml(tipo_plantilla, 'servicios', `${process.env.APP_NAME}: Servicios`, itemsHtml.itemsCargar() , res);
// });

router.get('/refugios', (req,res) => {
    itemsHtml.itemsCargar(req, res);
});


// router.get('/contacto', (req, res) => {
//     loadAppHtml(tipo_plantilla, 'contacto', `${process.env.APP_NAME}: Contacto`, 'Contacto', res);
// });

router.get('/contacto', (req, res) => {
    itemsHtml.contactoCargar(req, res);
});

module.exports = router;
