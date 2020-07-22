const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const PatientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    cpf: {
        type: String,
        required: true,
        trim: true
    },
    rg: {
        type: String,
        required: true,
        trim: true
    },
    birthDay: {
        type: String,
        required: true,
        trim: true
    },
    planType: {
        type: String,
        required: true,
        trim: true
    },
    dependentsNumber: {
        type: String,
        required: false,
        default: "Não"
    }
})

PatientSchema.plugin(timestamp);

module.exports = mongoose.model('Patient', PatientSchema);