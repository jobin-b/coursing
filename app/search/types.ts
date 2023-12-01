export type Course = {
  query: string;
  Term: string;
  Session: string;
  AcadGroup: string;
  ClassNbr: string;
  Subject: string;
  CatalogNbr: string;
  Section: string;
  CourseTitle: string;
  Component: string;
  Codes: string;
  M: string;
  T: string;
  W: string;
  TH: string;
  F: string;
  S: string;
  SU: string;
  StartDate: string;
  EndDate: string;
  Time: string;
  Location: string;
  Instructor: string;
  Units: string;
};

export type Error = {
  query: string;
  error: string;
};

export type SearchResult = Course | Error;

export function isError(result: SearchResult): result is Error {
  return (
    (result as Error).query !== undefined &&
    (result as Error).error !== undefined
  );
}
