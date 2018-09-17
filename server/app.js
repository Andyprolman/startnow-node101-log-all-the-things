const express = require('express');
const fs = require('fs');
const csv = require('csv')
const app = express();
//var useragent = require('useragent');


app.use((req, res, next) => {
//write your logging code here
   var Agent = req.headers['user-agent'];
   var Time = new Date().toISOString();
   var Method = req.method;
   var Resource = req.url;
   var Version = req.httpVersion;
   var Status = 200;
    
   var log = Agent+','+Time+','+Method+','+Resource+',HTTP/'+Version+','+Status+"\n";
   console.log(log);
   fs.appendFile('./log.csv', log, (error, data) => {
        next();
   });


});


app.get('/', (req, res) => {
// write your code to respond "ok" here
res.send('ok');

});

app.get('/logs', (req, res) => {
// write your code to return a json object containing the log data here


//new array

    var array = [];

//read from log file

    fs.readFile('./log.csv', 'utf8', (error, data) => {
        if (error) {
            throw error;
        }
    

        //loop through lines
        console.log('dat: ', data);
        var lines = data.split("\n");
        
        for(let i=0; i<lines.length; i++){
            console.log()
            var attributes = lines[i].split(",");
            
            var object = {
                'Agent': attributes[0],
                'Time': attributes[1],
                'Method': attributes[2],
                'Resource': attributes[3],
                'Version': attributes[4],
                'Status': attributes[5],
            }

            array.push(object);
            
    
    
            
    
        }

        
        console.log('array: ', array);
        res.json(array);
    });
    
    //console.log("object: ", object);

    
   
});

module.exports = app;
    

















// function csvJSON(csv){
    
    //     var lines = log.split("\n");
      
    //     var result = [];
      
    //     var attributes = lines[0].split(",");
      
    //     for(var i=1;i<lines.length;i++){
      
    //         var obj = {};
    //         var currentline = lines[i].split(",");
      
    //         for(var j=0; j<attributes.length;j++){
    //             obj[headers[j]] = currentline[j];
    //         }
      
    //         result.push(obj);
      
    //     }
        
    //     //return result; //JavaScript object
    //     return JSON.stringify(result); 
    //   }
    
    
    
    
    
    
    
    
    
    
    
    
    
    

