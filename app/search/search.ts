import fs from "fs";
// import { sql } from "@vercel/postgres";
import { Course, SearchResult } from "./types";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
const CLASSTYPES = {
  LEC: "Lecture",
  LAB: "Lab",
  DIS: "Discussion",
  SEM: "Seminar",
  REC: "Recitation",
};
const path = process.cwd() + "/sql/courses.sqlite";

export default async function search(query: string[]): Promise<Course[]> {
  try {
    const db = await open({
      filename: path,
      driver: sqlite3.cached.Database,
    });
    const placeholders = query.map(() => "?").join(", ");
    const sqlQuery = `SELECT * FROM courses WHERE classNbr IN (${placeholders})`;
    const courses = (await db.all(sqlQuery, query)) as Course[];
    return courses;
  } catch (e) {
    console.log(e);
    return [];
  }
}
