import { Course } from "../search/types";

export function createCalendarLink(course: Course) {
  const formattedDays = ["SA", "MO", "TU", "WE", "TH", "FR", "SU"];
  const daysOfWeek = [
    course.s,
    course.m,
    course.t,
    course.w,
    course.th,
    course.f,
    course.su,
  ];
  const formattedDaysOfWeek = daysOfWeek
    .map((day, index) => (day !== "" ? formattedDays[index] : ""))
    .filter((day) => day !== "")
    .join(",");
  const isPm = course.endtime.includes("PM");
  const times = {
    startHours: parseInt(course.starttime.split(":")[0]),
    startMinutes: parseInt(
      course.starttime.split(":")[1] ? course.starttime.split(":")[1] : "0"
    ),
    endHours: parseInt(course.endtime.split(":")[0]),
    endMinutes: parseInt(course.endtime.split(":")[1].slice(0, 2)),
  };
  if (isPm) {
    if (times.startHours <= times.endHours) {
      times.startHours += 12;
    }
    times.endHours += 12;
  }
  const startDate = new Date(course.startdate);
  // add firstDayIndex days to startDate
  const firstDayIndex = daysOfWeek.findIndex((day) => day !== "");
  let nextDayIndex = daysOfWeek.findIndex(
    (day, index) => day !== "" && index > startDate.getDay()
  );
  nextDayIndex = nextDayIndex === -1 ? firstDayIndex : nextDayIndex;
  if (daysOfWeek[startDate.getDay()] == "") {
    while (startDate.getDay() !== nextDayIndex) {
      startDate.setDate(startDate.getDate() + 1);
    }
  }
  startDate.setHours(times.startHours);
  startDate.setMinutes(times.startMinutes);
  const startTimeString =
    startDate.toISOString().replace(/[:-]/g, "").split(".")[0] + "Z";
  startDate.setHours(times.endHours);
  startDate.setMinutes(times.endMinutes);
  const endTimeString =
    startDate.toISOString().replace(/[:-]/g, "").split(".")[0] + "Z";
  const endDate = new Date(course.enddate);
  // add lastDayIndex days to endDate
  endDate.setDate(endDate.getDate());
  const endDateString =
    endDate.toISOString().replace(/[:-]/g, "").split(".")[0] + "Z";

  const googleCalendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `${course.name}`
  )}&dates=${startTimeString}/${endTimeString}&location=${encodeURIComponent(
    course.location
  )}&recur=RRULE:FREQ=WEEKLY;BYDAY=${formattedDaysOfWeek};UNTIL=${endDateString}`;
  return googleCalendarLink;
}
