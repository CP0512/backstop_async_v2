const fs = require('fs');
const path = require('path');
const createBackstopJSON = require("./updateBackstop");
const commonJsonPath = "./references/common.json";

function parseCliAndReturnJson(cliArgResource, cliArgResolutions) {
  const folderPathResources = 'resources';
  const folderPathResolutions = 'resolutions';


  try {
    const resourcesToParse = cliArgResource.split(",");
    const resolutionsToParse = cliArgResolutions.split(",");

    const all_sites = fs.readdirSync(folderPathResources);
    for (const each_site_data of all_sites) {
      const all_sites_urls = [];
      if (resourcesToParse.includes(each_site_data) || cliArgResource.toLowerCase() === "all") {
        const fileData = fs.readFileSync(path.join(folderPathResources, each_site_data));
        const jsonDataResources = JSON.parse(fileData);
        const commonData = fs.readFileSync(commonJsonPath);
        const jsonCommonData = JSON.parse(commonData);
        jsonDataResources.forEach((eachObj) => {
          all_sites_urls.push({ ...eachObj, ...jsonCommonData });
        });
        const all_resolutions = fs.readdirSync(folderPathResolutions);
        for (const each_res_data of all_resolutions) {

          if (resolutionsToParse.includes(each_res_data) || cliArgResolutions.toLowerCase() === "all") {
            let all_res_data = []
            const fileData = fs.readFileSync(path.join(folderPathResolutions, each_res_data));
            const jsonDataResolutions = JSON.parse(fileData);
            if(!(Array.isArray(jsonDataResolutions))){
                all_res_data.push(jsonDataResolutions);
            } else {
              all_res_data = jsonDataResolutions;
            }

            const fileNameToCreate = `${each_site_data.split(".")[0]}_${each_res_data.split(".")[0]}`;
            createBackstopJSON.createBackstopJSON(all_res_data, all_sites_urls, fileNameToCreate);
          }
        }
      }
    }
  } catch (err) {
    throw err;
  }
}

module.exports = { parseCliAndReturnJson };