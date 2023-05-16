const {v4:uuid} = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const commonHelper = require('../common/response')

const modelUsers = require('../models/users')


const addUser = async (req, res, next) => {
    try {
        const {username, name, password} = req.body;
        const userUsername = await modelUsers.findUsername(username)
        if(userUsername.length > 0){
            return next(createError(403, 'username sudah terdaftar'))
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const insertDataUser = {
            id : uuid(),
            username,
            name,
            password : hashPassword 
        }
        const resultAddUser = await modelUsers.addUser(insertDataUser)
        res.status(200)
        commonHelper.response(res, resultAddUser, 200, 'berhasil add user')
    } catch (error) {
        console.log(error)
        res.status(500),
        next({
            status : 500,
            message : 'Internal Server Error'
        })
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const result = await modelUsers.getAllUsers({})
        res.status(200)
        res.json({
            result
        })
    } catch (error) {
        console.log(error,'error get')
        res.status(500),
            next({
                status: 500,
                message: 'Internal Server Error'
            })
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const [user] = await modelUsers.findUsername(username)
        if (!user) return next(createError(403, 'Username or Password Incorect'))
        const hashedPassword = await bcrypt.compare(password, user.password)
        if (!hashedPassword) return next(createError(403, 'Incorect Username or Password'))
        const secretKey = 'kmzway87aa'
        const payload = {
            username: user.username,
            name: user.name,
        }
        const verifToken = {
            expiresIn: '1 day'
        }
        const token = jwt.sign(payload, secretKey, verifToken)
        user.token = token
        const result = {
            id: user.id,
            username: user.username,
            name: user.name,
            token
        }
        res.json({
            code: 200,
            data: result
        })

    } catch (error) {
        res.status(500)
    }
}

module.exports = {
    addUser,
    getAllUsers,
    loginUser,
    addUser
}