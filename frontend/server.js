const http = require('http')
const express = require('express')
const app = express()


app.use(express.static('./public'))


http.createServer(app).listen(4000, function() {
    console.log(`Servidor rodando na porta ${this.address().port}`);
    
})