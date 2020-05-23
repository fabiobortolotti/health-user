const connection = require('../config/db_config')

const Registro = (registro) =>{
    this.peso = registro.peso
    this.altura = registro.altura
    this.imc = registro.imc
    this.data = registro.data
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

module.exports = Registro