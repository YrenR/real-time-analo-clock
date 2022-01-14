import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import useInterval from "../../hook/useInterval";
import "./analoClock.css";
import { createStyleTransform, searchNextAlarms } from "./analoClock.tools";
import ClockNumbers from "./ClockNumbers";
import { isValidZonetime } from "../SelectTimezone/selectTimezone.tools";
import { Alarm } from "../../interfaces/alarm.interface";
import Modal from "../Modal/Modal";

const DELAY = 1000;

export default function AnaloClock({ timezone, alarms = [] }: { timezone: string; alarms: Array<Alarm> }): JSX.Element {
  const [dateTime, setDataTime] = useState<DateTime>(DateTime.local());
  const [showModal, setShowModal] = useState<boolean>(false);
  const [alertAlarms, setAlertAlarms] = useState<Alarm[]>([]);

  useEffect(() => {
    if (isValidZonetime(timezone)) {
      setDataTime((prev) => prev.setZone(timezone));
    }
  }, [timezone]);

  useInterval(() => {
    const updateTime = dateTime.plus(DELAY);
    setDataTime(updateTime);

    if (alarms.length) verifyAlarms(updateTime);
  }, DELAY);

  const verifyAlarms = (time: DateTime) => {
    const nextAlarms = searchNextAlarms(alarms, time);
    if (nextAlarms.length) {
      setAlertAlarms(nextAlarms);
      setShowModal(true);
    }
  };

  const handlerOnCloseModal = () => {
    setAlertAlarms([]);
    setShowModal(false);
  };

  const styleHourHands = () => createStyleTransform(dateTime.hour * 30);
  const styleMinuteHands = () => createStyleTransform(dateTime.minute * 6);
  const styleSecondHands = () => createStyleTransform(dateTime.second * 6);

  return (
    <>
      <div className="clock-container">
        <div className="clock">
          <div className="hour-hand" {...styleHourHands()} />
          <div className="minute-hand" {...styleMinuteHands()} />
          <div className="second-hand" {...styleSecondHands()} />
          <ClockNumbers />
        </div>
      </div>

      <Modal show={showModal} onClose={handlerOnCloseModal} title="¡Alarm!">
        {alertAlarms.map(({ id, time, message }) => (
          <div key={id} className="modal-content-alarms">
            <span className="alarams-chips alarams-chips-active">{time}</span>
            <span>{message}</span>
          </div>
        ))}
      </Modal>
    </>
  );
}
