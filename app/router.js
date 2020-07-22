const path = require('path')
const errors = require('restify-errors');
const PatientController = require(path.join(__dirname, './controllers/PatientController'))
 
module.exports.register = server => {

    const patientController = new PatientController();

    // Buscar lista de pacientes
    server.get('/patients', async (req, res, next) => {
        try {
            const patients = await patientController.getAll();
            res.send(patients);
            next();
        } catch (err) {
            return next(new errors.InvalidContentError(err));
        }
    });

    // Buscar paciente
    server.get('/patients/:id', async (req, res, next) => {
        try {
            const patient = await patientController.get(req.params.id);
            res.send(patient);
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
            res.send(newPatient);
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
            res.send(patient);
            next();
        }
        catch (err) {
            return next(new errors.ResourceNotFoundError(`Não existe nenhum paciente com o id [${req.params.id}]`));
        }
    });

    //Deleta paciente
    server.del('/patients/:id', async (req, res, next) => {
        try {
            const patient = await patientController.delete(req.params.id);
            res.send(patient);
            next();
        } catch (err) {
            return next(new errors.ResourceNotFoundError(`Não existe nenhum paciente com o id [${req.params.id}]`));
        }
    })
}