import { DateTime } from "luxon";

/**
 * Check the timezone is valid
 * @param timezone
 * @returns boolean
 */
export const isValidZonetime = (timezone: string) => {
  return DateTime.local().setZone(timezone).isValid;
};
