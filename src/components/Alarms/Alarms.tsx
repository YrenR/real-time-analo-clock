import React from "react";
import { Alarm } from "../../interfaces/alarm.interface";
import "./alarmsStyle.css";

export default function Alarms({ alarms = [] }: { alarms: Array<Alarm> }) {
  const getClassNameChip = (active: boolean) => {
    const tagType = active ? `active` : `inactive`;
    return `alarams-chips alarams-chips-${tagType}`;
  };

  if (!alarms.length) {
    return null;
  }

  return (
    <div>
      <h1>Alarms</h1>
      <div className="alarams-container">
        {alarms.map(({ id, time, active }) => (
          <span key={id} className={getClassNameChip(active)}>
            {time}
          </span>
        ))}
      </div>
    </div>
  );
}
