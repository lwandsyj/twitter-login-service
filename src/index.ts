import express from 'express'
import { PORT, TWITTER_KEY, TWITTER_Secret } from '@/config'
import router from '@/router'
import { accessTokenSignature } from './util'
import { HttpsProxyAgent } from 'https-proxy-agent'
import fetch from 'node-fetch'
const app = express()

app.use(router)
app.get("/", async (req, res) => {

    const { oauth_token, oauth_verifier } = req.query
    const consumerKey = TWITTER_KEY
    const consumerSecret = TWITTER_Secret
    const p = {
        apiUrl: "https://api.twitter.com/oauth/access_token",
        consumerKey,
        consumerSecret,
        oauthToken: oauth_token as string,
        oauthVerifier: oauth_verifier as string,
        method: "POST"
    }
    const s = accessTokenSignature(p)
    const proxyAgent = new HttpsProxyAgent("http://127.0.0.1:7890");
    const user = await fetch(`https://api.twitter.com/oauth/access_token`,
        {
            method: "POST",
            agent: proxyAgent,
            headers: {
                Authorization: `OAuth ${s}`
            }
        }
    )
    const responseText1 = await user.text();
    console.log(responseText1)
    res.send("hello world")
})

app.listen(PORT, () => {
    console.log("server start at " + PORT)
})

