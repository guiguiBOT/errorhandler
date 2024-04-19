const express = require('express')
const errorHandler = require('./errorhandler')

const app = express()


app.use(function (req, res, next) {
    console.log('middleware 1')
    next()
})

app.get('/', function (req, res) {
    res2.send('Bonjour le monde !') // Erreur volontaire : res2 n'est pas défini
})

app.use(errorHandler)


app.listen(3000, function () {
    console.log('Serveur HTTP démarré sur le port 3000')
})

