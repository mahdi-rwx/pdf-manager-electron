const fsp = require("fs").promises;
const path = require("path");

const { readFileDB } = require(".");

exports.insertOne = async (collection, inserted) => {
  try {
    let data = await readFileDB();
    if (!data[collection]) throw new Error("collection is not exsit!");
    if (typeof inserted !== "object") throw new Error("data is not object!");
    Object.keys(inserted).forEach((i) => {
      if (i === "id") throw new Error("don't must exist key with id name!");
    });

    let id = Math.floor(Math.random() * 10000) + new Date().getTime();
    data[collection].push({
      id,
      ...inserted,
    });
    await fsp.writeFile(
      path.join(__dirname, "..", "data.json"),
      JSON.stringify(data)
    );
    console.log("inserted data");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
