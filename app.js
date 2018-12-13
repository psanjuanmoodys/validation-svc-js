const packageCrypto = require("crypto");

console.log("This is the digital assets");

const data = [
  {
    apn: "1001420110",
    distance: 9.51865968,
    dmp_id: "522574175_676"
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
  //Consume JSON
  // Sort the Data by Keys and the Values
  const newData = JSON.stringify(data);
  const hash = packageCrypto.createHash("sha256");
  hash.update(newData);
  console.log(newData + "this parses data");
  console.log("This is the data hash ", hash.digest("hex"));
}

function sortKeys(data) {
  for (var obj in data) {
    for (var key in data[obj]) {
      console.log(key);
    }
  }
}

console.log(data.apn);
