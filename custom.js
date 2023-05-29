const cliParser = require('./cliParser');
const executor = require('./executor')


async function main() {
    var arguments = process.argv;
    if(arguments.length > 3){
        cliParser.parseCliAndReturnJson(arguments[2], arguments[3]);
        executor.executeAndStoreReport(arguments[4]);
    } else {
        executor.executeAndStoreReport(arguments[2]);
    }
}

main();










