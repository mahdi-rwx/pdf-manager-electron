const path = require("path");
const fsp = require("fs").promises;
const fs = require("fs");

const DB_PATH = path.join(__dirname, "..", "data.json");
const isEXistFile = fs.existsSync(DB_PATH);

exports.initializingDB = async () => {
  try {
    if (!isEXistFile) {
      const db = {
        documents: [],
      };
      await fsp.writeFile(DB_PATH, JSON.stringify(db));
      console.log("create file");
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

exports.readFileDB = async () => {
  try {
    let data = await fsp.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
