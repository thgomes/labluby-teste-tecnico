const User = require('../models/User')

module.exports = async(req, res, next) => {
    const user = await User.findOne({ where: { username: 'thgomes' } })

    if (user === null)
        return res.json('user not found')

    return user;
}