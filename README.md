# twitter-login-service
express typescript

# twitter 登录流程

1. 请求auth_token, 

   https://api.twitter.com/oauth/request_token

   这里会交易传入的callback 和 应用中设置的callback 是否一致

2. token 请求会以后跳转twitter 登录页面

   https://api.twitter.com/oauth/authorize?oauth_token=${data.oauth_token}

3. 登录以后会自动跳转到应用里面设置的callback

   http://localhost:3000/?oauth_token=***oFrQA********AABipdkTms&oauth_verifier=dR6VpPH8k1******OcaLKf6f0

4. 使用oauth_token 和 oauth_verifier 请求access_token

   https://api.twitter.com/oauth/access_token

   返回

   oauth_token=xxxxx&oauth_token_secret=xxxxxx&user_id=170xxxxx017664&screen_name=***name***