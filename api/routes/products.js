const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename: function(req,file,cb){
        cb(null, Date.now()+ file.originalname);
    }
});

const fileFilter = (req,file,cb) =>{
    //reject file
    if(file.mimetype==='image/jpeg'||file.mimetype==='image/png'){
        cb(null,true);
    }
    else {
        cb(null,false);
    }    
};

const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024*1024*10
    },
    fileFilter: fileFilter
});

const ProductsController = require('../controllers/product');

router.get('/', ProductsController.products_get_all);    

router.post('/', checkAuth, upload.single('productImage'), ProductsController.products_create_product);

router.patch('/:productId',checkAuth, ProductsController.products_update_product);

 router.get('/:productId', ProductsController.products_get_product);

router.delete('/:productId',checkAuth, ProductsController.products_delete_product);

module.exports = router;