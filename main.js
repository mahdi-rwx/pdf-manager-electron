const path = require("path");
const fs = require("fs");

const { app, BrowserWindow, ipcMain } = require("electron");
const { initializingDB } = require("./DB");
const { insertOne } = require("./DB/create");
const { findAll } = require("./DB/read");
const { updateOne } = require("./DB/update");
const { deleteOne } = require("./DB/delete");

let mainWindow;

app.on("ready", async () => {
  await initializingDB();
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile(path.join(path.resolve(), "screens", "index.html"));

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// switch to new file page
ipcMain.on("screen:new-file", () => {
  mainWindow.loadFile(path.join(path.resolve(), "screens", "new-file.html"));
});

/*
load home page
    send data
load home page 
*/
ipcMain.on("loaded", async (e, args) => {
  e.reply("data:get-documents", await findAll("documents"));
});

// insert data

ipcMain.on("data:insert-document", async (e, args) => {
  const { data, pdf, image } = args;

  await insertOne("documents", data);
  mainWindow.loadFile(path.join(path.resolve(), "screens", "index.html"));
  // copy image
  fs.copyFile(image.path, path.join(__dirname, "images", image.name), (err) => {
    if (err) console.log(err);
  });
  // copy pdf
  fs.copyFile(pdf.path, path.join(__dirname, "files", pdf.name), (err) => {
    if (err) console.log(err);
  });
});
