const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');


router.route('/list').get(async (req, res) => {
    try {
        const response = await userController.list(req);
        res.json(response);
    } catch(err) {
        console.error(`List users: Error retrieving users = `, err);
    }
});

router.route('/create').post(async (req, res) => {
    try {
        const response = await userController.create(req);
        res.json(response);
    } catch (err) {
        console.error(`\n\nError creating user = `, err);
    }
});


module.exports = router;
