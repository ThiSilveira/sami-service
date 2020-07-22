const errors = require('restify-errors');
const Patient = require('../models/patientModel.js')

class PatientService {
    constructor() { }

    async getAllPatients() {
        try {

            const patients = await Patient.find();
            return patients;
        } catch (err) {
            return new errors.InvalidContentError(err);
        }
    }

    async getPatient(id) {
        try {
            const patient = await Patient.findById(id);

            if (!patient)
                return new errors.ResourceNotFoundError(`Não existe nenhum paciente com o [id] ${id}`);

            return patient;
        } catch (err) {
            return new errors.InternalServerError(`Erro para localizar o paciente do [id] ${id}`);
        }
    }

    async createPatient(body) {
        try {
            const { name, cpf, rg, birthDay, planType, dependentsNumber } = body

            const patient = new Patient({
                name,
                cpf,
                rg,
                birthDay,
                planType,
                dependentsNumber
            })

            const newPatient = await patient.save();
            return newPatient;
        }
        catch (err) {
            return new errors.InternalError(err.message);
        }
    }

    async updatePatient(id, body) {
        try {
            await Patient.findOneAndUpdate({ _id: id }, body, { returnOriginal: true });
            const patient = await Patient.findById(id);

            return patient;
        }
        catch (err) {
            return new errors.ResourceNotFoundError(`Não existe nenhum paciente com o [id] ${id}`);
        }
    }

    async deletePatient(id) {
        try {
            const patient = await Patient.findOneAndRemove({ _id: id });

            if (!patient)
                return new errors.ResourceNotFoundError(`Não existe nenhum paciente com o [id] ${id}`);

            return patient;
        } catch (err) {
            return new errors.ResourceNotFoundError(`Não existe nenhum paciente com o [id] ${id}`);
        }
    }
}

module.exports = PatientService;