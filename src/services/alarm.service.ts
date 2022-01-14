import { Alarm } from "../interfaces/alarm.interface";

export const getAlarms = async (): Promise<Alarm[]> => {
  const url = `https://raw.githubusercontent.com/medlabmg/developers-tests/master/frontend/alarm.json`;
  return fetch(url).then((response) => response.json());
};
