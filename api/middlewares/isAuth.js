const jwt = require('express-jwt');
const config = require('../../config');
/**
 * We are assuming that the JWT will come in a header with the form
 *
 * Authorization: Bearer ${JWT}
 *
 * But it could come in a query parameter with the name that you want like
 * GET https://api.domain.com/stats?apiKey=${JWT}
 * Luckily this API follow _common sense_ ergo a _good design_ and don't allow that ugly stuff
 */
const getTokenFromHeader = req => {
    if (
        (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
        (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
    ) {
        return req.headers.authorization.split(' ')[1];
    } 
    return null;
}

const isAuth=jwt({
    secret:config.jwtSecret, //The _secret_ to sign the JWTs
    algorithms: [config.jwtAlgorithm], //JWT Algorithm
    userProperty:'token', //Use req.token to store the JWT
    getToken:getTokenFromHeader //How to extract the JWT from the request
})
module.exports=isAuth;
