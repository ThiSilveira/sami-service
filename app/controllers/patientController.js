// const path = require('path')
const PatientService = require(path.join(__dirname, '../services/patientService.js'))

class PatientController {
    constructor() {
        this.patientService = new PatientService();
    }

    async getAll() {
        try {
            const response = await this.patientService.getAllPatients();
            return response;
        } catch (err) {
            return err;
        }
    }

    async get(id) {
        try {
            const response = await this.patientService.getPatient(id);
            return response;
        } catch (err) {
            return err;
        }
    }

    async create(body) {
        try {
            const response = await this.patientService.createPatient(body);
            return response;
        } catch (err) {
            return err;
        }
    }

    async update(id, body) {
        try {
            const response = await this.patientService.updatePatient(id, body);
            return response;
        } catch (err) {
            return err;
        }
    }

    async delete(id) {
        try {
            const response = await this.patientService.deletePatient(id);
            return response;
        } catch (err) {
            return err;
        }
    }
}

module.exports = PatientController;