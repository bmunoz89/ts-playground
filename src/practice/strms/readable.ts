import { createReadStream } from "fs";

const readable = createReadStream(`${__dirname}/my-file.txt`, {
  /**
   * Gives you some control on the amount of "buffer memory" used
   *
   * Default: 64 * 1024 KiB
   *
   * @see https://stackoverflow.com/a/35801867
   */
  highWaterMark: 20,
});

readable.on("data", (chunk) => {
  console.log(`Read ${chunk.length} bytes`);
  console.log(chunk.toString());
});
