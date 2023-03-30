const { readFileDB } = require("./index");

exports.findAll = async (collection) => {
  try {
    let data = await readFileDB();
    if (!data[collection]) throw new Error("collection is not exsit!");
    return data[collection];
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
