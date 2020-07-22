const restify = require('restify')
const mongoose = require('mongoose')
const config = require('./config/configs')
const cors = require('cors')
const routes = require('./app/routes/router')

const server = restify.createServer();
server.use(restify.plugins.bodyParser());
server.use(cors())

routes.register(server);

server.listen(config.PORT, () => {
    mongoose.connect(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
})

const db = mongoose.connection;

db.on('error', (err) => console.log(err))

db.once('open', () => {
    console.log(`Serviço rodando na porta ${config.PORT}`)
})