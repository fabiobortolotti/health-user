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

exports.GetRegistroById = (req, res) =>{
    Registro.GetRegistroById(req.params.Id, (err, dados) =>{
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({
                    mensagem: `Registro não encontrado`
                })
            }else{
                res.status(500).send({
                    mensagem: `Ocorreu um erro na consulta do Registro`
                })
            }
        }else{
            res.send(dados)
        }
    })
}

exports.GetRegistrosPessoa = (req, res) =>{

    Registro.GetRegistrosPessoa(req.params.Id, (err, dados) => {
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({
                    mensagem: `Registro não encontrado`
                })
            }else{
                res.status(500).send({
                    mensagem: `Ocorreu um erro na consulta do Registro por pessoa`
                })
            }
        }else{ 
            if(dados.length == 0) {
                res.status(404).send({
                    mensagem: `Pessoa não existe ou está sem registros`
                })
            } else {
                res.send(dados)
            }
        }
    })
}

exports.PostInserirRegistro = (req, res) =>{
    let registro = new Registro(req.body)
    Registro.PostInserirRegistro(registro, (err, dados)=>{
        if(err){
            res.status(500).send({
                mensagem: `Erro ao inserir um registro no banco de dados ${err.mensagem}`
            })
        }else{
            res.send(dados)
        }
    })
}