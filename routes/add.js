const express = require('express');
const router = express.Router();
const DbProduct = require('../models/Product')
const FileUpload = require('../middleware/fileUpload')

/* GET home page. */
router.get('/add', function (req, res) {
    res.render('add', {
        title: 'Express'
    });
});

router.post('/add', FileUpload.single('img'), async (req, res) => {
    const db = new DbProduct({
        name: req.body.name,
        price: req.body.price,
        phone: req.body.phone,
        img: req.file.filename,
    })
    await db.save()
    res.redirect('/')
})


router.post('/update/:id', async (req, res) => {
    const DbUpdate = {}
    DbUpdate.name = req.body.name,
        DbUpdate.price = req.body.price,
        DbUpdate.phone = req.body.phone
        
    DbProduct.findByIdAndUpdate(req.params.id, DbUpdate, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/')
        }
    })
})


module.exports = router;