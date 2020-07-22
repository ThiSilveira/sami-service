const patientService = require('../services/PatientService')

class PatientController {

    async getAll(req, res) {
        try {
            const response = await patientService.getAllPatients();
            res.status(201).json(response);
        } catch (error) {
            resp.status(400)
            resp.json({ message: err.message })
        }
    }

    async get(req, res) {
        try {
            const { id } = req.params;
            const response = await patientService.getPatient(id);
            res.status(201).json(response);
        } catch (error) {
            resp.status(400)
            resp.json({ message: err.message })
        }
    }

    async create(req, res) {
        try {
            const response = await patientService.createPatient(req.body);
            res.status(201).json(response);
        } catch (error) {
            resp.status(400)
            resp.json({ message: err.message })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { body } = req;
            const response = await patientService.updatePatient(id, body);
            res.status(201).json(response);
        } catch (error) {
            resp.status(400)
            resp.json({ message: err.message })
        }
    }


    async delete(req, res) {
        try {
            const { id } = req.params
            const response = await patientService.deletePatient(id);
            res.status(201).json(response);
        } catch (error) {
            resp.status(400)
            resp.json({ message: err.message })
        }
    }
}

module.exports = PatientController;