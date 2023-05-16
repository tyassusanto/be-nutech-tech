const express = require('express');
const route = express.Router();
const productController = require('../controller/product');
const upload = require('../common/upload')

route.get('/get', productController.searchProduct) // done
route.post('/add', productController.addProduct) // done
route.put('/addimage/:id', upload.single('img'), productController.addProductImage) // done?
route.delete('/delete/:id', productController.deteleProduct) // done
route.put('/update/:id', productController.updateProduct) // done

module.exports = route