const jwt = require('jsonwebtoken');

module.exports = (token, secret) => {

    let user = null;

    if (!token || !secret) throw new Error('Have not token or secret');

    jwt.verify(token, secret, (err, decoded) => {
        if(err) throw new Error(err.message);

        user = {
            id: decoded.id,
            name: decoded.name,
        }
    });

    if(!user) throw new Error('Hackers, please go away!');

    return user;
};
