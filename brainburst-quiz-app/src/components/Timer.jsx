import React, { useEffect, useState } from 'react';

function Timer({ initialTime = 30, onTimeUp = () => {}, resetKey }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime, resetKey]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const id = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [timeLeft, onTimeUp]);

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const ss = String(timeLeft % 60).padStart(2, '0');

  return (
    <div className="text-right text-sm font-medium text-red-500">
      {mm}:{ss}
    </div>
  );
}

export default Timer;
