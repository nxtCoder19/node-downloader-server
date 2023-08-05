import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// const data = fs.readFileSync(`${process.cwd()}/abc.txt`);
// console.log(data.toString());
// const __filename = fileURLToPath(import.meta.url);

// const __dirname = path.dirname(__filename);

// console.log(__dirname);

// console.log(`${process.cwd()}`);

router.get("/me/:filename", (req, res) => {
  var filename = req.params.filename;
  //   var response = fs.readFileSync(`${process.cwd()}/${filename}`);
  //   res.send(response);

  const filepath = `${process.cwd()}/${filename}`;

  const stat = fs.statSync(filepath);
  const fileSize = stat.size;
  // console.log(`filesize ${fileSize}`);
  const range = req.headers.range;
  // console.log(`range${range}`);
  const head = {
    "Content-Length": fileSize,
    "Content-Type": "application/octet-stream",
  };
  res.writeHead(200, head);
  fs.createReadStream(filepath, { highWaterMark: 64 * 1024 }).pipe(res);
  //   }
});

router.get("/fileDownload/:filename", (req, res) => {
  const filename = req.params.filename;
  const filepath = `${process.cwd()}/${filename}`;
  const stat = fs.statSync(filepath);
  const fileSize = stat.size;

  //   const chunkSize = 1024 * 1024; // 1 MB
  //   const start = 0;
  //   let end = chunkSize - 1;

  /// Content-Disposition header tells the browser to treat the response as a file download
  res.setHeader("Content-disposition", `attachment; filename="${filename}"`);

  /// Content-Type header sets the MIME type of the response to application/octet-stream which is a generic binary data type.
  res.setHeader("Content-Type", "application/octet-stream");

  /// Content-Length header to the size of the file
  res.setHeader("Content-Length", stat.size);

  const readStream = fs.createReadStream(filepath, {
    highWaterMark: 2 * 1024 * 1024,
  });

  readStream.on("data", function (chunk) {
    console.log(`Sent ${chunk.length} bytes to client.`);
  });

  readStream.on("open", function () {
    // Start sending chunks
    // console.log(`"res ${res}`);

    readStream.pipe(res);
  });

  readStream.on("error", function (err) {
    // console.log(err);
    res.end(err);
  });
});

export default router;

//./abc.txt
