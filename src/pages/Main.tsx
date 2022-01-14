import React, { useEffect, useState } from "react";
import { Timezone } from "timezones.json";
import AnaloClock from "../components/AnaloClock/AnaloClock";
import SelectTimezone from "../components/SelectTimezone/SelectTimezone";
import { DateTime } from "luxon";
import "./mainStyle.css";
import { isValidZonetime } from "../components/SelectTimezone/selectTimezone.tools";
import Alarms from "../components/Alarms/Alarms";
import { Alarm } from "../interfaces/alarm.interface";
import { getAlarms } from "../services/alarm.service";

export default function Main() {
  const [timezone, setTimezone] = useState<string>(DateTime.local().zoneName);
  const [alarms, setAlarms] = useState<Alarm[]>([]);

  useEffect(() => {
    getAlarms().then((res) => setAlarms(res));
  }, []);

  const handlerOnChangeTimeZone = ({ utc }: Timezone) => {
    if (isValidZonetime(utc[0])) setTimezone(utc[0]);
  };

  return (
    <div className="main-container">
      <div className="analog-clock-container">
        <AnaloClock timezone={timezone} alarms={alarms} />
      </div>
      <div className="sidebar-container">
        <SelectTimezone onChange={handlerOnChangeTimeZone} />
        <Alarms alarms={alarms} />
      </div>
    </div>
  );
}
