import React from "react";

export default function ClockNumbers() {
  const clockNumers = Array(12).fill(0);
  return (
    <>
      {clockNumers.map((_, i) => (
        <span key={`clock-number-${i + 1}`} className={`clock-number-${i + 1}`}>
          {i + 1}
        </span>
      ))}
    </>
  );
}
