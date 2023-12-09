import fs from "fs";
import { db } from "../db";
import { SearchResult } from "./types";

const CLASSTYPES = {
  LEC: "Lecture",
  LAB: "Lab",
  DIS: "Discussion",
  SEM: "Seminar",
  REC: "Recitation",
};

export default function search(query: string[]): Promise<SearchResult[]> {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM courses 
        WHERE classNbr IN (${query})`,
      (err, rows: SearchResult[]) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}
