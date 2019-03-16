const dataBase = require('../../dataBase').getInstance();
const tokenVeryficator = require('../../helpers/tokenVeryficator');
const secret = require('../../config/secret');

module.exports = async (req, res) => {

    try {
        const User = dataBase.getModel('User');

        const token = req.get('Authorization');

        if (!token) throw new Error('No token!');

        const {id} = tokenVeryficator(token, secret);
        const isUserRegistered = await User.findByPk(id);

        if(!isUserRegistered) throw new Error('This user does no registered');

        const user = {
            id,
            name: isUserRegistered.name,
        };

        res.json({
            success: true,
            message: user
        });
    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        });
    }
};
