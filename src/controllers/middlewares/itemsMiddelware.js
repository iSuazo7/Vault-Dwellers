const productosController = require('../backend/productosController');
const loadAppHtml = require('../../utils/loadAppHtml');

async function itemsCargar(req, res){
    try {
        productosJSON = await productosController.getProductosController();
        let itemsHtml = '';
        productosJSON.forEach(item => {
            itemsHtml += `<div class="items">
                            <h3>${item.nombre}</h3>
                            <p>Valor: ${item.valor}</p>
                         </div>`;
        });
        loadAppHtml('frontend', 'refugios', `${process.env.APP_NAME}: Servicios`, itemsHtml, res);
    } catch (error) {
        console.error('Error procesando la peticion: ', error);
        res.status(500).send('Error interno del servidor');
    }
}

async function indexCargar(req, res){
    const body = `<div class="index">
                    <h2>VAULT-TEC</h2>
                    <h3>Preparate para el futuro</h3>
                    <p>El mundo es peligroso, pero no tiene por qué serlo. Duerme tranquilo sabiendo que tu familia está en las buenas manos de Vault-Tec</p>
                    <button type="button" onclick="location.href='/refugios'">Compra tu refugio aquí!</button>
                </div>`;
    loadAppHtml('frontend', 'index', `${process.env.APP_NAME}: Home`, body, res);
}

async function nosotrosCargar(req, res){
    const body = `<div class="nosotros">
                    <h2>VAULT-TEC: Preservando a la humanidad, un refugio a la vez.</h2>  
                    <p>
                       Bienvenido a Vault-Tec, el líder mundial en refugios subterraneos
                       y salvavidas de la sociedad! Desde el siglo 21, nos hemos comprometido
                       a asegurar el futuro de la humanidad frente a amanazas inesperadas.
                    </p>
                    <h2>Quienes somos</h2>  
                    <p>
                       Vault-Tec es una empresa de ingeniería estadounidense preeminente 
                       especializada en la construcción de refugios subterraneos y sistemas de soporte vital.
                       Nos dedicamos a proporcionar a nuestros valiosos clientes la tranquilidad 
                       de saber que ellos y sus seres queridos tienen un futuro seguro, 
                       sean cuales sean las circunstancias.
                    </p>
                    <h2>Nuestra mision</h2>  
                    <p>
                       En Vault-Tec, creemos en la preparación. Por eso hemos diseñado una variedad de refugios
                       que se adaptan a cualquier estilo de vida y contingencia.  Desde desastres naturales 
                       hasta conflictos mundiales, nuestras cámaras acorazadas ofrecen un refugio seguro 
                       equipado con tecnología avanzada y ecosistemas autosuficientes.
                    </p>
                    <h2>Por qué elegir Vault-Tec?</h2>  
                    <ul>
                        <li>Expertís inigualable: Contamos con los mejores ingenieros y científicos del sector. Llevamos décadas perfeccionando la tecnología de nuestros refugios para garantizar su comodidad y seguridad.</li>
                        <li>Compromiso inquebrantable: En Vault-Tec estamos comprometidos con la responsabilidad social. Creemos firmemente en preservar el legado de la humanidad y garantizar un futuro mejor para las generaciones venideras.</li>
                        <li>Para gustos, colores!: No hay dos amenazas iguales, por eso ofrecemos una amplia gama de Bóvedas, cada una diseñada para un propósito específico. Tanto si buscas un refugio lujoso como una sociedad comunal centrada en la reconstrucción, Vault-Tec tiene la solución perfecta.</li>
                    </ul>
                </div>`;
    loadAppHtml('frontend', 'nosotros', `${process.env.APP_NAME}: Sobre Nosotros`, body, res);
}

async function contactoCargar(req, res){
    const body = `<div class="contacto-form-wrapper">
                    <form action="#">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" required placeholder="example@example.com">

                        <label for="asunto">Asunto:</label>
                        <input type="text" id="asunto" name="asunto" required>

                        <label for="mensaje">Mensaje:</label>
                        <textarea  id="mensaje" name="mensaje" rows="5" required></textarea>

                        <button type="submit">Enviar</button>
                    </form>    
                </div>`;
    loadAppHtml('frontend', 'contacto', `${process.env.APP_NAME}: Contacto`, body, res);
}



module.exports = {
    itemsCargar,
    indexCargar,
    nosotrosCargar,
    contactoCargar
}
