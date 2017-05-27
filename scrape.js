
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
    let tmp = {}
    tmp.name = table[0][i]
    tmp.height = table[1][i]
    tmp.width = table[2][i]
    tmp.depth = table[3][i]
    tmp.linear = table[4][i]
    tmp.weight = table[5][i]
    airlines.push(tmp)
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
