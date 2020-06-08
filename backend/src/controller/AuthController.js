const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const Pessoa = require('../model/Pessoa')
const env = require('../.env')
//Factory - Design Pattern

const sendErrorsFromDB = (res, dbErrors) => {
    const errors = []

    _.forIn(dbErrors.errors, error => errors.push(error.message) )
    return res.status(400).json({errors})
}

//Ir 
const Login = (req, res, next) => {
    const cpf = req.body.cpf || ''
    const senha = req.body.senha || ''
  
    Pessoa.GetPessoaByCPF(cpf, (err, dados) => {
        if(dados.kind == 'not_found') {
            return res.status(400).send({
                errors: ['Usuário ou senha invalidos']
            })
        }else if (dados && bcrypt.compareSync(senha, dados.senha)) {
            const token = jwt.sign({ dados }, env.authSecret, {
                expiresIn: "1 day"
            })
            const { idperson, cpf, nome } = dados
            res.json({idperson, nome, cpf, token})
        }else {
           return sendErrorsFromDB(res, err)
        }
    })

}

//Verificar se o token ainda é valido
const validateToken = (req, res, next) => {
    const token = req.body.token || ''
    jwt.verify(token, env.authSecret, function(err, decoded) {
        return res.status(200).send({
            valid: !err
        })
    })
}

module.exports = { Login, validateToken }