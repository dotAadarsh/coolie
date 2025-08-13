import { useState, useEffect } from 'react';
import backgroundImage from './assets/Coolie-poster.jpg';

export default function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2025-08-15T19:10:00');

    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-2 drop-shadow-lg text-yellow-400">
              Coolie
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              Starts August 15, 2025 at 7:10 PM
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {['Days', 'Hours', 'Minutes', 'Seconds'].map((label, i) => {
              const value = [
                timeLeft.days,
                timeLeft.hours,
                timeLeft.minutes,
                timeLeft.seconds
              ][i];
              return (
                <div
                  key={label}
                  className="backdrop-blur-sm rounded-lg p-4 md:p-6 border border-yellow-400/30 bg-gray-950/80"
                >
                  <div className="text-3xl md:text-5xl font-bold mb-2 text-yellow-400">
                    {value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm md:text-base text-gray-400 uppercase tracking-wide">
                    {label}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-lg md:text-xl font-medium text-yellow-400">
            Time remaining until showtime
          </div>

          <div className="relative w-full h-96 mt-8 rounded-lg overflow-hidden border-4 border-yellow-400 shadow-lg">
            <iframe
              title="Coolie Movie Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.088390717098!2d80.20525572513169!3d13.030042963594191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526721ece14b25%3A0x5bcb94ab2e680caa!2sKasi%20Theatre!5e0!3m2!1sen!2sin!4v1755086465173!5m2!1sen!2sin"
              className="w-full h-full"
              style={{ filter: 'grayscale(10%) invert(90%) contrast(90%) brightness(80%)' }}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

