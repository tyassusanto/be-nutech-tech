const connection = require('../config/connection')

const getAllProduct = () => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM product `, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const findProductName = (product_name) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM product WHERE product_name = ?`
        // console.log(query)
        connection.query(query, product_name, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const searchProduct = ({ search, sort, order, limit, offset }) => {
    return new Promise((resolve, reject) => {
        const querySearch = ` WHERE product_name LIKE '%${search}%'`;
        const query = `SELECT * FROM product ${search ? querySearch : ''} ORDER BY ${sort} ${order} LIMIT ${limit} OFFSET ${offset};`
        connection.query(query, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        })
    })
}

const countProduct = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT COUNT(*) AS total FROM product', (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};

const addProduct = (data) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO product set ?'
        connection.query(query, data, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};
const addProductImage = (img, id) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE product SET ? WHERE id = ?'
        console.log(query)
        connection.query(query, [img, id], (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};

const updateProduct = (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE product SET ? WHERE id = ?', [data, id], (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  };

const deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM product WHERE id = ?', id, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  };

module.exports = {
    getAllProduct,
    searchProduct,
    countProduct,
    addProduct,
    deleteProduct,
    findProductName,
    updateProduct,
    addProductImage
}