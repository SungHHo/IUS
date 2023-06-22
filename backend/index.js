// Azure backend test code

const express = require("express");
const app = express();
const PORT = process.env.PORT ?? 3030;

const MongoDB = require("./utils/database");

app.use(express.json());
app.use(express.static(__dirname + "/public"));

const api_router = require("./express/router");
app.use("/api/", api_router);

app.listen(PORT, () => {
    console.log("Listeneing at " + PORT);
});

// React routing
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

const connectToDB = async () => {
    await MongoDB.connect();
};
connectToDB();