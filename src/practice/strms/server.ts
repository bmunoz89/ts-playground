import { createReadStream } from "fs";
import { IncomingMessage, ServerResponse, createServer } from "http";

const server = createServer();

function notFound(_req: IncomingMessage, res: ServerResponse) {
  res.writeHead(404);
  res.write("Not Found");
  res.end();
}

function getHome(_req: IncomingMessage, res: ServerResponse) {
  res.writeHead(200);
  res.write("Home");
  res.end();
}

function getFile(_req: IncomingMessage, res: ServerResponse) {
  const readStream = createReadStream(`${__dirname}/4gb_file`, {
    highWaterMark: 20,
  });

  readStream.on("open", () => {
    console.log("Open file");
    readStream.pipe(res);
  });

  readStream.on("error", (error) => {
    console.error("error", error);
  });

  readStream.on("pause", () => {
    console.log("pause");
  });

  readStream.on("resume", () => {
    console.log("resume");
  });

  readStream.on("close", () => {
    console.log("close");
  });

  readStream.on("end", () => {
    console.log("end");
  });

  // readStream.on("data", (data) => {
  //   console.log("data :>> ", data);
  // });
}

server.on("request", function (req, res) {
  console.log(`${req.method} - ${req.url}`);
  if (req.url === "/" && req.method === "GET") {
    return getHome(req, res);
  }

  if (req.url === "/file" && req.method === "GET") {
    return getFile(req, res);
  }

  notFound(req, res);
});

server.listen(8000, () => {
  console.log("Listening on http://localhost:8000 🚀");
});
