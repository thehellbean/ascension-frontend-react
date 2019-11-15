import React from "react";

interface ProgressBarProps {
  progress: number;
  onSeek: (arg0: number) => void;
  buffered: number;
}

const barHeight = 8;

export default function ProgressBar(props: ProgressBarProps) {
  var progressBarStyle = {
    backgroundColor: "white",
    height: "100%",
    width: `${props.progress}%`,
    position: "relative" as "relative",
    marginTop: -barHeight / 2
  };

  var progressBarContainer = {
    padding: 2,
    position: "relative" as "relative",
    cursor: "pointer",
    width: "100%",
    height: barHeight
  };

  var bufferedBar = {
    width: `${props.buffered}%`,
    height: "100%",
    position: "relative" as "relative",
    backgroundColor: "gray"
  };

  const handleClick = (event: React.MouseEvent) => {
    const targetElement: HTMLElement = event.currentTarget as HTMLElement;
    props.onSeek(event.nativeEvent.offsetX / targetElement.offsetWidth);
  };

  return (
    <div style={progressBarContainer} onClick={handleClick}>
      <div style={bufferedBar} />
      <div style={progressBarStyle} />
    </div>
  );
}
