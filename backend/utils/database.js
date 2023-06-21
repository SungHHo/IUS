const { MongoClient } = require("mongodb");

class MongoDB {
    static url = "mongodb://rootacc:wWhvL2SzqSnYd3qIZXoqTM1ig5J8lMYhZlBRFddzEyrIJvALQW132oylqJdDvMv2hVb2tIsaKpnbACDblvcr3Q==@rootacc.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@rootacc@";
    
    static client = new MongoClient(this.url, { useNewUrlParser: true, useUnifiedTopology: true });
    static db = null;

    static async connect() {
        try {
            await this.client.connect();
            console.info("Successfully connect to mongo");

            this.db = this.client.db("db");
            // const collection = this.db.collection("restaurant");
            
            // const doc = {
            //     name: "IUS RES",
            //     address: "대구시 머시기 머시기 머시기",
            //     comments: [
            //         {
            //             username: "찬욱",
            //             comment: "존나게 맛없어요 씨발"
            //         },
            //         {
            //             username: "test",
            //             comment: "존나게 맛없어요 씨발123123"
            //         },
            //         {
            //             username: "test2",
            //             comment: "맛있어요"
            //         },
            //         {
            //             username: "test3",
            //             comment: "냄새가 존나 구려요"
            //         }
            //     ],
            //     star: 1,
            //     imgs: []
            // };

            // const doc2 = {
            //     name: "IUS 매장",
            //     address: "대구시 머시기 머시기 머시기",
            //     comments: [
            //         {
            //             username: "찬욱",
            //             comment: "존나게 맛있어요 씨발"
            //         },
            //         {
            //             username: "test",
            //             comment: "존나게 맛없어요 씨발123123"
            //         },
            //         {
            //             username: "test2",
            //             comment: "맛있어요"
            //         },
            //         {
            //             username: "test3",
            //             comment: "냄새가 존나 구려요"
            //         }
            //     ],
            //     star: 1,
            //     imgs: []
            // };
            

            // remove all data
            await collection.deleteMany({});

            const result2 = await collection.insertOne(doc);
            console.log("Inserted at " + result2.insertedId);

            
            const result3 = await collection.insertOne(doc2);
            console.log("Inserted at " + result3.insertedId);
            
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
};

module.exports = MongoDB;