const { spawnSync } = require('child_process');
const fs = require('fs');


function executeAndStoreReport(actionFlag = "all") {
    // Array of BackstopJS config file names
    let configFiles = "";
    if(fs.existsSync('generated')){
      configFiles = fs.readdirSync("./generated");
    } else {
      configFiles = fs.readdirSync("backstop_report");
    }


    console.log(configFiles);
    // Loop through each config file
    configFiles.forEach((configFile) => {
        // Define the command to execute BackstopJS with the config file
        let command = "";
        const reportFolder = `backstop_report/${configFile.split('.')[0]}`;

        if (actionFlag.toLowerCase() === "reference") {

            command = `backstop reference --configPath=generated/${configFile}`;
        }
        else if (actionFlag.toLowerCase() === "test") {
            command = `backstop test --configPath=generated/${configFile}`;
        } else if (actionFlag.toLowerCase() === "approve") {
            command = `backstop approve`;
        } else if (actionFlag.toLowerCase() === "openreport") {
            fs.cpSync(`${reportFolder}/${configFile.split('.')[0]}/`, 'backstop_data/bitmaps_reference/', { recursive: true });
            fs.cpSync(`${reportFolder}/bitmaps_test`, 'backstop_data/bitmaps_test/', { recursive: true });
            command = `backstop openReport`;
        }
        else if (actionFlag.toLowerCase() === "all") {
            command = `backstop reference --configPath=generated/${configFile} && backstop test --configPath=generated/${configFile}`;
        }

        // Execute the command as a child process
        if (command !== "") {
            const { stdout, stderr } = spawnSync(command, { shell: true });


            // If there was an error, log it to the console
            if (stderr && stderr.toString()) {
                console.log(stderr.toString());
            }
        }


        // Create a folder for the report
        if (!fs.existsSync(reportFolder)) {
            fs.mkdirSync(reportFolder);
        }

        // Copy the report files and reference files to the report folder
        if (actionFlag.toLowerCase() === "reference") {
            fs.cpSync('backstop_data/bitmaps_reference/', `${reportFolder}/`, { recursive: true });
        }
        if (actionFlag.toLowerCase() === "test") {
            fs.cpSync('backstop_data/bitmaps_test/', `${reportFolder}/bitmaps_test/`, { recursive: true });
            fs.cpSync('generated/', `backstop_run_script_backup/${new Date(Date.now()).toLocaleDateString().split("/").join("_")}/`, { recursive: true });
        }

        if (actionFlag.toLowerCase() === "clean") {
            if (fs.existsSync('backstop_data/bitmaps_reference/')) {
                fs.rmSync('backstop_data/bitmaps_reference/', { recursive: true });
            }
            if (fs.existsSync('backstop_data/bitmaps_test/')) {
                fs.rmSync('backstop_data/bitmaps_test/', { recursive: true });
            }
            if(fs.existsSync('generated')){
                fs.rmSync('generated/', { recursive: true });
            }
        }


    });
}

module.exports = { executeAndStoreReport }