module.exports = app => {

    const PessoaController = require('../controller/PessoaController')
    const RegistroController = require('../controller/RegistrosController')

    app.get('/pessoas', PessoaController.GetPessoa)
    app.get('/registros', RegistroController.GetRegistro)

}