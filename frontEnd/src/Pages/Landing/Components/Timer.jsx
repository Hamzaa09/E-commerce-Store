import { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa";

const Timer = ({ time }) => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const totalMs =
      ((time.Day || 0) * 24 * 60 * 60 +
       (time.Hour || 0) * 60 * 60 +
       (time.Min || 0) * 60 +
       (time.Sec || 0)) * 1000;

    const target = Date.now() + totalMs;

    let interval; // ✅ Declare it here

    const updateTime = () => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval); // ✅ Now this won't throw
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };

    interval = setInterval(updateTime, 1000);
    updateTime(); // Initial call

    return () => clearInterval(interval);
  }, [time]);

  return (
    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded shadow">
      <FaRegClock className="text-red-600" />
      <span className="text-red-600 font-semibold tracking-wide">
        {pad(timeLeft.days)} : {pad(timeLeft.hours)} : {pad(timeLeft.minutes)} : {pad(timeLeft.seconds)}
      </span>
    </div>
  );
};

const pad = (n) => String(n).padStart(2, "0");

export default Timer;
