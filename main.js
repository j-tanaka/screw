const ScreenshotController = require("./controllers/ScreenshotController.js");
const CsvList = require("./models/CsvList.js");
const commandLineArgs = require("command-line-args");
const optionDefinitions = require("./models/OptionDefinitions.js");


const options = commandLineArgs(optionDefinitions);

    const controller = new ScreenshotController(options);

    (async () => {
        if(options.list){
            const csvlist = new CsvList(); 
            const csv = csvlist.read(options.list);  
        }
        await controller.action();
        console.log("DONE");        
    })();







