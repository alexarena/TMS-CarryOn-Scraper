
const request = require('request')
const fs = require('fs')
const cheerio = require('cheerio')
const tableparser = require('cheerio-tableparser')

let url = 'http://travel-made-simple.com/carry-on-size-chart/'
request(url, (err, res, body)=> {
  const $ = cheerio.load(body)
  tableparser($)
  let table = $(".carryonsize").parsetable(false,false,true)

  let airlines = []
  for(let i=1; i<table[0].length; i++){
    airlines.push({
      name: table[0][i],
      imperial: {
        height: +table[1][i], //Inches
        width:  +table[2][i],
        depth:  +table[3][i],
        linear: +table[4][i],
        weight: +table[5][i] //Pounds
      },
      metric: {
        height: Math.ceil((+table[1][i]*2.54)), //Inches -> Centimeters
        width:  Math.ceil((+table[2][i]*2.54)),
        depth:  Math.ceil((+table[3][i]*2.54)),
        linear: Math.ceil((+table[4][i]*2.54)),
        weight: Math.ceil((+table[5][i]*0.453592)) //Pounds -> Kilo
      }
    })
  }
  writeOut(airlines)
})

function writeOut(file){
  fs.writeFile("./airline_list.json", JSON.stringify(file), (err) => {
      if (err) {
        console.error(err)
      }
      else{
        console.log('airline_list.json created.')
      }
  })
}
