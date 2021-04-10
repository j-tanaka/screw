require('date-utils');
const puppeteer = require("puppeteer");
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const touch = require("touch")

class ScreenshotController{
    constructor(options){
        this.options = options;
    }
    
    getCsvList(){
        return this.csvlist;
    }
    
    setCsvList(csvlist){
        this.csvlist = csvlist;
    }
    
    // get screenshots
    async action (){
        const options = this.options;
        const csvlist = this.csvlist;
        const chromeOptions = {
            headless: true,
            defaultViewport: null,
            args: [
                '--no-sandbox',
                '--window-size='+options.width+','+options.height
            ]
        };

        var browser = await puppeteer.launch(chromeOptions);
        var promises = []
        // saveScreenshot Function
        const saveScreenshot = async function (url, filename){
        // append timestamp to filename or create directory following option
            if(options.usetimestamp){
                console.log("HELLO");
                const now = new Date();
                const timestamp = now.toFormat("YYYYMMDDHH24MISS");
                if(options.createdir){
                    filename = filename.replace(".png", "") + "/" + timestamp + ".png"; 
                }else{
                    filename = filename.replace(".png", "") + "_" + timestamp + ".png"; 
                }
            }
        // create directory with filename
            console.log("HELLO");
            fs.mkdirSync(path.dirname(filename), {recursive: true})
        
            const page = await browser.newPage();
            await page.goto(url);
            
            // get digest of the contents
            const html = await page.content();
            const htmlHash = await crypto.createHash('sha256').update(html).digest('hex');
            const hashfile = "/var/tmp/screw/"+ htmlHash.substr(0,2)+"/"+htmlHash.substr(2,2)+ "/" + htmlHash.substr(4);
            
            // save the capture if the message digest doesn't exits
            if(options.forcecapture || !fs.existsSync(hashfile)){
                await page.screenshot({ path: filename });
                fs.mkdirSync(path.dirname(hashfile), {recursive: true})
                touch.touchSync(hashfile);
            }

            await page.close();
            console.log(url + " save as " + filename);
        }
    
        if(options.url){
            promises.push(saveScreenshot(options.url, options.output));
        }else if(csvlist.length > 0){
            for(let index in this.csvlist){
                let csvitem = this.csvlist[index];
                promises.push(saveScreenshot(csvitem[0], csvitem[1]));
                if(promises.length >= this.options.multiple){
                    await Promise.all(promises)
                    .then(() => {
                        promises=[];
                    }).catch(()=>{
                        promises=[];
                        console.log("error!");
                    });
                }
            }
        }

        await Promise.all(promises)
            .then(() => {
            }).catch(()=>{
                console.log("error!");
            });

        await browser.close();
    };
}

module.exports = ScreenshotController;

    


