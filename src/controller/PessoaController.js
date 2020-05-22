const Pessoa = require('../model/Pessoa')

//Criar um método para acessar o método

exports.GetPessoa = (req, res) => {
    Pessoa.GetPessoa((err, dados) => {
        if(err) {
            res.status(500).send({
                mensagem: 'Ocorreu um erro ao tentar consultar o banco' + err.mensagem
            })
        }else{
            res.send(dados)
        }
    })
}