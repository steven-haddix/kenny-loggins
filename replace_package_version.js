/*
 Replaces / insert version tag into package.json file that was passed into build
 Arg1: version
 */

var fs = require('fs');

//load json file (from args)
var packageFile;
var tagName = process.argv[2];
fs.readFile("package.json", 'utf8', function (error, data) {
    if (error) {
        console.log(error);
        process.exit(-1);
    }
    packageFile = JSON.parse(data);

    //update file to correct release (get from args)
    packageFile.version = tagName.match(/\d+\.\d+\.\d+/)[0];

    //save file
    fs.writeFile("package.json", JSON.stringify(packageFile, null, 2), 'utf8', function () {
        process.exit();
    });

});
