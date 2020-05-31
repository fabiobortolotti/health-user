//CommonJS
// const express = require('express')
// const app = express()

const app = require('express')()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const cors = require('cors')


var corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200
  }

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.listen(port, () => {
    console.log(`Server running in port ${port}`);
})

app.get('/', (req, res) => {
    res.json({mensagem: "Olá Mundo"})
})

require('./src/routers/PessoaRouter')(app)
require('./src/routers/RegistroRouter')(app)
