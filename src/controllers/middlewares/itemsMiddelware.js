const productosController = require('../backend/productosController');
const loadAppHtml = require('../../utils/loadAppHtml');

async function itemsCargar(req, res){
    try {
        productosJSON = await productosController.getProductosController();
        let itemsHtml = '';
        productosJSON.forEach(item => {
            itemsHtml += `<div class="item">
                            <h3>${item.nombre}</h3>
                            <p>Valor: ${item.valor}</p>
                         </div>`;
        });
        loadAppHtml('frontend', 'servicios', `${process.env.APP_NAME}: Servicios`, itemsHtml, res);
    } catch (error) {
        console.error('Error procesando la peticion: ', error);
        res.status(500).send('Error interno del servidor');
    }
}

module.exports = {
    itemsCargar
}
