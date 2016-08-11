//logger utility module
//----------------------------------------------------------------------
//use file system
var Fs = require("fs");
var Path = "./logs/logfile.log";
//date time functionality
var Datetime = new Date();
//log levels
var Levels = [
    { level: 0, type: "information", color: "blue" },
    { level: 1, type: "warning", color: "yellow" },
    { level: 2, type: "error", color: "red" }
];
//console colors
var Colors = require('colors');

//check for log file existance, if not exists, initialize it with date
Fs.stat(Path, function (err, stat) {
    if (err == null) {
        console.log('The log file already exists');
    } else {
        //create log file with date and time
        Fs.writeFile(Path, "Log file Initialized on " + Datetime,
            function (erro) {
                if (erro) {
                    return console.log(erro);
                }
                return console.log("The log file was created");
            }
        );
    }
});

module.exports = {
    debug: function(message, level) { 
        if (global.DEBUG === true) {
            //log to console and write to file
            //display message on console in color
            switch (Levels[level].color) {
                case "blue":
                    console.log(message.blue);
                    break;
                case "yellow":
                    console.log(message.yellow);
                    break;
                case "red": 
                    console.log(message.red);
                    break;
                default:
                    console.log(message.blue);
            }
            
            Fs.appendFile(Path, "\n - " + "at: " + Datetime.toLocaleTimeString() + " " + Levels[level].type + "(" + Levels[level].color + "): " + message, function (err) {
                if (err) {
                    console.log("Error appending to log: " + err);//if error appending, log to console
                }          
            });
        } 
    }
};

//usage
//Logger.debug("info message", 0);
//Logger.debug("warning message", 1);
//Logger.debug("error message", 2);

//additional notes:
//another way to write a file, if file does not exist, it will create it
//var buffer = new Buffer("\n some content \n");
//Fs.open(Path, 'w+', function (err, fd) {
//    if (err) {
//        console.log('error opening file: ' + err);
//    } else {
//        Fs.write(fd, buffer, 0, buffer.length, null, function (err) {
//            if (err) throw 'error writing file: ' + err;
//            Fs.close(fd,
//                function() {
//                    console.log('file written');
//                });
//        });
//    } 
//});