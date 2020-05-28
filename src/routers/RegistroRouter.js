module.exports = app =>{

    const RegistroController = require('../controller/RegistrosController')

    //Consulta geral por registro
    app.get('/registros', RegistroController.GetRegistro)

    //consulta registro por ID
    app.get('/registros/:Id', RegistroController.GetRegistroById)

    //Consulta registros por Pessoa
    app.get('/registros/pessoa/:Id', RegistroController.GetRegistrosPessoa)

    //Inserir registro
    app.post('/registros', RegistroController.PostInserirRegistro)
}