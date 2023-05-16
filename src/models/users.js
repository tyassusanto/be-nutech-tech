const connection = require('../config/connection')

const addUser = (insertDataUser) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO users set ?", insertDataUser, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const findUsername = (username) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM users WHERE username = ?`
        connection.query(query, username, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}
const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users `, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

module.exports = {
    addUser,
    findUsername,
    getAllUsers
}