import axios from "axios";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// sets up the browser to subscribe for push notifications from the server
export async function subscribeUser() {
  // ask for permission first
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    alert("Notifications denied");
    return;
  }

  // ensure SW is ready
  const reg = await navigator.serviceWorker.ready;

  // subscribe with your VAPID public key
  const subscription = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      "BKF0WTy4EETAK1RyuX8um3sOTrasPFhNw1KA4vGh92ShxAE4abJJ8_xgDuWm_z57OilljFd2z2r3XQx5eBrWvEY",
    ),
  });

  // send subscription object to your backend for storage
  axios
    .post(
      "https://pomodoro-api.incin.net/api/subscribe",
      {
        subscription: JSON.stringify(subscription),
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-focus-user": localStorage.getItem('user'),
        },
      },
    )
    .then(() => console.log("subscribed"))
    .catch((err) => console.error(err));
}

// queue a notification to be sent at a later time
export async function postAlarm(title, body, alertAt) {
  axios.post(
    "https://pomodoro-api.incin.net/api/alarm",
    {
      notifyAt: alertAt,
      title,
      body,
    },
    { headers: { "x-focus-user": localStorage.getItem('user') } },
  );
}

export async function deleteAlarm() {
  axios.delete("https://pomodoro-api.incin.net/api/alarm", 
    {headers: { "x-focus-user": localStorage.getItem('user') }})
}