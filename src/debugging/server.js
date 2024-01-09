// https://www.digitalocean.com/community/tutorials/how-to-debug-node-js-with-the-built-in-debugger-and-chrome-devtools
// Command: node --inspect src/debugging/server.js
// Debug: chrome://inspect or use vscode JavaScript Debug Terminal with the command above
// Request: http http://localhost:8000
const http = require("http");

const host = "localhost";
const port = 8000;

const greetings = [
  "Hello world",
  "Hola mundo",
  "Bonjour le monde",
  "Hallo Welt",
  "Salve mundi",
];

const getGreeting = function () {
  let greeting = greetings[Math.floor(Math.random() * greetings.length)];
  return greeting;
};

const requestListener = function (req, res) {
  let message = getGreeting();
  res.setHeader("Content-Type", "application/json");
  res.writeHead(200);
  res.end(`{"message": "${message}"}`);
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
