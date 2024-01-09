import { createWriteStream } from "fs";
import { get } from "http";

get("http://localhost:8000/file", (res) => {
  const writeStream = createWriteStream(`${__dirname}/my-file-copy.txt`, {
    highWaterMark: 20,
  });
  res.pipe(writeStream);

  res.on("error", (error) => {
    console.error("res error :>> ", error);
  });

  writeStream.on("open", () => {
    console.log("open");
  });

  writeStream.on("error", (error) => {
    console.error("writeStream error :>> ", error);
  });

  writeStream.on("finish", () => {
    console.error("finish");
  });

  writeStream.on("pipe", () => {
    console.error("pipe");
  });

  //   writeStream.on("drain", () => {
  //     console.error("drain");
  //   });

  writeStream.on("unpipe", () => {
    console.error("unpipe");
  });
});

type a = Record<string, number>;

const b: a = [1, 2];
