const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller')

router
    .post('/', usersController.addUser)
    .put('/depositCash/:id', usersController.depositById)
    .put('/updateCredit/:id', usersController.updateCreditById)
    .put('/withdraw/:id', usersController.withdrawById)
    .put('/transfer', usersController.transfer)
    .get('/filteredByCash', usersController.getFilteredByCash)
    .get('/:id', usersController.getUserById)
    .get('/', usersController.getUsers)
    

module.exports = router;
