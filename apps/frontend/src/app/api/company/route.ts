import { type NextRequest, NextResponse } from 'next/server'
import clientPromise from "@/lib/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const cache = new Map<string, any>();
const options = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  
};

async function handler(req: NextRequest) {
  console.error("Handler started");
  let client: MongoClient | null = null;

  try {
    if (!uri) {
      throw new Error("MongoDB URI is not set in environment variables");
    }

    console.error("Attempting to create MongoDB client");
    client = new MongoClient(uri, options);
    console.error("MongoDB client instance created");

    console.error("Attempting to connect to MongoDB");
    await client.connect();
    console.error("Successfully connected to MongoDB");

    // Extract the company name from the query parameters
    const { searchParams } = new URL(req.url);
    var companyName = searchParams.get("company");
    if (companyName && cache.has(companyName)) {
      return NextResponse.json(cache.get(companyName));
    }
    console.log("request received - ", companyName);
    if (!companyName) {
      companyName = "Unknown company!!";
      return NextResponse.json(
        { error: "Company name is required" },
        { status: 400 }
      );
    }
  
    // Query the MongoDB database
    const db = client.db("cjam"); // Replace with your actual database name
    const collection = db.collection("clients"); // Replace with your actual collection name
  
    // First, try an exact match (case-insensitive)
    let result = await collection.findOne({ company: new RegExp(`^${companyName}$`, 'i') });

    if (!result) {
      // If no exact match, try a partial match
      const regex = new RegExp(companyName.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i');
      result = await collection.findOne({ company: regex });
    }

    if (result) {
      cache.set(companyName, result);
      console.log(`Found matching company: ${result.company}`);
      return NextResponse.json(result);
    } else {
      // If still no result, fetch all companies for debugging
      const allCompanies = await collection.find({}, { projection: { company: 1 } }).toArray();
      console.log('All companies in database:', allCompanies.map(c => c.company));
      
      return NextResponse.json({ 
        error: "Company not found",
        searchedFor: companyName,
        availableCompanies: allCompanies.map(c => c.company)
      }, { status: 404 });
    }
  } catch (error) {
    console.error("Error in MongoDB connection process:");
    console.error(error);
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return NextResponse.json(
      { error: "Internal server error", details: (error as Error).message || 'Unknown error' },
      { status: 500 }
    );
  } finally {
    if (client) {
      console.error("Closing MongoDB connection");
      await client.close();
      console.error("MongoDB connection closed");
    }
    console.error("Handler finished");
  }
}

export const GET = handler
export const runtime = 'nodejs' // 'nodejs' (default) | 'edge'
export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const fetchCache = 'default-no-store'
