const crypto = require("crypto");
const salt = "u3cgjS3SFWG7JLSUnYQXu7nFFfd03ONikKVOcCwowDFZMBU2xgp2sfwG7N4SmLkpqSaauo/sX0VAfXmEe9oQOEh8++DaKH7umcjZrwkaIZhiYwpYdP0l/i+jz+bhs0BAo3cTmcrN7L04ygGiTWbBbDNb8adayP8cK6pKVa2QFAo=";

module.exports = function(id, password) {
    return crypto
        .createHash("sha512")
        .update(id + password + salt)
        .digest("hex");
};