const bcrypt = require('bcrypt')

const salt = bcrypt.genSaltSync()
const passwordHash = bcrypt.hashSync('123', salt)

console.log(passwordHash);
