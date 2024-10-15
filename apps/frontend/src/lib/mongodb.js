// lib/mongodb.js

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // Store your MongoDB connection URI in environment variables
let client;
let clientPromise;

if (!uri) {
    throw new Error("Please add your MongoDB URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
    // In development mode, create a new MongoClient instance every time
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production mode, reuse the same MongoClient instance across all requests
    client = new MongoClient(uri);
    clientPromise = client.connect();
}

export default clientPromise;
