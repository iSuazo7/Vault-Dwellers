const Producto = require('../../models/backend/productosModel');
const loadAppHtml = require('../../utils/loadAppHtml');
const path = require('path');
const fs = require('fs');



async function getProductosController(req, res){
    try {
        const productoModel = new Producto();
        const productos = await productoModel.getAllProductos();
        if (productos.length === 0) {
            return res.status(404).send('No se encontraron productos en la base de datos.');
        }
        let jsonData = JSON.stringify(productos.map(producto => ({ //map sirve para recorrer un array. Similar a un forEach
            nombre: producto.nombre,
            valor: producto.valor
        })));
        jsonData = JSON.parse(jsonData);
        // console.log(jsonData); //Para testing. Borrar luego
        return jsonData;
    } catch (error) {
        console.error('Error obteniendo productos: ', error);
        res.status(500).send('Error interno del servidor');
    }
};

async function agregarProductos(req, res){
    try {
        const productoModel = new Producto();
        const {nombre, valor} = req.body;
        await productoModel.ingresarProductos(nombre, valor);
        res.status(200).send('Productos agregados con exito');
    } catch (error) {
        res.status(500).send('Error agregando el producto: ', error);
    }
}

async function listarProductos(req, res){
    try {
        const refugios = await Producto.listarProductos();
        let html;
        if(refugios.length > 0){
            html = '<h3>Refugios bajo el manto de Vault-Tec</h3>';
            html += '<table class="lista-refugios">'+
                        '<tr>'+
                            '<th>#</th>'+
                            '<th>Nombre</th>'+
                            '<th>Valor</th>'+
                        '</tr>';
            refugios.forEach(refugio => {
                html += `<tr>`+
                            `<td> ${refugio.id} </td>`+
                            `<td> ${refugio.nombre} </td>`+
                            `<td> ${refugio.valor} </td>`;
                    html += `<td> </td>`+
                            `<td> </td>`+
                            `<td><a class="btn btn-primary" href='/sitio-admin/modulo-editar-refugio/${refugio.id}'> Editar </a></td>`+
                        `</tr>`;
            });
            html += '</table>';
        }else{
            html += '<h3>No hay refugios para mostrar</h3>';
        }

        loadAppHtml('backend', 'refugios-listar', `${process.env.APP_NAME}: Modulo Refugios`, html, res);
    } catch (error) {
        console.error('Error al listar refugios desde el controlador: ', error);
        res.status(500).send('Vault-Tec está teniendo problemas para listar los refugios.');
    }
}

async function editarProducto(req,res){
    const refugioId = req.params.id;
    const refugio = new Producto(refugioId);
    await refugio.buscarProducto();
    const filePath = path.join(__dirname, "../../views/backend/partials/_refugios_form_editar.html");
    try {
        let htmlContent = fs.readFileSync(filePath, 'utf-8');
        htmlContent = htmlContent.replace('{{ id }}', refugio.id);
        htmlContent = htmlContent.replace('{{ nombre }}', refugio.nombre);
        htmlContent = htmlContent.replace('{{ valor }}', refugio.valor);
        loadAppHtml('backend', 'refugios-editar', `${process.env.APP_NAME}: Modulo Refugios`, htmlContent, res);
    } catch (error) {
        console.error('El poder de la democracia no pudo abrir este HTML: ', error);
    }
}

async function guardarEdicion(req, res){
    const {id, nombre, valor} = req.body;
    const refugio = new Producto(id, nombre, valor);
    const respuesta = refugio.editarProducto();
    if (respuesta) {
        req.flash('msg', 'Se ha editado');
        res.status(200).json({ message: `Refugio ${nombre} editado correctamente` });
    } else {
        req.flash('msg', 'No se ha editado');
        res.status(404).json({ message: `No se ha podido editar el Refugio ${nombre}` });
    }
}

module.exports = {
    getProductosController,
    agregarProductos,
    listarProductos,
    editarProducto,
    guardarEdicion
}