const cliParser = require('./cliParser');
const executor = require('./executor')


async function main() {
    var arguments = process.argv;

    cliParser.parseCliAndReturnJson(arguments[2], arguments[3]);
    
    executor.executeAndStoreReport(arguments[4]);
}

main();










