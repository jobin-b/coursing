// export function convert() {
//   const filePath = "data/WN2024.csv";
//   const fileData = fs.readFileSync(filePath, "utf-8");
//   const parsedData = Papa.parse(fileData, { header: true });
//   const data = parsedData.data;
//   const jsonData: any = {};
//   data.forEach((row: any) => {
//     if (row["Subject"] === undefined || row["CatalogNbr"] === undefined) {
//       row["Name"] = "";
//     } else {
//       row["Name"] =
//         row["Subject"].split("(")[1].split(")")[0] + row["CatalogNbr"];
//     }
//     if (row["Time"] === "ARR" || row["Time"] === undefined) {
//       row["StartTime"] = "TBA";
//       row["EndTime"] = "TBA";
//     } else {
//       let time = row["Time"].split("-");
//       const timeOfDay = time[1].slice(-2); // AM or PM
//       time[1] = time[1].slice(0, -2); // remove AM or PM
//       for (let i = 0; i < time.length; i++) {
//         if (time[i].length === 3) {
//           time[i] = time[i][0] + ":" + time[i][1] + time[i][2];
//         } else if (time[i].length === 4) {
//           time[i] = time[i][0] + time[i][1] + ":" + time[i][2] + time[i][3];
//         } else if (time[i].length === 1) {
//           time[i] = time[i] + ":00";
//         }
//       }

//       row["StartTime"] = time[0];
//       row["EndTime"] = time[1] + " " + timeOfDay;
//     }

//     row["ClassType"] =
//       CLASSTYPES[row["Component"] as "LEC" | "LAB" | "DIS" | "SEM" | "REC"];
//     const indexValue = row["ClassNbr"];
//     if (indexValue !== undefined) {
//       jsonData[indexValue] = row;
//     }
//   });

//   fs.writeFileSync("data/WN2024.json", JSON.stringify(jsonData, null, 2));
// }
