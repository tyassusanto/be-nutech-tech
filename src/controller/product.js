const modelProduct = require('../models/product')
const commonHelper = require('../common/response') //help response / error controller
const { v4: uuid } = require('uuid');
const createError = require('http-errors');


const getAllProduct = async (req, res, next) => {
    try {
        const [result] = await modelProduct.getAllProduct({})
        res.status(200)
        res.json({
            result
        })
    } catch (error) {
        console.log(error, 'error get')
        res.status(500),
            next({
                status: 500,
                message: 'Internal Server Error'
            })
    }
}

const searchProduct = async (req, res, next) => {
    try {
        const search = req.query.name;
        const sort = req.query.sort || 'product_name';
        const order = req.query.order || 'DESC';
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 15;
        const offset = (page - 1) * limit;

        const resProduct = await modelProduct.searchProduct({
            search,
            sort,
            order,
            offset,
            limit
        })
        const totalCount = await modelProduct.countProduct()
        const [{ total }] = totalCount
        res.status(200)
        commonHelper.response(res, resProduct, 200, null, {
            currentPage: page,
            limitData: limit,
            totalData: total,
            totalPage: Math.ceil(total / limit)
        })
    } catch (error) {
        console.log(error, 'error get')
        res.status(500),
            next({
                status: 500,
                message: 'Internal Server Error'
            })
    }
}

const addProduct = async (req, res, next) => {
    try {
        // console.log(req.body)
        const { product_name, buy_price, sell_price, qty } = req.body;
        const productName = await modelProduct.findProductName(product_name)
        // const fileName = req.file.filename
        if (productName.length > 0) {
            return next(createError(403, 'Nama Produk tidak boleh sama'))
        }
        const data = {
            id: uuid(),
            product_name,
            buy_price,
            sell_price,
            qty,
            // img: `http://${req.get('host')}/file/${fileName}`
        };
        const result = await modelProduct.addProduct(data)
        res.status(200)
        commonHelper.response(res, data, 200, `berhasil tambah ${product_name}`)
    } catch (error) {
        console.log(error, 'error post')
        res.status(500),
            next({
                status: 500,
                message: 'Internal Server Error'
            })
    }
}
const addProductImage = async (req, res, next) => {
    try {
        const id = req.params.id;
        const fileName = req.file.filename
        const img = {
            img: `http://${req.get('host')}/file/${fileName}`
        };
        const result = await modelProduct.addProductImage(img, id)
        res.status(200)
        commonHelper.response(res, img, 200, `berhasil tambah gambar`)
    } catch (error) {
        console.log(error, 'error add')
        res.status(500),
            next({
                status: 500,
                message: 'Internal Server Error'
            })
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { product_name, buy_price, sell_price, qty } = req.body
        const data = {
            product_name,
            buy_price,
            sell_price,
            qty,
        };
        const result = await modelProduct.updateProduct(data, id);
        res.json({
            status: 'Success',
            code: 200,
            data,
            message: `${product_name} berhasil diupdate`
        });
    } catch (error) {
        console.log(error);
        const err = new createError.InternalServerError();
        next(err);
    }
};

const deteleProduct = async (req, res, next) => {
    try {
        const id = req.params.id;

        const result = await modelProduct.deleteProduct(id);
        commonHelper.response(res, result, 200, `Product id : ${id}, Deleted !`)
    } catch (error) {
        console.log(error, 'error post')
        res.status(500),
            next({
                status: 500,
                message: 'Internal Server Error'
            })
    }
};

module.exports = {
    getAllProduct,
    searchProduct,
    addProduct,
    deteleProduct,
    updateProduct,
    addProductImage
}