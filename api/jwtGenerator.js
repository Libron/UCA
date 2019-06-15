const jwt = require('jsonwebtoken');

const jwtgen = {
    generate: (APIKey, APISec) => {
        const payload = {
            iss: APIKey,
            exp: ((new Date()).getTime() + 5000)
        };
        return jwt.sign(payload, APISec);
    }
};

module.exports = jwtgen;