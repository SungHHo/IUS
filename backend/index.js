require("dotenv").config();

const axios = require("axios");
const express = require("express");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT ?? 3030;

const MongoDB = require("./utils/database");

// while deving
app.use(cors({
    origin: '*', // 모든 출처 허용 옵션. true 를 써도 된다.
}));

app.use(express.json());
app.use(express.static(__dirname + "/public"));

const api_router = require("./express_utils/api");
app.use("/api", api_router);

app.listen(PORT, () => {
    console.info("http://localhost:" + PORT);
    console.log("Listeneing at " + PORT);
});

// React routing
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

const connectToDB = async () => {
    await MongoDB.connect();

    // await MongoDB.updateData("restaurant", {
    //     name: "식육식당"
    // }, {
    //     $push: {
    //         comments: {
    //             user_id: "testuser",
    //             comment: "말도안되게 맛있다"
    //         }
    //     }
    // });
};
connectToDB();


// TODO

