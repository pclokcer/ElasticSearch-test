
const mongoose = require('mongoose')
const elasticClient = require('./elasticClient')
const elasticIndex = require('./elasticIndex')
const elasticMap = require('./elasticMap')
const elasticDocumant = require('./elasticDocumant')
const elasticSearch = require('./elasticSearch')
const chat = require('./data')

mongoose.connect('mongodb://localhost:27017/helorobo_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => {
  console.log('Mongo Bağlandı')


  elasticClient.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: 1000
  }, async function (error) {
    if (error) {
      console.trace('elasticsearch cluster is down!');
    } else {
      console.log('All is well');


      try {
        const index = await elasticIndex('oyunlar')
        console.log('index ', index)

        const mapping = {
          properties: {
            name: {
              type: "text"
            },
            title: {
              type: "text"
            }

          }
        }

        const map = await elasticMap('oyunlar', "savas", mapping)

        const mongoData = [
          {
            "name": "Erdem ÜN",
            "title": "Bay"
          },
          {
            "name": "Büşra OKUR",
            "title": "Bayan"
          }
        ]
        
        const data = await chat.find()
        
        
        for (let index = 0; index < mongoData.length; index++) {
          console.log(mongoData[index])
          await elasticDocumant('oyunlar', 3 + index, 'savas', mongoData[index])
        }


        const body = {
          query: {
            match_phrase_prefix: {
              "name": "Erdem ÜN"
            }
          }
        }
        const resSearch = await elasticSearch('oyunlar', 'savas', body);
        console.log(resSearch.hits.hits)

      } catch (e) {
        console.log(e)
      }

    }
  });

})


