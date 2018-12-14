"use strict";

const express = require("express");
const packageCrypto = require("crypto");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser());

// console.log("This is the digital assets");

// const data = [
//   {
//     dmp_id: "522574175_676",
//     apn: "1001420110",
//     distance: 9.51865968
//   },
//   {
//     apn: "1001320017",
//     distance: 20.08737141,
//     dmp_id: "522574175_677"
//   }
// ];

// const data2 = [
//   {
//     apn: "1001320017",
//     distance: 20.08737141,
//     dmp_id: "522574175_677"
//   },
//   {
//     apn: "1001420110",
//     distance: 9.51865968,
//     dmp_id: "522574175_676"
//   }
// ];

app.post("/api/validate", validateData);

function validateData(req, res) {
  const data1 = req.body.dataSetOne;
  const data2 = req.body.dataSetTwo;

  const shaData1 = dataParse(data1);
  const shaData2 = dataParse(data2);

  console.log(
    `\n====VALIDATING ${new Date()}===\nDataset 1: ${shaData1}\nDataset 2: ${shaData2}\n---\nvalid: ${shaData1 ===
      shaData2}\n==============\n`
  );

  res.json({
    valid: shaData1 === shaData2,
    dataSetOne: shaData1,
    dataSetTwo: shaData2
  });
}

function dataParse(data) {
  const sorted = sortKeys(data); // Sort the Data by Keys and the Values
  const stringified = JSON.stringify(sorted); // Stringify sorted key value pairs

  const hash = packageCrypto.createHash("sha256");
  hash.update(stringified); // Create hash
  const hexValue = hash.digest("hex");

  return hexValue;
}

function sortKeys(data) {
  let sorted = [];

  for (var obj in data) {
    let tmp = [];
    for (var key in data[obj]) {
      tmp.push([key, data[obj][key]]); // Convert objects into an array of subarrays, containing key/value pairs
    }
    tmp.sort((a, b) => (a[0] < b[0] ? -1 : 1)); // Sort key value pairs within sub-array
    sorted.push(tmp);
  }

  sorted.sort((a, b) => (a[0][1] < b[0][1] ? -1 : 1)); // sort objects (which are now sub-arrays)
  return sorted;
}

// console.log(dataParse(data)); // => d86c56673a72a2706baab514aace9e6f577fb848495b52c62ac20abd94a43e4d
// console.log(dataParse(data2)); // => d86c56673a72a2706baab514aace9e6f577fb848495b52c62ac20abd94a43e4d
// console.log(dataParse(data2) === dataParse(data)); // => True

app.listen(port, function() {
  console.log("Validation-svc-js is listening on port " + port);
});
