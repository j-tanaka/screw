const commandLineArgs = require('command-line-args');
const puppeteer = require("puppeteer");
const fs = require('fs');
const csv = require('csv-parse/lib/sync');

// command line option definition
const optionDefinitions = [
  {
    name: 'url',
    alias: 'u',
    type: String
  },
  {
    name: 'output',
    alias: 'o',
    type: String,
    defaultValue: "screenshot.png"
  },
  {
    name: "width",
    alias: 'w',
    type: Number,
    defaultValue: 1280
  },
  {
    name: 'height',
    alias: 'h',
    type: Number,
    defaultValue: 800,
  },
  {
    name: 'list',
    alias: 'l',
    type: String,
  },
  {
    name: 'multiple',
    alias: 'm',
    type: Number,
    defaultValue: 10,
  }
  
];
const options = commandLineArgs(optionDefinitions);

// create output directiory
//fs.mkdir();

// read CSV lists
var csvlist = [];
if(options.list && fs.statSync(options.list)){
    let data = fs.readFileSync(options.list);
    csvlist = csv(data);
}


// get screenshots
(async() => {
    const browser = await puppeteer.launch();
    var promises = [];
    
    const saveScreenshot = async function (url, filename){
        const page = await browser.newPage();
        await page.goto(url);
        await page.screenshot({ path: filename });
        await page.close();
        console.log(url + " save as " + filename);
    }
    if(options.url){
        promises.push(saveScreenshot(options.url, options.output));
    }else if(csvlist.length > 0){
        for(let index in csvlist){
            let csvitem = csvlist[index];
            console.log(csvitem);
            promises.push(saveScreenshot(csvitem[0], csvitem[1]));
            if(promises.length >= options.multiple){
                await Promise.all(promises)
                .then(() => {
                    promises=[];
                    console.log("done!");
                }).catch(()=>{
                    promises=[];
                    console.log("error!");
                });
            }
        }
    }

    await Promise.all(promises)
        .then(() => {
            console.log("done all!");
        }).catch(()=>{
            console.log("error all!");
        });
    await browser.close();
})();


