const crypto = require("crypto");
const salt = process.env.SALT;

module.exports = function(id, password) {
    return crypto
        .createHash("sha512")
        .update(id + password + salt)
        .digest("hex");
};