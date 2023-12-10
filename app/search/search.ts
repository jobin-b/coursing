import fs from "fs";
import { sql } from "@vercel/postgres";
import { Course, SearchResult } from "./types";

const CLASSTYPES = {
  LEC: "Lecture",
  LAB: "Lab",
  DIS: "Discussion",
  SEM: "Seminar",
  REC: "Recitation",
};

export default async function search(query: string[]): Promise<Course[]> {
  try {
    const str = `SELECT * FROM wn2024 WHERE classnbr IN (${query})`;
    const courses = (
      await sql.query(`SELECT * FROM wn2024 WHERE classnbr = ANY($1)`, [query])
    ).rows as Course[];
    console.log(courses);
    return courses;
  } catch (e) {
    console.log(e);
    return [];
  }
}
