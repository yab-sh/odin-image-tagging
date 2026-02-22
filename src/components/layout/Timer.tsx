import { useGame } from "../../context/GameContext";
import "./Timer.css";

export default function Timer() {
  const { time } = useGame();

  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const centiseconds = Math.floor((time % 1000) / 10);

  const formatted =
    `${minutes.toString().padStart(2, "0")}:` +
    `${seconds.toString().padStart(2, "0")}:` +
    `${centiseconds.toString().padStart(2, "0")}`;

  return (
    <div className="timer">
      <h1>{formatted}</h1>
    </div>
  );
}