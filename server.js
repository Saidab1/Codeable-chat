const PORT = process.env.PORT||3000;
const WebSocketServer = require("ws").Server;
const wss = new WebSocketServer({port:`${PORT}`}); 


wss.on("connection",(ws) => {
  console.log("Connection opened 🚀");
  ws.send(JSON.stringify({ text:"Codeable's chat connected 🚀"}));
  ws.on("message",(message) => {
    wss.clients.forEach((client) => {
      if(client != ws) client.send(message);
    });
  });

  ws.on("close", () => {
    console.log("Connection closed 💀");
  });
});

