const express = require("express");
const database = require("../../utils/database");

module.exports = {
    route: "add_review",
    func: async (req, res) => {
        const user = req.user;

        const name = req.body.name;
        const address = req.body.address;
        const content = req.body.content;

        if (!name || !address || !content)
            return res.json({
                failed: true,
                msg: "BAD REQUEST"
            });

        await MongoDB.updateData("restaurant", {
            name: name,
            address: address
        }, {
            $push: {
                comments: {
                    user_id: user.id,
                    comment: content
                }
            }
        });
        
        return res.json({
            success: true
        });
    }
};