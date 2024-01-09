// create file `mkfile -n 500m 500m_file`
import { createHash } from "crypto";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";

const hashStream = createHash("sha256");
hashStream.setEncoding("base64");

const readStream = createReadStream("src/practice/strms/500m_file");
const writeStream = createWriteStream("src/practice/strms/checksum.txt");

pipeline(readStream, hashStream, writeStream, (err) => {
  err && console.error(err);
});
