import mongoose from "mongoose";
import "dotenv/config";

const DB = process.env.DATABASE.replace(
    "<password>",
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB);

const db = mongoose.connection;

export default db;
