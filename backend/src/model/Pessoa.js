const connection = require('../config/db_config')

const Pessoa = function(pessoa) {
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

Pessoa.GetPessoaById = (id, result) => {
    connection.query('SELECT * FROM pessoas WHERE idperson = ' + id, (err, res) => {
        if(err){
            console.log('Erro: ', err)
            result(null, err)
            return
        }
        if(res.length){
            console.log('Objeto Localizado ', res[0])
            result(null, res[0])
            return
        }
        //Objeto Not Found
        result(null, {kind: 'not_found'})
    })
}

Pessoa.GetPessoaByCPF = (cpf, result) => {
    connection.query('SELECT * FROM pessoas WHERE cpf = ' + cpf, (err, res) => {
        if(err){
            console.log('Erro: ', err)
            result(null, err)
            return
        }
        if(res.length){
            console.log('Objeto Localizado ', res[0])
            result(null, res[0])
            return
        }
        //Objeto Not Found
        result(null, {kind: 'not_found'})
    })
}

Pessoa.InserirPessoa = (pessoa, result) => {
    connection.query('INSERT INTO pessoas SET ?', pessoa, (err, res) => {
        if(err){
            console.log('Erro: ', err)
            result(null, err)
            return
        }
        console.log('Objeto inserido com sucesso', {id: res.insertId, ...pessoa})
        result(null, {id: res.insertId, ...pessoa})
    })
}

Pessoa.AlterarPessoa = (id, pessoa, result) =>{
    connection.query(`UPDATE pessoas SET nome = ?, cpf = ? WHERE idperson = ?`,
    [pessoa.nome, pessoa.cpf, id],
    (err, res) => {
        if(err) {
            console.log('Erro', err)
            result(err)
            return
        }
        if(res.affectedRows == 0) {
            result(null, {kind: 'not_found'})
            return
        }

        console.log('Objeto alterado com sucesso', {id: res.insertId, ...pessoa})
        result(null, {id: id, ...pessoa})
    })
}

module.exports = Pessoa