# Prerequisites :
- Nodejs & npm<br>download from here <code>https://nodejs.org/</code>

<h1>You can skip to step 3 but your bot may run out of memory if everyone is using the database and ocr api that i have provided in example.env already</h1>

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

### 3. Setting up Env Variables
- There is a file named example.env, rename it to .env
- now enter your mongodb url and ocr space api key at their respective positions and let everything else stay as it is
- Save it

# Steps :
#### Fork & Star this repository :D
1. Open Command Prompt in your pc
2. copy paste <code>git clone https://github.com/devansh9999/Whatsapp-bot</code> and hit enter
3. <code>cd Whatsapp-bot</code>
4. <code>npm install</code>
5. <code>npm run gentoken</code>
6. enter a password, this will be your session_key for .env file 
7. Scan the QR code using your whatsapp to link the bot and wait until you see <code>Session has been created</code>
8. Upload session.secure file (generated inside Whatsapp-bot folder) to any github public repo, left click on it in that public repo, <b>right-click</b> on view raw and left click on copy link address. This is your Session_url. Fill the values of Session_url and Session_key in .env file. 
9. <code>npm install forever -g</code>
10. <code>forever start main.js</code>
11. Now you can close the command pompt and the bot should be working fine
