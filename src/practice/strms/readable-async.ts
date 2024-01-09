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

const readFile = async () => {
  for await (const chunk of readable) {
    console.log(`Read ${chunk.length} bytes`);
    console.log(chunk.toString());
  }
};

readFile();
