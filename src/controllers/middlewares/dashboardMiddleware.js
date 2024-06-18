const productosController = require('../backend/productosController'); //Unused de momento pero quizas lo necesite
const loadAppHtml = require('../../utils/loadAppHtml');

async function dashboardFormulario(req, res){
    const body = `<div class="form-container">
                <h3>Agregar Refugios</h3>
                <form action="/form-endpoint" method="POST" id="form-agregarProductos">
                    <label for="nombre">Name:</label><br>
                    <input type="text" id="nombre" name="nombre"><br>
                    <label for="valor">Value:</label><br>
                    <input type="text" id="valor" name="valor"><br><br>
                    <input type="submit" value="Submit">
                </form>
                <script src="/assets/backend/js/productosForm.js"></script>
                </div>
                `
    loadAppHtml('backend', 'dashboard', `${process.env.APP_NAME}: Dashboard`, body, res);
}
module.exports = {
    dashboardFormulario
}