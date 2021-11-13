const mongoose = require('mongoose')
const  Schema = mongoose.Schema

const CarSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    price : {
       type: Number,
       required: true

    },
    img : {
        type : String
    },
    phone : {
        type : String
    },
})

module.exports = mongoose.model('Product' , CarSchema )