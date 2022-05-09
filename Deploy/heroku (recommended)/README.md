# Prerequisites :
- Nodejs & npm<br>download from here <code>https://nodejs.org/</code>

<h1>You can skip the 2 steps below but using the database and ocr api that i have provided in example.env already isn't advised for your privacy purpose</h1>

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

# Steps :
#### Fork & Star this repository :D
1. Open Command Prompt in your pc
2. copy paste <code>git clone https://github.com/devansh9999/Whatsapp-bot</code> and hit enter
3. <code>cd Whatsapp-Bot</code>
4. <code>npm install</code>
5. <code>npm run gentoken</code>
6. choose a password, you have to paste it in <code>SESSION_KEY</code> while deploying it to heroku
7. Scan the QR and wait until you see <code>Session has been created</code>
8. open Whatsapp-bot folder and you'll see a session.secure file, upload it to any of your github public repo
9. click on session.secure once it's uploaded in ur public repo and then right-click on <code>view raw</code> and then copy link address
10. you have to paste it in <code>SESSION_URL</code> while deploying it to heroku
11. go to https://github.com/devansh9999/Whatsapp-bot
12. scroll down and click on <code> deploy to heroku</code>
13. fill the <code>SESSION_KEY</code> & <code>SESSION_URL</code>(compulsory) and the <code>MONGODB_URL</code>(for privacy) everything else is optional and already filled with defaults
14. click on deploy and your bot should be ready to use in a few minutes


#### Setup cron-job to avoid idling:
1. login/signup at [cronjobs](https://console.cron-job.org/login)
2. click create cronjob
3. add your heroku app url in url (something like this : </code>http://mybot.herokuapp.com</code>
4. set execution schedule to every 15 mins
5. click create

## Need Help?:
- <a href="https://t.me/SciBot_Whatsapp" target="_blank"><img src="https://images.macrumors.com/t/yMMf-bY_9Mm9UdPbxEQi7RRhRtg=/1600x/article-new/2017/05/Telegram-app.jpg" alt="Paytm" style="height: 55px !important;width: 120px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
