const { MongoClient, ServerApiVersion } = require('mongodb')

const uri = process.env.MONGODB_URI 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
let db

const connectDb = async () => {
    try {
        await client.connect()
        console.log("success connect to db")
        db = client.db("technical_test")

    } catch (err) {
        return Promise.reject(err)
    }
}


const getDb = () => {
    return db
}

module.exports = {connectDb, getDb}