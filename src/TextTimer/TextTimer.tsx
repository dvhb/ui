import React, { FC, useEffect, useState } from 'react';

import styles from './styles.module.scss';

export interface TextTimerProps {
  duration: number; // milliseconds
  text?: string;
  labels?: {
    hours: string;
    minutes: string;
    seconds: string;
  };
  onEnd?: () => void;
}

const defaultLabels = {
  hours: 'hours',
  minutes: 'minutes',
  seconds: 'seconds',
};

export const TextTimer: FC<TextTimerProps> = ({ duration, text, labels = defaultLabels, onEnd }) => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetTime = new Date().getTime() + duration;

    const newTime = countdown(targetTime);
    setTime(newTime);

    const timer = setInterval(() => {
      const newTime = countdown(targetTime);

      if (newTime.hours === -1) {
        setTime({ hours: 0, minutes: 0, seconds: 0 });
        onEnd?.();
        clearInterval(timer);
      } else {
        setTime(newTime);
      }
    }, 1000);
  }, []);

  if (!time.hours && !time.minutes && !time.seconds) {
    return null;
  }

  return (
    <div className={styles.textTimer}>
      {text && <>{text}&nbsp;</>}
      {time.hours ? (
        <>
          {time.hours} {labels?.hours}&nbsp;
        </>
      ) : null}
      {time.hours || time.minutes ? (
        <>
          {time.minutes} {labels?.minutes}&nbsp;
        </>
      ) : null}
      {time.hours || time.minutes || time.seconds ? (
        <>
          {time.seconds} {labels?.seconds}.
        </>
      ) : null}
    </div>
  );
};

const countdown = (targetTime: number) => {
  const currentTime = new Date().getTime();
  let secondsLeft = (targetTime - currentTime) / 1000;

  const hours = Math.floor(secondsLeft / 3600);
  secondsLeft = parseInt((secondsLeft % 3600).toFixed(0), 10);

  const minutes = Math.floor(secondsLeft / 60);
  secondsLeft = parseInt((secondsLeft % 60).toFixed(0), 10);

  const seconds = secondsLeft;

  return {
    hours,
    minutes,
    seconds,
  };
};
