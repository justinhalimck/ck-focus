/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
console.log("HAHAHAHAH")

self.addEventListener('activate', (ev) => {
  console.log("SW: ACTIVATED", ev)
  // new Notification("NOTIFICATION FROM SERVICE WORKER", {body: "YEEE"})
})

self.addEventListener('push', (ev) => {
  console.log("SW: PUSHED", ev)
  // new Notification("PUSH NOTIF FROM SW", {body: "AAA lol"})
  self.registration.showNotification("PUSH NOTIF FROM SW", {body: "HEHE"});
})

self.addEventListener('message', (ev) => {
  console.log("SW: MESSAGED", ev)

  self.registration.showNotification("MESSAGE NOTIF FROM SW 1", {body: "HEHE2"});

  setTimeout(() => {self.registration.showNotification("MESSAGE NOTIF FROM SW 2", {body: "HEHE2"});}, 3000)
  
})

console.log("HIIIII")