const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', (req, res) => {
    // affiche sous format json
    res.json({
        message: 'Bienvenue sur votre API d\'authentification',
    });
});
router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;