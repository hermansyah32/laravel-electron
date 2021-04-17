const { ipcRenderer } = require("electron");

process.once("loaded", () => {
  window.addEventListener("message", (event) => {
    // do something with custom event
    const data = event.data;
    if (data.type === "fromRenderer") {
      /**
       * you can add ipcRenderer Command to communicate with main process here
       */
      // ipcRenderer.send(data.type, data.body);
      ipcRenderer.invoke(data.type, data.body).then((response) => {
        console.log(`Main resposne fromRenderer: ${response.message}`);
      });
    }
  });

  /**
   * You can add ipcRenderer listener from main process
   */
  ipcRenderer.on("fromMain", (event, response) => {
    console.log(`Main resposne fromRenderer: ${response.message}`);
  });
});
