const connection = require('../config/db_config')

const Registro = function(registro){
    this.peso = registro.peso
    this.altura = registro.altura
    this.imc = registro.imc
    this.data = registro.data
    this.resultado = registro.resultado
    this.person_idperson = registro.person_idperson
}

Registro.GetRegistro = (result) =>{
    connection.query('SELECT * FROM registros', (err, res) => {
        if(err){
            console.log('Erro: ', err)
            result(err)
            return
        }else{
            console.log('lista de registros: ', res)
            result(null, res)
        }
    })
}

Registro.GetRegistroById = (id, result) =>{
    connection.query('SELECT * FROM registros WHERE idregistros = '+ id, (err, res)=>{
        if(err){
            console.log('Erro: ', err)
            result(null, err)
            return
        }
        if(res.length){
            console.log('Objeto localizado ', res[0])
            result(null, res[0])
            return
        }
        result(null, {kind: 'not_found'})
    } )
}
Registro.GetRegistrosPessoa = (idPessoa, result) => {
    connection.query('SELECT * FROM registros WHERE person_idperson = '+ idPessoa, (err, res) => {
        if(err){
            console.log('Erro: ', err)
            result(null, err)
            return
        }
        if(res){
            console.log('Objeto localizado ', res)
            result(null, res)
            return
        }
        result(null, {kind: 'not_found'})
    })
}

Registro.PostInserirRegistro = (registro, result) =>{
    connection.query('INSERT INTO registros SET ?', registro, (err, res) =>{
        if(err){
            console.log('Erro: ', err)
            result(null, err)
            return
        }
        console.log('Objeto inserido com sucesso', {id: res.insertId, ...registro})
        result(null, {id: res.insertId, ...registro})
    })
}

// Registro.PutAlterarRegistro = (id, registro, result) => {
//     connection.query(`UPDATE pessoa SET nome = ?, cpf = ? WHERE `)
// }

module.exports = Registro