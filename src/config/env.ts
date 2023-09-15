import dotenv from "dotenv"

dotenv.config()

export const PORT = process.env.port || 3000

export const TWITTER_KEY = process.env.consumerKey || ""

export const TWITTER_Secret = process.env.consumerSecret || ""