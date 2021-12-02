const fs = require('fs');
const csv = require('csv-parser');

let arr = [];
let horizontalPos = 0;
let depth = 0;
let aim = 0;

fs.createReadStream('command.csv')
    .pipe(csv())
    .on('data', function (data) {
        try {
            arr.push({
                command: data.COMMAND,
                unit: data.UNIT
            });
        }
        catch (err) {
            //error handler
        }
    })
    .on('end', function () {
        // processArrayP1(arr);
        processArrayP2(arr);
    });

function processArrayP1(array) {
    array.forEach(function (obj) {
        switch (obj.command) {
            case ('forward'):
                horizontalPos += parseInt(obj.unit);
                break;
            case ('up'):
                depth -= parseInt(obj.unit)
                break;
            case ('down'):
                depth += parseInt(obj.unit)
                break;
            default:
                break;
        }
    });
    console.log('horizontal: ', horizontalPos)
    console.log('depth: ', depth)
    console.log(depth * horizontalPos)
}
function processArrayP2(array) {
    array.forEach(function (obj) {
        switch (obj.command) {
            case ('forward'):
                horizontalPos += parseInt(obj.unit);
                depth += parseInt(obj.unit) * aim;
                break;
            case ('up'):
                aim -= parseInt(obj.unit)
                break;
            case ('down'):
                aim += parseInt(obj.unit)
                break;
            default:
                break;
        }
    });
    console.log('horizontal: ', horizontalPos)
    console.log('depth: ', depth)
    console.log(depth * horizontalPos)
}