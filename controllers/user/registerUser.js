const dataBase = require('../../dataBase').getInstance();
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {

    try {
        const User = dataBase.getModel('User');
        const user = req.body;

        if (!user) throw new Error('Body is empty');

        const {name, email, password} = user;

        if (!name || !email || !password) {
            throw new Error('Some user fields are empty');
        }

        const alreadyExist = await User.findOne({
            where: {
                name
            }
        });

        if (alreadyExist) {
            res.json({
                success: false,
                message: 'User is already registered'
            });
            throw new Error('User with this email already exist');
        }

        const saltRounds = 10;

        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                console.log(err);
            } else await User.create({
                name,
                email,
                password: hash
            });
        });

        res.json({
            success: true,
            message: 'User successfully registered'
        });
    } catch (e) {
        res.json({
            success: false,
            message: e.message
        });
    }
};
