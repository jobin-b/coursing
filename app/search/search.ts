import fs from "fs";
// import { sql } from "@vercel/postgres";
import { Course, SearchResult } from "./types";
import Database from "better-sqlite3";

const CLASSTYPES = {
  LEC: "Lecture",
  LAB: "Lab",
  DIS: "Discussion",
  SEM: "Seminar",
  REC: "Recitation",
};
const path = process.cwd() + "/sql/courses.sqlite";
const db = new Database(path);
export default async function search(query: string[]): Promise<Course[]> {
  try {
    const placeholders = query.map(() => "?").join(", ");
    const sqlQuery = `SELECT * FROM courses WHERE classNbr IN (${placeholders})`;
    const courses = db.prepare(sqlQuery).all(...query) as Course[];
    // const str = `SELECT * FROM wn2024 WHERE classNbr IN (${query})`;
    // const courses = (
    //   await sql.query(`SELECT * FROM wn2024 WHERE classNbr = ANY($1)`, [query])
    // ).rows as Course[];
    return courses;
  } catch (e) {
    console.log(e);
    return [];
  }
}
