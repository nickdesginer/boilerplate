const express = require('express')
const router = express();
const userController = require("../controller/userController");
const { verifyToken } = require('../../helper/middlewares/jwt');
const { userCreateValidate,userupdateValidate } = require('../../helper/validation');
router.post('', userCreateValidate,
    async (req, res) => {
        try {
            var ctrlResponse = await userController.createUser(req);
            res.send(ctrlResponse)
        } catch (err) {
            res.send(err)
        }
    })

router.get('/', verifyToken,
    async (req, res) => {
        try {
            var ctrlResponse = await userController.getAllUser(req);
            res.send(ctrlResponse)
        } catch (err) {
            res.send(err)
        }
    })


router.get('/:id', verifyToken,
    async (req, res) => {
        try {
            var ctrlResponse = await userController.findById(req);
            res.send(ctrlResponse)
        } catch (err) {
            res.send(err)
        }
    })


router.put('/:id', verifyToken,userupdateValidate,
    async (req, res) => {
        try {
            var ctrlResponse = await userController.UpdateUser(req);
            res.send(ctrlResponse)
        } catch (err) {
            res.send(err)
        }
    })

router.delete('/:id', verifyToken,
    async (req, res) => {
        try {
            var ctrlResponse = await userController.deleteUser(req);
            res.send(ctrlResponse)
        } catch (err) {
            res.send(err)
        }
    })

router.post('/login',
    async (req, res) => {
        try {
            var ctrlResponse = await userController.loginUser(req);
            res.send(ctrlResponse)
        } catch (err) {
            res.send(err)
        }
    })



module.exports = router;