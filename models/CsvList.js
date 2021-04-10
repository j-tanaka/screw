const fs = require('fs');
const csv = require('csv-parse/lib/sync');

class CsvList{
    read(filepath){
        var csvlist = null;
        if(filepath && fs.statSync(filepath)){
            let data = fs.readFileSync(filepath);
            csvlist = csv(data);
        }
        this.csvlist = csvlist;
        return csvlist;
    };
    
    get(){
        return this.csvlist;
    };
    
    set(csvlist){
        this.csvlist = csvlist;
    };
}
