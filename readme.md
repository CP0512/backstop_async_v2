The custom.js is the main file in which other reference files are called.


The cliParser.js file parses the user input arguments.

The updateBackstop.js file with create a cutom backtop.json file on runtime as per our testing requiremnts depending on the cli parameters given by the QA

The executor.js file is responsible for executing the visusal regression suit using the backtop.json file created in runtime

The resolutions directory will contain multiple JSON files. Each JSON file contains a specific resolution which user can invoke by giving the JSON filename in CLI while running the test suit

The resources directory will contain multiple JSON files. Each JSON file contains a set of URLs and Reference URLs. Every different site will have an independant JSON file. The user can invoke these JSON files by giving the JSON filename in CLI while running the test suit

The generated directory will contain the backstop.json file which is being created in runtime

The references folder contains 2 JSON files: common.json & reference_backstop.json

The common.json file contains the common or static part of the default backstop.json. This data is used to construct the backstop.json file in the runtime along with files in resolutions & resources directories

The reference_backstop.json file is