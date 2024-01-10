import { Course } from "../search/types";

export function createCalendarLink(course: Course) {
  const formattedDays = ["SA", "MO", "TU", "WE", "TH", "FR", "SU"];
  const daysOfWeek = [
    course.S,
    course.M,
    course.T,
    course.W,
    course.TH,
    course.F,
    course.SU,
  ];
  const formattedDaysOfWeek = daysOfWeek
    .map((day, index) => (day !== "" ? formattedDays[index] : ""))
    .filter((day) => day !== "")
    .join(",");
  const isPm = course.endTime.includes("PM");
  const times = {
    startHours: parseInt(course.startTime.split(":")[0]),
    startMinutes: parseInt(
      course.startTime.split(":")[1] ? course.startTime.split(":")[1] : "0"
    ),
    endHours: parseInt(course.endTime.split(":")[0]),
    endMinutes: parseInt(
      course.endTime.split(":")[1] ? course.endTime.split(":")[1] : "0"
    ),
  };
  if (isPm) {
    if (times.startHours <= times.endHours) {
      times.startHours += 12;
    }
    times.endHours += 12;
  }
  const startDate = new Date(course.startDate);
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
  startDate.setUTCHours(times.startHours + 5); // EST to UTC
  startDate.setUTCMinutes(times.startMinutes);
  const startTimeString =
    startDate.toISOString().replace(/[:-]/g, "").split(".")[0] + "Z";
  startDate.setUTCHours(times.endHours + 5); // EST to UTC
  startDate.setUTCMinutes(times.endMinutes);
  const endTimeString =
    startDate.toISOString().replace(/[:-]/g, "").split(".")[0] + "Z";
  const endDate = new Date(course.endDate);
  endDate.setUTCHours(endDate.getHours());
  // add lastDayIndex days to endDate
  endDate.setDate(endDate.getDate());
  const endDateString =
    endDate.toISOString().replace(/[:-]/g, "").split(".")[0] + "Z";
  let classType = course.classType ? course.classType : course.component;
  if (classType === "Lecture") {
    classType = "";
  }
  const googleCalendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `${course.name} ${classType}`
  )}&dates=${startTimeString}/${endTimeString}&location=${encodeURIComponent(
    course.location
  )}&recur=RRULE:FREQ=WEEKLY;BYDAY=${formattedDaysOfWeek};UNTIL=${endDateString}`;
  return googleCalendarLink;
}
