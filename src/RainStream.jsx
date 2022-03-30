import React, { useEffect, useState } from "react";
const VALID_CHARS = "abcdefghijklmnouqrstuvwxyz1234567890";
const STREAMMUTATION = 0.02;
const minstream = 15;
const maxstream = 50;
const minStreamDelay = 0;
const maxStreamDelay = 8000;
const minInterval = 50;
const maxInterval = 100;
const MIN_INTERVAL_DELAY = 50;
const MAX_INTERVAL_DELAY = 100;

const MIN_DELAY_BETWEEN_STREAMS = 0;
const MAX_DELAY_BETWEEN_STREAMS = 8000;

const getRandRange = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

const getRandChar = () =>
  VALID_CHARS.charAt(Math.floor(Math.random() * VALID_CHARS.length));

const genRandStream = () =>
  new Array(getRandRange(minstream, maxstream))
    .fill()
    .map((_) => getRandChar());

const getMutatedStream = (stream) => {
  const newStream = [];
  for (let i = 1; i < stream.length; i++) {
    if (Math.random() < STREAMMUTATION) {
      newStream.push(getRandChar());
    } else {
      newStream.push(stream[i]);
    }
  }
  newStream.push(getRandChar());
  return newStream;
};

const RainStream = (props) => {
  const [stream, setStream] = useState(genRandStream());
  const [topPadding, setTopPadding] = useState(stream.length * -50);
  const [intervalDelay, setIntervalDelay] = useState(null);
  useEffect(() => {
		setTimeout(() => {
			setIntervalDelay(getRandRange(MIN_INTERVAL_DELAY, MAX_INTERVAL_DELAY));
		}, getRandRange(MIN_DELAY_BETWEEN_STREAMS, MAX_DELAY_BETWEEN_STREAMS));
	}, []);
  useInterval(() => {
    if(!props.height) return;
    if(!intervalDelay) return;
    if (topPadding > window.innerHeight) {
      // setTopPadding(0);
      setStream([]);
			const newStream = genRandStream();
			setStream(newStream);
			setTopPadding(newStream.length * -44);
			setIntervalDelay(null);
			setTimeout(
				() =>
					setIntervalDelay(
						getRandRange(MIN_INTERVAL_DELAY, MAX_INTERVAL_DELAY),
					),
          getRandRange(MIN_DELAY_BETWEEN_STREAMS, MAX_DELAY_BETWEEN_STREAMS),
			);
    } else {
      setTopPadding(topPadding + 44);
      // setStream(getMutatedStream);
    }
    // setTopPadding(topPadding + 44);
    setStream(getMutatedStream);
  }, intervalDelay);

  return (
    <div
      style={{
        marginTop: topPadding,
        fontFamily: "matrixFont",
        color: "#20c20e",
        writingMode: "vertical-rl",
        textOrientation: "upright",
        whiteSpace: "nowrap",
        userSelect: "none",
        textShadow: "0px 0px 8px rgba(32, 194, 14, 0.8)",
        fontSize: 50,
      }}
    >
      {stream.map((char, index) => (
        <a
          style={{
            color: index === stream.length - 1 ? "#fff" : undefined,
            opacity: index < 6 ? 0.1 + index * 0.15 : 1,
            textShadow:
              index === stream.length - 1
                ? "0px 0px 20px rgba(255, 255, 255, 1)"
                : undefined,
            marginTop: -12,
          }}
        >
          {char}
        </a>
      ))}
    </div>
  );
};

const useInterval = (callback) => {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    let id = setInterval(tick, 100);
    return () => clearInterval(id);
  }, []);
};

export default RainStream;
