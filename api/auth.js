var jwt = require('jsonwebtoken');
var User = require('@models').User;
require('dotenv').config();
const bcrypt = require('bcrypt');

exports.postLogin = async function (req, res) {
    let user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
        res.status(401).send({
            success: false,
            msg: 'Authentication failed. User not found.'
        });
    } else if (bcrypt.hashSync(req.body.password, 10) != user.password) {
        res.status(401).send({
            success: false,
            msg: 'Authentication failed. Password is not correct.'
        });
    } else {
        var token = jwt.sign(
            user,
            process.env.SECRET,
            {
                expiresIn: '1d' // expires in 24 hours
            });
        res.status(200).send({
            token: token,
            visited: true,
            user_id: user.id
        });
    }
}
