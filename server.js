const restify = require('restify')
const mongoose = require('mongoose')
const config = require('./config/configs')

const server = restify.createServer();
server.use(restify.plugins.bodyParser());

server.listen(config.PORT, () => {
    mongoose.connect(config.DB_URI, { useNewUrlParser: true });
})

const db = mongoose.connection;

db.on('error', (err) => console.log(err))

db.once('open', () => {

    require('./routes/patients')(server);
    console.log(`Serviço rodando na porta ${config.PORT}`)
})