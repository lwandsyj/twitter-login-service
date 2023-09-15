import { TWITTER_KEY, TWITTER_Secret } from '@/config'
import { requestTokenSignature,accessTokenSignature } from '@/util'
import { HttpsProxyAgent } from 'https-proxy-agent';
import fetch from 'node-fetch'

interface RequestTokenResponse {
    oauth_token: string;
    oauth_token_secret: string;
    oauth_callback_confirmed?: string;
  }
  
  const parseOAuthRequestToken = (responseText: string) =>
    responseText.split("&").reduce((prev, el) => {
      const [key, value] = el.split("=");
      return { ...prev, [key]: value };
    }, {} as RequestTokenResponse);

export const TwitterService = {
    requestToken: async () => {
        const consumerKey = TWITTER_KEY
        const consumerSecret = TWITTER_Secret
        const obtainRequestTokenConfig = {
            apiUrl: "https://api.twitter.com/oauth/request_token",
            callbackUrl: "http://localhost:3000/",
            consumerKey,
            consumerSecret,
            method: "POST"
        };
        const signature = requestTokenSignature(obtainRequestTokenConfig)
        console.log(signature)
        const proxyAgent = new HttpsProxyAgent("http://127.0.0.1:7890");
        try{
             const res = await fetch(`https://api.twitter.com/oauth/request_token`, {
                method:"POST",
                agent: proxyAgent,
                headers: {
                    Authorization: `OAuth ${signature}`
                }
            });
            const responseText = await res.text();
            console.log(responseText)
            const data = parseOAuthRequestToken(responseText)
            return data
            
        }catch(ex){
            console.log("ex",ex)
            return undefined
        }
        
    }
}