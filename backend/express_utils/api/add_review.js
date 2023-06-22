const express = require("express");
const database = require("../../utils/database");

module.exports = {
    route: "add_review",
    func: async (req, res) => {
        
        await database.addData("restaurant", json);
    }
};