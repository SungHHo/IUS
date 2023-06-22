const { MongoClient } = require("mongodb");

class MongoDB {
    static url = process.env.DB_URL;
    
    static client = new MongoClient(this.url, { useNewUrlParser: true, useUnifiedTopology: true });
    static db = null;

    static async connect() {
        try {
            await this.client.connect();
            console.info("Successfully connect to mongo");
            
            this.db = this.client.db("db");
            // const collection = this.db.collection("restaurant");
            

            const collection = this.db.collection("restaurant");

            // const doc = {
            //     name: "낙원순두부",
            //     phone: "012-3456-7890",
            //     address: "대구광역시 북구 유통단지로8길",
            //     comments: [],
            //     img: "https://recipe1.ezmember.co.kr/cache/recipe/2021/03/20/666b1105eefd06eb1f924432cbaf3ecc1.jpg",
            //     x: 35.9071971,
            //     y: 128.610,
            //     star: 0
            // };

            // await collection.insertOne(doc);

            // console.log(await collection.find().toArray());

            // await collection.updateOne({name: "식육식당"}, {$set: {y: 128.6145}})

            // // remove all data
            // await collection.deleteMany({});

            // const result2 = await collection.insertOne(doc);
            // console.log("Inserted at " + result2.insertedId);

            
            // const result3 = await collection.insertOne(doc2);
            // console.log("Inserted at " + result3.insertedId);
            
            // const result = await collection.find({name: "IUS 식당"}).toArray();
            // console.log(result);
            
            // await client.close();
            // console.log("Successfully closed");
        } catch (err) {
            console.error("Error occurred while connecting to mongodb");
            console.log("---------- Error stacks ----------");
            console.log(err);
        }
    }

    static async getData(collectionName, json) {
        try {
            if (!this.db)
                throw "There are not able database server!";
            
            const collection = this.db.collection(collectionName);
            const result = await collection.find(json).toArray();
            return result;
        } catch (err) {
            console.log("---------- Error stacks ----------");
            console.log(err);
        }
    }
    
    static async addData(collectionName, json) {
        if (!this.db)
            throw "There are not able database server!";

        const collection = this.db.collection(collectionName);
        collection.insertOne(json);
    }
};

module.exports = MongoDB;