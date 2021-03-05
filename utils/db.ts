const MONGODB_URI = 'mongodb://localhost:27017'
const MONGODB_DB = 'weeklyReport'
import { MongoClient } from 'mongodb'
var jwt = require('jsonwebtoken');

declare global {
    namespace NodeJS {
        interface Global {
            mongo: {
                conn: any,
                promise: any
            }
        }
    }
}

let cached = global.mongo

if (!cached) {
    cached = global.mongo = { conn: null, promise: null }
}

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }

        cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client: { db: (arg0: string) => any }) => {
            return {
                client,
                db: client.db(MONGODB_DB),
            }
        })
    }
    cached.conn = await cached.promise
    return cached.conn
}

export const getUserList = async (page: number, size: number) => {
    const { db } = await connectToDatabase();
    const total = await db.collection("users").countDocuments();
    const limit = size;
    const skip = (page - 1) * limit;
    const users = await db
        .collection("users")
        .find({})
        .sort({ metacritic: -1 })
        .skip(skip)
        .limit(limit)
        .toArray();
    users.map((user: { password: any }) => delete user.password)
    return {
        total: total,
        list: users,
        page: page,
        size: size
    }
}

export const getWeeklyListByUser = async (username: string, page: number, size: number) => {
    const { db } = await connectToDatabase();
    const total = await db.collection("reports").find({ username: username }).count();
    const limit = size;
    const skip = (page - 1) * limit;
    const max_page = Math.ceil(total / size)
    const list = await db
        .collection("reports")
        .find({ username: username })
        .sort({ year: -1, week: -1 })
        .skip(skip)
        .limit(limit)
        .toArray();
    return {
        total,
        list,
        page,
        size,
        max_page
    }
}

export const getWeeklyReport = async (username: string, year: number, week: number) => {
    const { db } = await connectToDatabase();
    const weeklyreport = await db.collection("reports").findOne({ username: username, year: year, week: week })
    return weeklyreport || {}
}

export const updateWeeklyReport = async (username: string, year: number, week: number, text: string) => {
    const { db } = await connectToDatabase();
    const collection = db.collection("reports")
    const filter = { username: username, year: year, week: week }
    const updateDoc = {
        $set: {
            text: text
        }
    }
    const options = {
        upsert: true
    };
    const result = await collection.updateOne(filter, updateDoc, options);
    const { matchedCount, modifiedCount, upsertedCount } = result
    return {
        matchedCount,
        modifiedCount,
        upsertedCount
    }
}

export const getJwt = async (username: string, password: string): Promise<{ err: boolean, token: string }> => {
    let token = ""
    let err = false
    const { db } = await connectToDatabase();
    const user = await db.collection("users").findOne({ username: username });
    if (user && user.password == password) {
        err = false;
        token = jwt.sign({ username: username }, 'codetyphon');
    } else {
        err = true;
    }
    return { err, token }
}

export const canReg = async (username: string): Promise<boolean> => {
    const { db } = await connectToDatabase();
    const user = await db.collection("users").findOne({ username: username });
    if (user) {
        return false
    } else {
        return true
    }
}

export const reg = async (username: string, password: string): Promise<boolean> => {
    const canreg = await canReg(username)
    if (canreg) {
        const { db } = await connectToDatabase();
        const result = await db.collection("users").insertOne({ username: username, password: password });
        if (result.insertedCount == 1) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}