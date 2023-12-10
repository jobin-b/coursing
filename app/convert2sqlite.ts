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
//       course.m,
//       course.t,
//       course.w,
//       course.th,
//       course.f,
//       course.s,
//       course.su,
//       course.StartDate,
//       course.EndDate,
//       course.Time,
//       course.Location,
//       course.Instructor,
//       course.Units,
//       course.Name,
//       course.StartTime,
//       course.EndTime,
//       course.ClassType,
//     ];
//     db.run(insertSql, values, (err) => {
//       if (err) {
//         console.error("Error inserting data:", err.message);
//       } else {
//         console.log(`Data inserted for classnbr: ${course.ClassNbr}`);
//       }
//     });
//   });
//   db.close();
// }
