import { DateTime } from "luxon";
import { Alarm } from "../../interfaces/alarm.interface";

/**
 * Generate a style for the transform rotate property
 * @param rotate deg
 * @returns style: { transform: string; };
 */
export const createStyleTransform = (rotate: number) => {
  return { style: { transform: `rotate(${rotate}deg)` } };
};

/**
 * In hh:mm:ss and check that it is valid
 * Has at least hh:mm
 * Range of hour positive and less than 24
 * Range of minutes and seconds positive and less than 60
 * @param time string hh:mm:ss
 * @returns boolean
 */
export const isValidTime = (time: string): boolean => {
  const timeSplit = time.split(":").map(Number);
  const rangeHour = timeSplit.length > 1 && timeSplit[0] < 24;
  const rangeMinSec = !timeSplit.some((x) => x < 0 || x >= 60);
  return rangeHour && rangeMinSec;
};

/**
 * Return true if hour, minutes and seconds is equals
 * @param time1 DateTime
 * @param time2 DateTime
 * @returns boolean
 */
export const isEqualsTime = (time1: DateTime, time2: DateTime) =>
  time1.hour === time2.hour && time1.minute === time2.minute && time1.second === time2.second;

/**
 * Parse string (hh:mm:ss) to DateTime (Luxon)
 * @param time string hh:mm:ss
 * @returns DateTime
 */
export const stringToDateTime = (time: string): DateTime => {
  const timeSplit = time.split(":").map(Number);
  return DateTime.local().set({
    hour: timeSplit[0] || 0,
    minute: timeSplit[1] || 0,
    second: timeSplit[2] || 0,
  });
};

/**
 * Search upcoming alarms
 * @param alarms Alarm[]
 * @param time DateTime
 * @returns
 */
export const searchNextAlarms = (alarms: Alarm[], time: DateTime): Alarm[] => {
  return alarms
    .filter((x) => x.active && isValidTime(x.time))
    .filter((x) => {
      const dt = stringToDateTime(x.time);
      return isEqualsTime(time, dt);
    });
};
