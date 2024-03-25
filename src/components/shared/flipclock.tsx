import { useState } from "react";
import React from "react";
import { useBoolean, useEffectOnce, useInterval } from "react-use";

import { cn } from "@/utils/utils";
import { dayjs } from "@/utils/utils-date";

const AnimatedCard = ({ animation, digit }: any) => {
  return (
    <div className={cn(`flipCard ${animation}`, "bg-green2-800 text-white")}>
      <span className="font-mono">{digit}</span>
    </div>
  );
};

// function component
const StaticCard = ({ position, digit }: any) => {
  return (
    <div className={cn("bg-green2-800 text-white", position)}>
      <span className="font-mono">{digit}</span>
    </div>
  );
};

// function component
const FlipUnitContainer = ({ digit, shuffle, unit }: any) => {
  // assign digit values
  let currentDigit = digit;
  let previousDigit = digit;

  // to prevent a negative value
  if (unit !== "hours") {
    previousDigit = previousDigit === -1 ? 59 : previousDigit;
  } else {
    previousDigit = previousDigit === -1 ? 23 : previousDigit;
  }

  const previousDigit1 = previousDigit < 10 ? `0${previousDigit}` : previousDigit;
  const currentDigit1 = currentDigit < 10 ? `0${currentDigit}` : currentDigit;
  // shuffle digits
  const digit1 = shuffle ? previousDigit1 : currentDigit1;
  const digit2 = !shuffle ? previousDigit1 : currentDigit1;

  // shuffle animations
  const animation1 = shuffle ? "fold" : "unfold";
  const animation2 = !shuffle ? "fold" : "unfold";

  return (
    <div className={cn("flipUnitContainer", "rounded")}>
      <StaticCard position={"upperCard"} digit={currentDigit1} />
      <StaticCard position={"lowerCard"} digit={previousDigit1} />
      <AnimatedCard digit={digit1} animation={animation1} />
      <AnimatedCard digit={digit2} animation={animation2} />
    </div>
  );
};

type TFlipClockProps = {};

export const FlipClock = ({}: TFlipClockProps) => {
  const [isRunning, toggleIsRunning] = useState<boolean>(true);
  const [hourConf, setHourConf] = useState({
    hours: 0,
    hoursShuffle: true,
  });
  const [minuteConf, setMinuteConf] = useState({
    minutes: 0,
    minutesShuffle: true,
  });
  const [secondConf, setSecondConf] = useState({
    seconds: 0,
    secondsShuffle: true,
  });

  const updateTime = () => {
    // get new date
    const toTime = dayjs().hour(23).endOf("hour");
    const fromTime = dayjs();
    const durationSeconds = toTime.diff(fromTime, "second");
    // set time units
    const hours = Math.floor(durationSeconds / (60 * 60));
    const minutes = Math.floor((durationSeconds - hours * 60 * 60) / 60);
    const seconds = durationSeconds - minutes * 60 - hours * 60 * 60;

    // on hour change, update hours and shuffle state
    if (hours !== hourConf.hours) {
      const hoursShuffle = !hourConf.hoursShuffle;
      setHourConf({
        hours,
        hoursShuffle,
      });
    }
    // on minute change, update minutes and shuffle state
    if (minutes !== minuteConf.minutes) {
      const minutesShuffle = !minuteConf.minutesShuffle;
      setMinuteConf({
        minutes,
        minutesShuffle,
      });
    }
    // on second change, update seconds and shuffle state
    if (seconds !== secondConf.seconds) {
      const secondsShuffle = !secondConf.secondsShuffle;
      setSecondConf({
        seconds,
        secondsShuffle,
      });
    }
  };

  useEffectOnce(() => {
    toggleIsRunning(true);
    return () => {
      toggleIsRunning(false);
    };
  });

  useInterval(
    () => {
      updateTime();
    },
    isRunning ? 1000 : null,
  );

  return (
    <div className={"flipClock"}>
      <FlipUnitContainer unit={"hours"} digit={hourConf.hours} shuffle={hourConf.hoursShuffle} />
      <FlipUnitContainer
        unit={"minutes"}
        digit={minuteConf.minutes}
        shuffle={minuteConf.minutesShuffle}
      />
      <FlipUnitContainer
        unit={"seconds"}
        digit={secondConf.seconds}
        shuffle={secondConf.secondsShuffle}
      />
    </div>
  );
};

type TFlipDownProps = {};

const FlipDown = ({}: TFlipDownProps) => {
  return <div>FlipDown</div>;
};

export default FlipDown;
