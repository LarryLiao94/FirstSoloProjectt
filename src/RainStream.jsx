import React, { useEffect, useState } from "react";
const VALID_CHARS = "abcdefghijklmnouqrstuvwxyz1234567890";
const STREAMMUTATION = .02;
const minstream = 15;
const maxstream = 50;

const getRandRange = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

const getRandChar = () =>
  VALID_CHARS.charAt(Math.floor(Math.random() * VALID_CHARS.length));

const genRandStream = () =>
  new Array(getRandRange(minstream, maxstream))
    .fill()
    .map((_) => getRandChar());

const getMutatedStream = stream => {
    const newStream = [];
    for(let i = 1; i < stream.length; i++){
        if(Math.random() < STREAMMUTATION){
            newStream.push(getRandChar());
        }
        else{
            newStream.push(stream[i]);
        }
    }
    newStream.push(getRandChar());
    return newStream;
}

const RainStream = props => {
    const [stream, setStream] = useState(genRandStream());
    const [topPadding, setTopPadding] = useState(stream.length * -50);
  useInterval(() => {
      if(topPadding > window.innerHeight){
          setTopPadding(0);
      }
      else{
          setTopPadding(topPadding + 44);
          setStream(stream => [...stream.slice(1, stream.length), getRandChar()])
      }
    setTopPadding(topPadding + 44);
  }, 100);

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

const useInterval = callback => {
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
