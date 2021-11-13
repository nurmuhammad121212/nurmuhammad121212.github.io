const mongoose = require('mongoose')
const URI = 'mongodb+srv://N-pro:faoEfDdc1PZ6i6ea@cluster0.6u60g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
module.exports = () => {
    try {
        mongoose.connect(URI, {
            useNewUrlParser: true,
        })
        const db = mongoose.connection
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
            console.log('MongoDB connected with global');
        });
        
    } catch (err) {
        throw err;
    }
}