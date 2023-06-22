const jwtConfig = require("./jwt_config");
const jwt = require("./jwt");

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token)
        return res.json({
            msg: "BAD REQUEST",
            failed: true
        });

    const user = jwt.verify(token);

    if (user == -1) // EXPIRED
        return res.json({
            msg: "EXPIRED",
            failed: true
        });

    if (user == -2) // INVALID TOKEN
        return res.json({
            msg: "BAD REQUEST",
            failed: true
        });

    if (!user.id) // NOT FOUND AT PAYLOAD
        return res.json({
            msg: "BAD REQUEST",
            failed: true
        });

    req.user = user;
    next();
};