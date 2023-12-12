// import { json } from "stream/consumers";
// import { db } from "./db";
// import fs from "fs";
// // convert data/WN2024.json to data/courses.db sqlite3 database
// function convert2sqlite() {
//   const jsonData = JSON.parse(fs.readFileSync("data/WN2024.json", "utf-8"));
//   const insertSql = `
//     INSERT INTO courses VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   Object.values(jsonData).forEach((course: any) => {
//     const values = [
//       course.ClassNbr,
//       course.Term,
//       course.Session,
//       course.AcadGroup,
//       course.Subject,
//       course.CatalogNbr,
//       course.Section,
//       course.CourseTitle,
//       course.Component,
//       course.Codes,
//       course.M,
//       course.T,
//       course.W,
//       course.TH,
//       course.F,
//       course.S,
//       course.SU,
//       course.StartDate,
//       course.endDate,
//       course.Time,
//       course.Location,
//       course.Instructor,
//       course.Units,
//       course.Name,
//       course.startTime,
//       course.endTime,
//       course.classType,
//     ];
//     db.run(insertSql, values, (err) => {
//       if (err) {
//         console.error("Error inserting data:", err.message);
//       } else {
//         console.log(`Data inserted for classNbr: ${course.ClassNbr}`);
//       }
//     });
//   });
//   db.close();
// }
