// J'importe le module fs pour pouvoir créer le fichier de log et l'éditer
const fs = require('fs')

// Je créer la fonction qui va gérer les erreurs et les logs
function errorHandler(err, req, res, next) {
    console.log('errorHandler') // Pour vérifier que la fonction est bien appelée
    if (err) {
        let date = new Date()
        let dateStr = date.toISOString().slice(0, 10)       // Récupère la date au format ISO (AAAA-MM-JJ)
        let timeStr = date.toLocaleTimeString().slice(0, 8) // Récupère l'heure au format HH:MM:SS
        let log = `${dateStr} ${timeStr} - ${err.stack}\n`  // Création du message de log
        fs.appendFile('error.log', log, function (err) {    // Ecriture du log dans le fichier error.log
            if (err) {
                console.error('Erreur d\'écriture dans error.log')  // si il y a un problème d'écriture dans le fichier error.log
            }
        })
        res.writeHead(500, { 'Content-Type': 'text/html' }) // Envoi d'une réponse HTTP avec un code 500 et un contenu de type HTML
        res.end("<h1>Erreur dans la requete HHTP sur la route : " + req.url + "</h1>" + "<pre>" + err.stack + "</pre>") // res.end met fin à la réponse et envoie un message d'erreur mieux formaté dans le navigateur
    } else next()
}

module.exports = errorHandler   // On oubli pas d'exporter la fonction pour pouvoir l'utiliser dans app.js