const errors = require('restify-errors');
const patientController = require('../app/controllers/PatientController')

module.exports = server => {

    // Buscar lista de pacientes
    server.get('/patients', async (req, res, next) => {
        try {
            const customers = await patientController.getAll();
            res.send(customers);
            next();
        } catch (err) {
            return next(new errors.InvalidContentError(err));
        }
    });

    // Buscar paciente
    server.get('/patients/:id', async (req, res, next) => {
        try {
            const customer = await patientController.get(req.params.id);
            res.send(customer);
            next();
        } catch (err) {
            return next(new errors.ResourceNotFoundError(`Não existe nenhum paciente com o id [${req.params.id}]`));
        }
    });

    // Adicionar paciente
    server.post('/patients', async (req, res, next) => {

        //Valida o body
        if (!req.is('application/json')) {
            return next(new errors.InvalidContentError("'application/json' esperado"))
        }

        try {
            const newPatient = await patientController.create(req.body);
            res.send(201);
            next();
        }
        catch (err) {
            return next(new errors.InternalError(err.message));
        }
    });

    //Atualizar patiente
    server.put('/patients/:id', async (req, res, next) => {

        //Valida o body
        if (!req.is('application/json')) {
            return next(new errors.InvalidContentError("'application/json' esperado"))
        }

        try {
            const patient = await patientController.update(req.params.id, req.body);
            res.send(200);
            next();
        }
        catch (err) {
            return next(new errors.ResourceNotFoundError(`Não existe nenhum paciente com o id [${req.params.id}]`));
        }
    });

    //Deleta paciente
    server.del('/patients/:id', async (req, res, next) => {
        try {
            const customer = await patientController.delete(req.params.id);
            res.send(204);
            next();
        } catch (err) {
            return next(new errors.ResourceNotFoundError(`Não existe nenhum paciente com o id [${req.params.id}]`));
        }
    })
}