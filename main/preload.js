const { ipcRenderer } = require("electron");

process.once("loaded", () => {
  window.addEventListener("message", (event) => {
    // do something with custom event
    const data = event.data;
    if (data.type === "print-page") {
      ipcRenderer.send("print-report", data.body);
      ipcRenderer.invoke(channel, data.body).then((response) => {
        // do something
      });
    }
  });

  ipcRenderer.on("console", (event, response) => {
    alert(response.message)
  });
});
