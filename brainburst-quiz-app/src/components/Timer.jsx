import { useEffect, useRef, useState } from "react";

function Timer({ initialTime = 30, onTimeUp = () => {}, resetKey }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const firedRef = useRef(false);

  // Reset timer when question changes
  useEffect(() => {
    setTimeLeft(initialTime);
    firedRef.current = false;
  }, [initialTime, resetKey]);

  // Single interval per question
  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          // stop at 0
          clearInterval(id);

          // fire once
          if (!firedRef.current) {
            firedRef.current = true;
            onTimeUp();
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [resetKey, onTimeUp]);

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="text-right text-sm font-medium text-red-500">
      {mm}:{ss}
    </div>
  );
}

export default Timer;