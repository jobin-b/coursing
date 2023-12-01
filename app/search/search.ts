import fs from "fs";
import Papa from "papaparse";

function convert() {
  const filePath = "data/WN2024.csv";
  const fileData = fs.readFileSync(filePath, "utf-8");
  const parsedData = Papa.parse(fileData, { header: true });
  const data = parsedData.data;
  const jsonData: any = {};
  data.forEach((row: any) => {
    const indexValue = row["Class Nbr"];

    if (indexValue !== undefined) {
      jsonData[indexValue] = row;
    }
  });

  fs.writeFileSync("data/WN2024.json", JSON.stringify(jsonData, null, 2));
}

export default function search(query: string[]) {
  const filePath = "data/WN2024.json";
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const results: any = [];
  query.forEach((q) => {
    const result = data[q];
    if (result) {
      result["query"] = q;
      results.push(result);
    } else {
      results.push({ error: "No results found", query: q });
    }
  });
  console.log(results);
  return results;
}
