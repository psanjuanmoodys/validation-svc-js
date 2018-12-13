const packageCrypto = require("crypto");

console.log("This is the digital assets");

const data = [
  {
    dmp_id: "522574175_676",
    apn: "1001420110",
    distance: 9.51865968
  },
  {
    apn: "1001320017",
    distance: 20.08737141,
    dmp_id: "522574175_677"
  }
];

const data2 = [
  {
    apn: "1001320017",
    distance: 20.08737141,
    dmp_id: "522574175_677"
  },
  {
    apn: "1001420110",
    distance: 9.51865968,
    dmp_id: "522574175_676"
  }
];

function dataParse(data) {
  const sorted = sortKeys(data); // Sort the Data by Keys and the Values
  const stringified = JSON.stringify(sorted); // Stringify sorted key value pairs

  const hash = packageCrypto.createHash("sha256");
  hash.update(stringified); // Create hash
  const hexValue = hash.digest("hex");

  console.log(stringified + "this parses data");
  console.log("This is the data hash ", hexValue);

  return hexValue;
}

function sortKeys(data) {
  let sorted = [];
  for (var obj in data) {
    let tmp = [];
    for (var key in data[obj]) {
      // console.log(key);
      tmp.push([key, data[obj][key]]);
    }
    tmp.sort((a, b) => (a[0] < b[0] ? -1 : 1));
    sorted.push(tmp);
  }
  sorted.sort((a, b) => (a[0][1] < b[0][1] ? -1 : 1));
  return sorted;
}

// console.log(sortKeys(data));
console.log(dataParse(data));
console.log(dataParse(data2));
console.log(dataParse(data2) === dataParse(data));
