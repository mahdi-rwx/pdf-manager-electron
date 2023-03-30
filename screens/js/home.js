const { ipcRenderer } = require("electron");

const btnAddNewFile = document.querySelector(".add-new-file");
const files_section = document.querySelector(".files .row");

document.addEventListener("DOMContentLoaded", () => {
  ipcRenderer.send("loaded");
  ipcRenderer.on("data:get-documents", (e, data) => {
    data.length &&
      data.forEach((item) => {
        files_section.innerHTML += `<div class="file col-12 col-md-3 gap-5">
      <div class="file-card card shadow-lg my-4">
        <div class="card-body p-0">
          <div
            class="file-details position-absolute top-0 start-0 opacity-0 w-100 h-100"
          >
            <div
              class="h-100 d-flex flex-column justify-content-between py-1 align-items-center"
            >
              <h1 class="fs-5 text-white text-center my-2">${item.title}</h1>
              <span class="text-white"> ${item["total-page"]} صفحه</span>
              <span class="text-white">نویسنده : ${item.writer}</span>
              <span class="text-white">موضوع : ${item.subject}</span>
              <span class="text-white">تاریخ : ${item["release-date"]}</span>
              <button class="btn btn-sm btn-primary">بیشتر</button>
            </div>
          </div>
          <img
            src="./../images/${item.image}"
            alt=""
            class="w-100"
            style="object-fit: cover"
          />
          <div class="py-2">
            <h1 class="my-2 text-center fs-6">${item.title}</h1>
          </div>
        </div>
      </div>
    </div>`;
      });
  });
});

btnAddNewFile.addEventListener("click", () => {
  ipcRenderer.send("screen:new-file");
});
