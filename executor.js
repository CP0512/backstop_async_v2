const { spawnSync } = require('child_process');
const fs = require('fs');

function executeAndStoreReport(actionFlag="all"){
    // Array of BackstopJS config file names

    const configFiles = fs.readdirSync("./generated");
    const reportFolder = `backstop_report/${configFile.split('.')[0]}`;
    console.log(configFiles);
    // Loop through each config file
    configFiles.forEach((configFile) => {
        // Define the command to execute BackstopJS with the config file
        let command = "";

        if(actionFlag.toLowerCase() === "reference"){
        
            command = `backstop reference --configPath=generated/${configFile}`;
        }
        else if(actionFlag.toLowerCase() === "test"){
            command = `backstop test --configPath=generated/${configFile}`;
        } else if(actionFlag.toLowerCase() === "approve"){
            command = `backstop approve`; 
        }
        else if(actionFlag.toLowerCase() === "all"){
            command = `backstop reference --configPath=generated/${configFile} && backstop test --configPath=generated/${configFile}`;
        }

        // Execute the command as a child process
        if(command !== ""){
        const { stdout, stderr } = spawnSync(command, { shell: true });
    

        // If there was an error, log it to the console
        if (stderr && stderr.toString()) {
            console.log(stderr.toString());
        }
    }

        // Create a folder for the report
        if (!fs.existsSync(reportFolder)){
            fs.mkdirSync(reportFolder);
        }
        
        // Copy the report files and reference files to the report folder
        if(actionFlag.toLowerCase() === "reference"){
            fs.cpSync('backstop_data/bitmaps_reference/', `${reportFolder}/`, {recursive:true});
        }
        if(actionFlag.toLowerCase() === "test"){
            fs.cpSync('backstop_data/bitmaps_test/', `${reportFolder}/`, {recursive:true});
            fs.cpSync('generated')
        }

        if(actionFlag.toLowerCase() === "clean"){
            if(fs.existsSync('backstop_data/bitmaps_reference/')){
            fs.rmSync('backstop_data/bitmaps_reference/', {recursive:true});
            }
            if(fs.existsSync('backstop_data/bitmaps_test/')){
            fs.rmSync('backstop_data/bitmaps_test/', {recursive:true});
            }
        }

        
     });
}

module.exports = {executeAndStoreReport}