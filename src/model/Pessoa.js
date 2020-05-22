const connection = require('../config/db_config')

const Pessoa = (pessoa) => {
    this.nome = pessoa.nome
    this.cpf = pessoa.cpf
}

Pessoa.GetPessoa = (result) =>{
    connection.query('SELECT * FROM pessoas', (err, res) =>{
        if(err){
            console.log('Erro: ', err)
            result(err)
            return
        }else{
            console.log('Lista de Pessoas: ', res)
            result(null, res)
        }
    })
}

module.exports = Pessoa