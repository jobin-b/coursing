export type Course = {
  classNbr: string;
  term: string;
  session: string;
  acadGroup: string;
  subject: string;
  catalogNbr: string;
  section: string;
  courseTitle: string;
  component: string;
  codes: string;
  M: string;
  T: string;
  W: string;
  TH: string;
  F: string;
  S: string;
  SU: string;
  startDate: string;
  endDate: string;
  time: string;
  location: string;
  instructor: string;
  units: string;
  name: string;
  startTime: string;
  endTime: string;
  classType: "Lecture" | "Lab" | "Discussion" | "Seminar" | "Recitation";
};

export type Error = {
  error: string;
};

export type SearchResult = Course | Error;

export function isError(result: SearchResult): result is Error {
  return (result as Error).error !== undefined;
}
