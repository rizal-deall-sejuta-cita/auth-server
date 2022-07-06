const router = require('express').Router()
const Controller = require('../controllers/userController');
const { errorHander } = require('../middlewares/errorHandler');

router.post('/login', Controller.login)
router.get('/verify', Controller.verifyAccessToken)

router.use(errorHander)

module.exports = router