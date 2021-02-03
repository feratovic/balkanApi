const express = require("express");
const axios = require('axios');
const cheerio = require('cheerio');
var cors = require('cors')

const app = express();
app.use(cors());

const url = 'https://vaktija.me/';

app.get("/", function (req, res) {
    axios(url)
        .then(response => {
        const data = [];

        const html = response.data;
        const $ = cheerio.load(html)
        

          var text = $("body").find('#wrapper > #page > #page-bgtop > #page-bgbtm > #sidebar > ul > li:first').text();
          text = text.toString().replace(/\n|\r/g, "");
          text = text.toString().replace(/\t|\r/g, "");

          let ayet = text.toString().split("\"");
          ayet.map((elem, i) => {
              ayet[i] = elem.trim();
          })

          let ajet = {
              id: '1',
              title: ayet[0],
              data: ayet[1],
              link: ayet[2]
          }

          text = $("body").find('#wrapper > #page > #page-bgtop > #page-bgbtm > #sidebar > ul > li:last').text();

          text = text.toString().replace(/\n|\r/g, "");
          text = text.toString().replace(/\t|\r/g, "");
          let hadith = [];
          hadith[0] = text.substr(0, 10);
          let index1 = text.lastIndexOf('(');
          let index2 = text.lastIndexOf('.');
          hadith[1] = text.substr(10, index2-1).trim();
          hadith[2] = text.substr(index1-1, text.length).trim();
        
          let hadis = {
            id: '2',
            title: hadith[0],
            data: hadith[1],
            link: hadith[2]
          }

          data.push({
           ajet,
           hadis,
           
          });

        res.send(data);

  })
  .catch(console.error);

})

const PORT = 5050 || process.env.PORT;

app.listen(PORT, (err, data) => {
    if(err) 
        console.log(err);

    console.log("Started!");
})
