const HoursToSeconds = ({ hours, minutes, seconds }) => {
  return (hours * 60 + minutes) * 60 + seconds;
};
const date = new Date();
/**
 * @currTime : an object that gives the current Time Object
 */
// export const currTime = {
//   seconds: date.getSeconds(),
//   minutes: date.getMinutes(),
//   hours: date.getHours(),
// };
/**
 * @endTime : a function that takes three arguments sec,min and hour as an array
 */
export const endTime = (currTime,[hour, min, sec]) => {
  return {
    seconds: currTime.seconds + sec,
    minutes: currTime.minutes + min,
    hours: currTime.hours + hour,
  };
};

const SecondsToHours = (_seconds) => {
  // divide the seconds by 60; quotient = minutes, reminder = seconds
  const seconds = _seconds % 60;
  // divide the minutes by 60; quoteient = hours ,reminder = minutes
  let minutes = Math.floor(_seconds / 60);
  const hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  // if seconds = -10,min =-10,hour =1
  // then seconds =
  return { hours: hours, minutes: minutes, seconds: seconds };
};
/**
 * @DurationBetween gives the time between two time object in another time object
 */
export const DurationBeteween = (final, initial) => {
  return SecondsToHours(HoursToSeconds(final) - HoursToSeconds(initial));
};

// SecondsToHours();
