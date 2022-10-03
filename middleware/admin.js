function admin(req, res, next) {
    let admin = true;
    if(!admin){
        res.json(createError());
    } else {
        next();
    }
}

const createError=(route, method) => {
    const error = {msg:''}
    if (route && method) {
        error.msg = `Route ${route} and method ${method} not allowed`;
    } else {
        error.msg = `You are not allowed to access this route`;
    }
    return error
}  

module.exports = admin;