module.exports = app =>{

    const RegistroController = require('../controller/RegistrosController')

    app.get('/registros', RegistroController.GetRegistro)

}