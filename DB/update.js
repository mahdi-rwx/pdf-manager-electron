const path = require("path");
const fsp = require("fs").promises;
const { readFileDB } = require(".");

exports.updateOne = async (collection, where, update) => {
  try {
    let data = await readFileDB();
    if (!data[collection]) throw new Error("collection is not exsit!");

    const key = Object.keys(where)[0];
    const value = Object.values(where)[0];
    if (!data[collection].some((i) => Object.keys(i).includes(key))) {
      throw new Error("key is not exist!");
    }
    if (!data[collection].some((i) => Object.values(i).includes(value))) {
      throw new Error("value incorrect!");
    }

    let modifyDocument = data[collection].find((i) => i[key] === value);
    modifyDocument = { ...modifyDocument, ...update };
    const changedData = data[collection].map((i) =>
      i.id === modifyDocument.id ? { ...i, ...modifyDocument } : i
    );
    data[collection] = changedData;
    await fsp.writeFile(
      path.join(__dirname, "..", "data.json"),
      JSON.stringify(data)
    );
    console.log("updated data");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
