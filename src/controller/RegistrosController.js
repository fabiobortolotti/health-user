const Registro = require('../model/Registro')

exports.GetRegistro = (req, res) => {
    Registro.GetRegistro((err, dados) =>{
        if(err){
            res.status(500).send({
                mensagem: 'Ocorreu um erro ao tentar consultar o bando' + err.mensagem
            })
        }else{
            res.send(dados)
        }
    })
}