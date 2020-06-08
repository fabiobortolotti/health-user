const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const Pessoa = require('../model/Pessoa')
const secret = 'ero0u´iqewfJ[OG3492-P'
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
            const token = jwt.sign({ dados }, secret, {
                expiresIn: "1 day"
            })
            const { idperson, cpf, nome } = dados
            res.json({idperson, nome, cpf, token})
        }else {
           return sendErrorsFromDB(res, err)
        }
    })

}

module.exports = { Login }