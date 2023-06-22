const express = require("express");
const database = require("../../utils/database");
const crypter = require("../../utils/crypter");

const jwt = require("../jwt");

module.exports = {
    route: "login",
    func: async (req, res) => {
        let id = req.body.id;
        let pw = req.body.pw;
        
        if (!id || !pw)
            return res.json({
                failed: true
            });
        
        let user = await database.getData("accounts", {
            user_id: id,
            user_pw: crypter(id, pw)
        });

        if (user.length == 0) {
            return res.json({
                failed: true,
                msg: "NOT EXISTS"
            });
        } else {
            return res.json(jwt.sign(user));
        }
    }
};