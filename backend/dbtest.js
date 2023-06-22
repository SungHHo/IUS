require("dotenv").config();

const MongoDB = require("./utils/database");

const run = async () => {
    await MongoDB.connect();
    console.log("Successfully connected");
    await MongoDB.updateData("restaurant",
    {name: "식육식당"}, {$push: {
        "comments": {
            user_id: "haesol",
            comment: "씨발 맛이없어요"
        }
    }})
};

run();