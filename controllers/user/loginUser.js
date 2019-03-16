const dataBase = require('../../dataBase').getInstance();
const tokinazer = require('../../helpers/tokinazer');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {

    try {
        const User = dataBase.getModel('User');

        const {name, password} = req.body;

        if (!name || !password) throw new Error('Some user fields are empty');

        const userInDataBase = await User.findOne({
            where: {
                name
            }
        });

        if (!userInDataBase) throw new Error('User with this name does not exist');

        const correctPassword = await new Promise((resolve, reject) => {
            bcrypt.compare(password, userInDataBase.password, (err, result) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                return resolve(result);
            });
        });


        const {id} = userInDataBase.dataValues;
        const accessToken = tokinazer(id, name);

        if (!correctPassword) {
            res.json({
                success: false,
                message: 'Received password is incorrect'
            });
        } else if (correctPassword) {
            res.json({
                success: true,
                message: accessToken
            });
        }

    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        });
    }
};
