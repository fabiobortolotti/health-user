//CommonJS
// const const app = require('express')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`)
})

app.get('/', (req, res) => {
    res.json({mensagem:"olá mundo"})
})

app.get('/users', (req, res)=> {
    res.json({
        nome: "Lucas",
        cpf: "71670220125",
        imc: "32.1",
        registros: [
            {peso: 90, altura: 1.80, imc: 32.1, data: 22/05/2020},
            {peso: 90, altura: 1.80, imc: 29.1, data: 22/05/2020},
            {peso: 90, altura: 1.80, imc: 27.1, data: 22/05/2020}
        ]
    })
})