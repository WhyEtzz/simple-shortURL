const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const fs = require("fs")
const puppeteer = require("puppeteer")
var favicon = require('serve-favicon');
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const gaboleh = "+×÷=%_€£¥₩!@#$/^&*()-':;?,"+'"`\|<>{}[]°•○●□■♤♡♧♢☆▪¤《》¡¿'
const files = fs.readFileSync('./any.json')
let json = JSON.parse(files);
const axios = require("axios")
let form = new URLSearchParams()

var today = new Date();

var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

app.use(fileUpload());

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(favicon('views/favicon.png'));

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}



app.get('/', (req, res) => {
res.render('index.ejs');
  console.log("Get Request!")
});
app.get('/ssweb', async(req, res) => {
    if (!req.query.url) return res.status(401).send("need Url Params!")
  
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.goto(req.query.url);
  await page.screenshot({path: './temp/ssweb.png'});

  await browser.close();
res.sendFile(path.resolve("./temp/ssweb.png"))
});
app.get('/igdl', (req, res) => {
  if (!req.query.url) return res.status(401).send("need Url Params!")
const {tes} = require("./igpost.js")
  try {
tes(req.query.url).then(ls => {
  res.send({code: 200, res: ls})
})
  } catch (err) {
    res.status(403).send(err)
  }
});
app.get('/mlbb', (req, res) => {
res.render('ml.ejs');
  console.log("Get Request!")
});
app.get('/fileku', (req, res) => {
res.render('file.ejs');
  console.log("Upload File!")
});
app.post("/fileku", (req, res) => {
  if (!req.files) return res.status(403).send("blok")
res.send(req.files.pile.mimetype)
let file = req.files.pile
    file.mv("file/" + file.name, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
})
app.post('/mlbb', (req, res) => {
if (!req.body.aidi) return res.status(403).send("Need Id")
if (!req.body.server) return res.status(403).send("Need Server")

form.append("voucherPricePoint.id", "12473")
form.append("voucherPricePoint.price", "1680.0")
form.append("voucherPricePoint.variablePrice", "0")
form.append("voucherPricePoint.variablePrice", "0")
form.append("n", date+"-427")
form.append("email", "")
form.append("userVariablePrice", "0")
form.append("order.data.profile", "eyJuYW1lIjoiICIsImRhdGVvZmJpcnRoIjoiIiwiaWRfbm8iOiIifQ==")
form.append("user.userId", req.body.aidi)
form.append("user.zoneId", req.body.server)
form.append("msisdn", "")
form.append("voucherTypeName", "MOBILE_LEGENDS")
form.append("shopLang", "id_ID")
form.append("checkoutId", "782f064f-8d2b-4a32-adad-f178a2048ab7")
form.append("affiliateTrackingId", "")
form.append("impactClickId", "")
form.append("anonymousId", "bf74fb91-255e-44ad-985a-3a47fe400cba")
axios("https://order-sg.codashop.com/initPayment.action", {method: "POST", 
headers: {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36",
    accept: "application/json, text/plain, */*",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "accept-language": "id-ID",
    "x-session-country2name": "ID",
    "x-xsrf-token": ""
},
data: form}).then(({data}) => {
   // console.log(data)
   iw = decodeURIComponent (data.confirmationFields.username)
   console.log(iw) 
    res.render("ml-done.ejs", {
    name: iw
  })
}).catch ((err) => {
  res.status(404).send("user not found")
})
 

});
app.get('/background', (req, res) => {
res.sendFile(path.resolve("./views/bg.jpg"))
  console.log("Get Request (background)!")
});
app.get('/favicon', (req, res) => {
res.sendFile(path.resolve("./views/favicon.png"))
  console.log("Favicon!")
});
app.get('/thedata/:pw', (req, res) => {
const id = req.params.pw

  if (!id || id !== "ichi2003") return res.status(500).send("Just Owner")
  res.send({status:200, database: json})
});

app.get('/tes', (req, res) => {
/*res.render('done.ejs', {
  link: "https://shortURL.tesqreplitt.repl.co/eYQuf"
});
  console.log("Get Request!")*/
  const id = req.body.link

  
  res.send({status:200, database: json.length})
});
app.get('/:Id', (req, res) => {
  const found = json.find(element => element.short == encodeURIComponent(req.params.Id));
  console.log(found)
  if (found.link.includes("http")) {
  res.redirect(found.link)
  } else {
    res.redirect("http://"+found.link)
  }
})

app.get('/upload', (req, res) => {
res.render('index.ejs');
  console.log("Get Request!")
});

app.post('/upload', async (req, res) => {
    try {
      const lr = gaboleh.split("")
      const dec = decodeURIComponent(req.body.custom)
      if (dec.includes(lr)) return res.send({code: 401, wrong: "No Symbol!"})
      if (!req.body.avatar.toLowerCase().includes("http") || !req.body.avatar.includes(".")) return res.send({code: 401, wrong: "HARUS LINK!!!"})
      if (encodeURIComponent(req.body.custom).split("").length > 5) return res.send({code: 400, wrong: "Custom Code Kepanjangan!"})
       const aidit = req.body.custom || makeid(5)
console.log(req.body.avatar)
      const tul = new Date().getDate()
    const aidi = encodeURIComponent(aidit)+tul

for (ai of json) {
  if (ai.short.includes(aidi)) return res.send({status: 400, reason: "The Short Code Has Been Used"})
}
      json.push({link: req.body.avatar, short: aidi})
      // const mek = JSON.stringify(json);
       await fs.writeFileSync('./any.json', JSON.stringify(json), 'utf8')
      
      res.render('done.ejs', {
  link: "https://shortnya.ml/"+aidi
});
    } catch (err) {
        res.status(500).send(err);
    }
});
server.listen(3000, () => {
  console.log('listening on *:3000');
});