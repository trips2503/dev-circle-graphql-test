const express = require('express');
const router = express.Router();

router.get('/', (req,res,next) => {
    res.status(200).json({
        message : 'Handling GET requests to /products'
    });
});

router.post('/', (req,res,next) => {
    res.status(201).json({
        message : 'Handling POST requests to /products'
    });
});

router.get('/:productId', (req,res,next) => {
    const id = req.params.productId;
    if (id=='special'){
        res.status(200).json({
            message : 'you got the special id',
            id : id
        });
    }
    else {
        res.status(200).json({
            message : 'you passed different id',
            id : id
        });
    }
    res.status(200).json({
        message : 'Handling GET requests to /products'
    });
});

module.exports = router;