const path = require("path");
exports.rootpath = (...paths) => {
  let = fileName = "";
  for (let i = 0; i < paths.length; i++) {
    fileName = path.join(path.resolve(), paths[i]);
  }
  console.log(fileName)
  // return fileName;
};