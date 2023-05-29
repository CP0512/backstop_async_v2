const fs = require('fs');

const backstopReferenceJson = "./references/reference_backstop.json"


function createBackstopJSON(resolutions, resources, nameOfFile){
    // Create a directory if not present already
    if(!fs.existsSync('generated')){
        fs.mkdirSync('generated')
    }
    // Read the JSON file
    const backstopJson = `./generated/${nameOfFile}.json`;
    const jsonString = fs.readFileSync(backstopReferenceJson, 'utf-8');

    // Parse the JSON string to a JavaScript object
    const jsonObject = JSON.parse(jsonString);

    // Replace the values of two fields in the JSON object
    jsonObject.viewports = resolutions;
    jsonObject.scenarios = resources;
    jsonObject.paths.bitmaps_reference = `backstop_data/bitmaps_reference/${nameOfFile}`;
    
    // Convert the modified JavaScript object back to a JSON string
    const modifiedJsonString = JSON.stringify(jsonObject);

    // Write the modified JSON string back to the file
    fs.writeFileSync(backstopJson, modifiedJsonString, 'utf-8');

    console.log(`Sucessfully created the ${nameOfFile}.json`);
}


module.exports = { createBackstopJSON }