export class SWClient {
  // updates to the latest service worker (hopefully)
  static update() {
    navigator.serviceWorker.getRegistration().then((reg) => reg?.update());

    navigator.serviceWorker.register("/sw.js").then((r) => r?.update());
  }

  // sends a message to the service worker
  static post(messageID, body) {
    navigator.serviceWorker.controller?.postMessage({
      messageID,
      body,
    });
  }

  static listen(messageID, cb) {
    navigator.serviceWorker.addEventListener("message", (ev) => {
      console.log(ev);
    });
  }
}
