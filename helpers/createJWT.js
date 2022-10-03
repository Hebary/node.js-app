const jwt = require ('jsonwebtoken');
 const createJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}
module.exports = createJWT;