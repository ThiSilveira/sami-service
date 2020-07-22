const errors = require('restify-errors');
const Patient = require('../models/patientModel.js')

class PatientService {
    constructor() { }

    messageSuccess(message) {
        return {
            "code": "Success",
            "message": message
        };
    }

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

            // Verifica se o CPF já está cadastrado
            const patientCPF = await Patient.findOne({ cpf: cpf });

            if (patientCPF) {
                return new errors.ResourceNotFoundError(`Já existe um paciente com o [CPF] ${cpf}`);
            }

            // Verifica se o RG já está cadastrado
            const patientRG = await Patient.findOne({ rg: rg });

            if (patientRG) {
                return new errors.ResourceNotFoundError(`Já existe um paciente com o [RG] ${rg}`);
            }

            await patient.save();

            return this.messageSuccess("Paciente criado com sucesso");
        }
        catch (err) {
            return new errors.InternalError(err.message);
        }
    }

    async updatePatient(id, body) {
        try {
            await Patient.findOneAndUpdate({ _id: id }, body, { returnOriginal: true });
            return this.messageSuccess("Paciente atualizado com sucesso");
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

            return this.messageSuccess("Paciente excluído com sucesso");

        } catch (err) {
            return new errors.ResourceNotFoundError(`Não existe nenhum paciente com o [id] ${id}`);
        }
    }
}

module.exports = PatientService;