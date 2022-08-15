# Prerequisites :
- Nodejs & npm<br>download from here <code>https://nodejs.org/</code><br>
                                                                      
- Heroku cli<br> download from here <code> https://devcenter.heroku.com/categories/command-line </code>

- Git<br> download from here <code>https://git-scm.com/download/win</code>
<h1>You can skip the 2 steps below but doing that isn't advised for your privacy purpose</h1>

### 1. You need a MongoDB, You can create it for free. Follow these steps 👇
- Open https://cloud.mongodb.com
- Click the Try MongoDB Cloud Now Button
- Now you can Fill the Form or Sign Up with Google
- After Successfully Signed Up Type any Organization Name, Project Name and select any preferred language and click Continue
- You can see a Pricing Page select Free and click Create a Cluster
- Select any datacenter's location and any cloud service provider and click Create Cluster
- Now you will see a cluster is creating
- click Network Access in Sidebar & click Add IP Address
- Now click ALLOW ACCESS FROM ANYWHERE and Confirm that
- Click Database Access in Sidebar & click Add New Database User
- Now in Password Authentication Method type a Username and a Password and click Add User
- Click Clusters in Sidebar & click connect & Select Connect your application
- Now you will see an URL containing mongodb+srv:// Copy that and replace < password > with Your Previously chosen password (If you used any special character in password you have to url encode the password)
- Save this you'll need this soon
### 2. OCR API KEY
- Register on <code>https://ocr.space/ocrapi/freekey</code> for your free ocr api key
- you'll receive an email containing the api key. Save that, you'll need this soon
### 3. REMOVE BACKGROUND API KEY
- Sign up on https://www.remove.bg/dashboard
- inside your dashboard go to <code>Api Keys</code> and press <code> Create new Api Key</code> and copy that api key, you'll need it 

# Steps :
#### Fork & Star this repository :D
1. Go to https://github.com/devansh9999/Whatsapp-bot
2. Scroll down and click on <code> deploy to heroku</code>
3. Give ur bot a name(say mybot) and fill in ur mongodb_url(optional) , ocr_space_api_key(optional) and remove_bg_api_key(mandatory) and press deploy
4. Open your command prompt again and type <code>heroku logs --tail -a mybot</code> (replace mybot with the name u gave to ur bot)
- if this step gives u some error, type <code>heroku login</code> and then try the above step again
5. scan the qr from ur whatsapp inside linked devices and Done !

#### Setup cron-job to avoid idling:
1. login/signup at [cronjobs](https://console.cron-job.org/login)
2. click create cronjob
3. add your heroku app url in url (something like this : </code>http://mybot.herokuapp.com</code>
4. set execution schedule to every 15 mins
5. click create



##### Extra Steps To Receive Updates easily:
1. Login to heroku and click on mybot
2. go to deploy
3. inside deployment methods, click on Github and connect it to ur fork of this repository and press <code>Enable Automatic Deploys</code>
4. now everytime i push an update to my repo, you just need to go to ur fork and press <code>sync fork</code> then <code>Update branch</code>
5. Type <code>heroku logs --tail -a mybot</code> and scan the qr again
6. Thats it, your bot will get all the new features I added


## Need Help?:
- <a href="https://t.me/SciBot_Whatsapp" target="_blank"><img src="https://images.macrumors.com/t/yMMf-bY_9Mm9UdPbxEQi7RRhRtg=/1600x/article-new/2017/05/Telegram-app.jpg" alt="Paytm" style="height: 55px !important;width: 120px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
