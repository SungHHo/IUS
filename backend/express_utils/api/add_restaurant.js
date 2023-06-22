const express = require("express");
const database = require("../../utils/database");

module.exports = {
    route: "add_restaurant",
    func: async (req, res) => {

        /*
            data:
            name,
            phone,
            address,
            comments,
            img,
            x,
            y,
            star
        */
        let json = req.body.data;
        json.comments = [];
        json.img = "";
        json.star = 0;
        await database.addData("restaurant", json);
    }
};