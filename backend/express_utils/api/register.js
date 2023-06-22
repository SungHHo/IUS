const express = require("express");
const database = require("../../utils/database");
const crypter = require("../../utils/crypter");

module.exports = {
    route: "register",
    func: async (req, res) => {
        let id = req.body.id;
        let pw = req.body.pw;
        let nickname = req.body.nickname;

        if (!nickname || !id || !pw)
            return res.json({
                failed: true
            });

        let name = await database.addData("accounts", {nickname: id}).toArray();
        if (name.length != 0)
            return res.json({
                failed: true,
                msg: "Already exists nickname"
            });

        // user
        let user = {
            nickname: nickname,
            user_id: id,
            user_pw: crypter(id, pw),
            flavor: 0
        };

        let arr = await database.addData("accounts", {user_id: id}).toArray();
        if (arr.length == 0) {
            await database.addData("accounts", user);
            return res.json({
                success: true,
            });
        } else {
            return res.json({
                failed: true,
                msg: "Already exists id"
            });
        }
    }
};