const jwt = require('jsonwebtoken');
const {User, validate} = require('../models/user.js');
const privateKey = process.env.PRIVATE_KEY;

const auth = async(req, res, next) => {
        const {token} = req.cookies;
        !token && res.status(401).send({message: 'Access denied'});
        try {
            const verified = await jwt.verify(token, process.env.PRIVATE_KEY);
            const user = await User.findOne({_id: verified.id});
            user && next();
        } catch(err) {
            res.status(400).send({message: 'Invalid token :('});
        }
}

module.exports = auth;