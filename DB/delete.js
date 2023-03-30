const fsp = require("fs").promises;
const path = require("path");
const { readFileDB } = require(".");

exports.deleteOne = async (collection, where) => {
  try {
    let data = await readFileDB();
    if (!data[collection]) throw new Error("collection is not exsit!");
    if (typeof where !== "object")
      throw new Error(`connditional error -> ${where} in not an object`);

    const key = Object.keys(where)[0];
    const value = Object.values(where)[0];

    if (!data[collection].some((i) => Object.keys(i).includes(key))) {
      throw new Error("key is not exist!");
    }
    if (!data[collection].some((i) => Object.values(i).includes(value))) {
      throw new Error("value incorrect!");
    }

    let filterdCollection = data[collection].filter((i) => i[key] !== value);
    data[collection] = filterdCollection;
    await fsp.writeFile(
      path.join(__dirname, "..", "data.json"),
      JSON.stringify(data)
    );
    console.log("data removed");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
