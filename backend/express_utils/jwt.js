const jsonwebtoken = require("jsonwebtoken");
const config = require("./jwt_config");

class Jwt {
    static sign(user) {
        const payload = {
            nickname: user.nickname,
            id: user.user_id
        };

        const result = {
            token: jsonwebtoken.sign(payload, config.secretKey, config.option),
        };

        return result;
    }

    static verify(token) {
        let decoded;
        try {
            decoded = jsonwebtoken.verify(token, config.secretKey);
        } catch (e) {
            if (e.message == "jwt expired")
                return -1;
            else
                return -2;
        }

        return decoded;
    }
}

module.exports = Jwt;