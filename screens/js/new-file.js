const { ipcRenderer } = require("electron");

const formNewDocument = document.querySelector(".form-new-document");

formNewDocument.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = {};

  let filePdf = {};
  let fileImage = {};

  const data = new FormData(formNewDocument);
  for (const [name, value] of data) {
    if (name !== "pdf-file" && name !== "image-file") {
      formData[name] = value;
    }
    if (name === "pdf-file") {
      filePdf.name = value.name;
      filePdf.size = value.size;
      filePdf.path = value.path;
    }
    if (name === "image-file") {
      fileImage.name = value.name;
      fileImage.size = value.size;
      fileImage.path = value.path;
    }
  }

  ipcRenderer.send("data:insert-document", {
    data: { ...formData, pdf: filePdf.name, image: fileImage.name },
    pdf: filePdf,
    image: fileImage,
  });
});
