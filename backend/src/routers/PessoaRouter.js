module.exports = app => {

    const PessoaController = require('../controller/PessoaController')
    const AuthController = require('../controller/AuthController')

    //Consultar pessoas
    app.get('/pessoas', PessoaController.GetPessoa)

    //Consultar pessoa por ID
    app.get('/pessoas/:Id', PessoaController.GetPessoaById)

    //Inserir uma pessoa
    app.post('/pessoas', PessoaController.InserirPessoa)

    //Alterar dados de uma pessoa
    app.put('/pessoas/:Id', PessoaController.AlterarPessoa)

    app.post('/login', AuthController.Login)
}