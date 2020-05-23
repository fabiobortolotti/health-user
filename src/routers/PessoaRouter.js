module.exports = app => {

    const PessoaController = require('../controller/PessoaController')

    app.get('/pessoas', PessoaController.GetPessoa)

}