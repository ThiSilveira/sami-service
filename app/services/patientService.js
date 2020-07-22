const errors = require('restify-errors');
const Patient = require('../models/PatientModel')

class PatientService {

    async getAllPatients(req, res) {
        try {
            const customers = await Patient.find({});
            res.send(customers);
            next();
        } catch (err) {
            return next(new errors.InvalidContentError(err));
        }
    }

    async getPatient(req, res) {
        try {
            const customer = await Patient.findById(req.params.id);
            res.send(customer);
            next();
        } catch (err) {
            return next(new errors.ResourceNotFoundError(`Não existe nenhum paciente com o id [${req.params.id}]`));
        }
    }

    async createPatient(req, res) {

        const { name, cpf, rg, birthDay, planType, dependentsNumber } = req.body

        const patient = new Patient({
            name,
            cpf,
            rg,
            birthDay,
            planType,
            dependentsNumber
        })

        try {
            const newPatient = await patient.save();
            res.send(201);
            next(newPatient);
        }
        catch (err) {
            return next(new errors.InternalError(err.message));
        }
    }

    async updatePatient(req, res) {
        //Valida o body
        if (!req.is('application/json')) {
            return next(new errors.InvalidContentError("'application/json' esperado"))
        }

        try {
            const patient = await Patient.findOneAndUpdate({ _id: req.params.id }, req.body);
            res.send(200);
            next();
        }
        catch (err) {
            return next(new errors.ResourceNotFoundError(`Não existe nenhum paciente com o id [${req.params.id}]`));
        }
    }

    async deletePatient(req, res) {
        try {
            const customer = await Patient.findOneAndRemove({ _id: req.params.id });
            res.send(204);
            next();
        } catch (err) {
            return next(new errors.ResourceNotFoundError(`Não existe nenhum paciente com o id [${req.params.id}]`));
        }
    }
}

module.exports = PatientService;