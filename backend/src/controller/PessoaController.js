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

exports.GetPessoaById = (req, res) => {
    Pessoa.GetPessoaById(req.params.Id, (err, dados) => {
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({
                    mensagem: `Pessoa não encontrada`
                })
            }else{
                res.status(500).send({
                    mensagem: `Ocorreu um erro na consulta`
                })
            }
        }else{
            res.send(dados)
        }
    })
}

exports.InserirPessoa = (req, res) => {
    let pessoa = new Pessoa(req.body)
    Pessoa.InserirPessoa(pessoa, (err, dados) => {
        if(err){
            res.status(500).send({
                mensagem: `Erro ao inserir uma pessoa no banco de dados ${err.mensagem}`
            })
        }else{
            res.send(dados)
        }
    })
}

exports.AlterarPessoa = (req, res) => {
    
    if(!req.body) {
        res.status(404).send({
            mensagem: `Conteúdo não ´de ser vazio`
        })
    }

    let pessoa = new Pessoa(req.body)

    Pessoa.AlterarPessoa(req.params.Id, pessoa, (err, dados) => {
        console.log('Pessoa' +pessoa)
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({
                    mensagem: `Pessoa não encontrada`
                })
            }else{
                res.status(500).send({
                    mensagem: `Ocorreu um erro ao alterar a pessoa - ${err.message}`
                })
            }
        }else{
            res.send(dados)
        }
    })

}