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

const url1 = 'https://www.islamicfinder.org/islamic-calendar/';

app.get('/hijri', (req, res) => {
  axios(url1)
  .then(response => {
  const data = [];
  
  const html = response.data;
  const $ = cheerio.load(html)
  
  
    var text = $("body").find('.d-flex > #main > #container > #eq-row > #main-column > .large-12 > .row > .large-12 > .card-content > .row > .pad-bottom-sm > span').text();
    text = text.toString();
    text = text.replace(/\n|\r/g, "");
    text = text.replace(/\t|\r/g, "");
    let index = text.indexOf('-');
    text = text.substr(index+1 , text.length);
    data.push({
     text,
    });
  
  res.send(data);
  
})
.catch(console.error);
})


app.get('/date', (req, res) => { 
   
  const data = [];

  /*var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + '/' + mm + '/' + yyyy;
    //02/04/2021*/
  let dates = [
    {
    date: '18/02/2021',
    data: 'Lejletur-Regaib' 
    },
    {
      date: '27/02/2021',
      data: 'Pun Mjesec' 
    },
    {
      date: '01/03/2021',
      data: 'Redžeb  1442.' 
    },
    {
      date: '10/03/2021',
      data: 'Lejletu-l-Mi\'radž' 
    },
    {
      date: '14/03/2021',
      data: 'Ša\'ban 1442.' 
    },
    {
      date: '27/03/2021',
      data: 'Lejletu-l-berat' 
    },
    {
      date: '28/03/2021',
      data: 'Pun Mjesec' 
    },
    {
      date: '13/04/2021',
      data: 'Ramazan 1442.' 
    },
    {
      date: '27/04/2021',
      data: 'Pun Mjesec' 
    },
    {
      date: '28/04/2021',
      data: 'Lejletu-Bedr' 
    },
    {
      date: '02/05/2021',
      data: 'Ulazak u i\'tikaf' 
    },
    {
      date: '08/05/2021',
      data: 'Lejletu-l-kadr' 
    },
    {
      date: '13/05/2021',
      data: 'Bajram / Ševal 1442.' 
    },
    {
      date: '14/05/2021',
      data: 'Bajram' 
    },
    {
      date: '15/05/2021',
      data: 'Bajram' 
    },
    {
      date: '26/05/2021',
      data: 'Pun Mjesec' 
    },
    {
      date: '11/06/2021',
      data: 'Zu-l-kade 1442.' 
    },
    {
      date: '26/06/2021',
      data: 'Pun Mjesec' 
    },
    {
      date: '11/07/2021',
      data: 'Zu-l-hidže 1442.' 
    },
    {
      date: '19/07/2021',
      data: 'Dan Arefata' 
    },
    {
      date: '20/07/2021',
      data: 'Kurban-bajram' 
    },
    {
      date: '21/07/2021',
      data: 'Kurban-bajram' 
    },
    {
      date: '22/07/2021',
      data: 'Kurban-bajram' 
    },
    {
      date: '24/07/2021',
      data: 'Pun Mjesec' 
    },
    {
      date: '09/08/2021',
      data: 'Muharrem 1443.' 
    },
    {
      date: '18/08/2021',
      data: 'Jevmu-ašura' 
    },
    {
      date: '22/08/2021',
      data: 'Pun Mjesec' 
    },
    {
      date: '08/09/2021',
      data: 'Safer 1443.' 
    },
    {
      date: '20/09/2021',
      data: 'Pun Mjesec' 
    },
    {
      date: '07/10/2021',
      data: 'Rebiu-l-evvel 1443.' 
    },
    {
      date: '20/10/2021',
      data: 'Pun Mjesec' 
    },
    {
      date: '06/11/2021',
      data: 'Rebiu-l-ahir 1443.' 
    },
    {
      date: '19/11/2021',
      data: 'Pun Mjesec' 
    },
    {
      date: '05/12/2021',
      data: 'Džumade-l-ula 1443.' 
    },
    {
      date: '19/12/2021',
      data: 'Pun Mjesec' 
    },
  ]
  data.push({
    dates,
  })

  res.send(data);

});

const PORT =  process.env.PORT ||  5050 ;

app.listen(PORT, (err, data) => {
    if(err) 
        console.log(err);

    console.log("Started!");
})
