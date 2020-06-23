const ws = new WebSocket(`ws://localhost:3000`);
Notification.requestPermission();
const generateDate = () => {
  return new Date().toLocaleTimeString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
};

const username = prompt("What's your name?");

const log = document.getElementById("log");

document.querySelector("button").onclick = () => {
  let text = document.getElementById("text").value;
  ws.send(JSON.stringify({ username, text, type: "message" }));
  log.innerHTML += generateDate() + " You:" + " " + text + "<br>";
};

ws.onopen = () => {
  ws.send(JSON.stringify({ username, type: "connected" }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === "connected") {
    const notification = new Notification(`${data.username} has logged in`);
    console.log(`${data.username} has logged in`);
  } else {
    if (data.username === undefined) {
      log.innerHTML += generateDate() + " " + data.text + "<br>";
    } else {
      log.innerHTML +=
        generateDate() + " " + data.username + ":" + " " + data.text + "<br>";
    }
  }
};

ws.onerror = (error) => {
  console.log("Sever error message:", error.message);
};
