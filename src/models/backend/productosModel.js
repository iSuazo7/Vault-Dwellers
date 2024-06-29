const DataBase = require('../conexionModel');

class ProductoModel{

    constructor(id, nombre, valor){
        this.id = id;
        this.nombre = nombre;
        this.valor = valor;
    }

    async getAllProductos(){ //TODO: Quitar este metodo. Reemplazado por listarProductos por ser estatico. Antes de quitarlo reemplazar en todos lados por el otro. :D
        try {
            const db = DataBase.getInstance();
            const query = "SELECT nombre, valor FROM productos";
            const results = await db.ejecutarQuery(query);
            return results;
        } catch (error) {
            console.error('Error recuperando items: ', error);
            throw error;
        }        
    }

    static async listarProductos(){
        const db = DataBase.getInstance();
        try {
            const query = 'SELECT id, nombre, valor FROM productos';
            const productos = await db.ejecutarQuery(query);
            console.log('Productos encontrados: ', productos);
            return productos;
        } catch (error) {
            console.error('Error al listar productos: ', error);
            throw error;
        }
    }

    async buscarProducto(){
        const db = DataBase.getInstance();
        try {
            const query = "SELECT * FROM productos WHERE id=?";
            const producto = await db.ejecutarQuery(query,[this.id]);
            console.log('Lo encontramos, jefe: ', producto);

            if (producto.length > 0) {
                const {id, nombre, valor} = producto[0];
                this.id = id;
                this.nombre = nombre;
                this.valor = valor;
            }
            return producto;
        } catch (error) {
            console.error('Error al buscar producto: ', error);
            throw error;
        }
    }

    

    async ingresarProductos(nombre, valor){
        // try {
        //     const db = DataBase.getInstance(); //No quitar. Este metodo sigue en testeo.
        //     const query = 'INSERT INTO productos (nombre, valor) VALUES (?, ?)';
        //     await db.ejecutarQuery(query, [nombre, valor]);
        // } catch (error) {
        //     console.error('Error en la consulta: ', error);
        //     throw error;
        // }

        try {
            const query = 'INSERT INTO productos (id, nombre, valor) VALUES (?,?,?)';
            const params = [this.id, this.nombre, this.valor];
            const resultado = await db.ejecutarQuery(query, params);
            console.log('Refugio ingresado: ', resultado);
            return resultado;
        } catch (error) {
            console.error('Error al agregar el refugio: ', error);
            throw error;
        }
    }

    async editarProducto(){
        const db = DataBase.getInstance();
        try {
            const query = "UPDATE productos SET nombre = ?, valor = ? WHERE id = ?";
            const resultado = await db.ejecutarQuery(query, [
                this.nombre,
                this.valor,
                this.id
            ]);
            if (resultado.affectedRows > 0) {
                console.log('Refugio actualizado con exito');
                return true;
            } else {
                console.log('La democracia no encontro el refugio con el ID especificado o no hubo cambios en los datos, no se, tu adivina cual es cual');
                return false;
            }
        } catch (error) {
            console.error('Error al editar el refugio: ', error);
            throw error;
        }
    }
}
module.exports = ProductoModel;