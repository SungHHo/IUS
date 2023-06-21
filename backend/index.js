// Azure backend test code

const express = require("express");
const app = express();
const PORT = process.env.PORT ?? 3030;

const MongoDB = require("./utils/database");

app.listen(PORT, () => {
    console.info("http://localhost:" + PORT + "?test=admin");
    console.log("Listeneing at " + PORT);
});

app.get("/", (req, res) => {
    const test = req.query.test;

    return res.send(`<h1>Hello ${test}!</h1>`);
});

const connectToDB = async () => {
    await MongoDB.connect();
    // console.log(await MongoDB.getData("restaurant", {name: "IUS 식당"}));
};
connectToDB();