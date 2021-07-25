const userId = require('../controllers/SesssionController/userId')

module.exports = async (req, res, next) => {
    console.log(req.userId)
};