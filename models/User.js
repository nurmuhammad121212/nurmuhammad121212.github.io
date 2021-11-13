const mongoose = require('mongoose')
const schema = mongoose.Schema

const DbCreate = new schema({
    your_name: {
        type: String
    },
    login: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    phone: {
        type: Number
    },
})

module.exports = mongoose.model('Create_User', DbCreate)