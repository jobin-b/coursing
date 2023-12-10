export type Course = {
  classnbr: string;
  term: string;
  session: string;
  acadgroup: string;
  subject: string;
  catalognbr: string;
  section: string;
  coursetitle: string;
  component: string;
  codes: string;
  m: string;
  t: string;
  w: string;
  th: string;
  f: string;
  s: string;
  su: string;
  startdate: string;
  enddate: string;
  time: string;
  location: string;
  instructor: string;
  units: string;
  name: string;
  starttime: string;
  endtime: string;
  classtype: "Lecture" | "Lab" | "Discussion" | "Seminar" | "Recitation";
};

export type Error = {
  error: string;
};

export type SearchResult = Course | Error;

export function isError(result: SearchResult): result is Error {
  return (result as Error).error !== undefined;
}
