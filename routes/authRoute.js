const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Bienvenue dans votre api d\'authentification');
});
router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;