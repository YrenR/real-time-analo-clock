import React, { ChangeEvent } from "react";
import timezones, { Timezone } from "timezones.json";

export default function SelectTimezone({ onChange }: { onChange: (timezone: Timezone) => void }): JSX.Element {
  const handlerOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const tzSelected = event.target.value;
    const timezone = timezones.find((tz) => tz.text === tzSelected);
    if (timezone) onChange(timezone);
  };

  return (
    <div className="timezones-container">
      <h1>Select timezones</h1>
      <div className="select-timezones-container">
        <select onChange={handlerOnChange}>
          {timezones.map(({ text }, index) => (
            <option key={`select-option-${index}`} value={text}>
              {text}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
