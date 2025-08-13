import { useState, useEffect } from 'react';

export default function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Target date: August 15, 2025 at 7:10 PM
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
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #000000 0%, #0A0A0A 25%, #0C0C0C 50%, #080808 75%, #0B0B0B 100%)`
      }}
    >
      {/* Subtle overlay for depth */}
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(14, 14, 14, 0.3)' }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">
              Coolie
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              Starts August 15, 2025 at 7:10 PM
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div 
              className="backdrop-blur-sm rounded-lg p-4 md:p-6 border"
              style={{
                backgroundColor: 'rgba(12, 12, 12, 0.8)',
                borderColor: 'rgba(255, 255, 255, 0.1)'
              }}
            >
              <div className="text-3xl md:text-5xl font-bold text-white mb-2">
                {timeLeft.days.toString().padStart(2, '0')}
              </div>
              <div className="text-sm md:text-base text-gray-400 uppercase tracking-wide">
                Days
              </div>
            </div>

            <div 
              className="backdrop-blur-sm rounded-lg p-4 md:p-6 border"
              style={{
                backgroundColor: 'rgba(10, 10, 10, 0.8)',
                borderColor: 'rgba(255, 255, 255, 0.1)'
              }}
            >
              <div className="text-3xl md:text-5xl font-bold text-white mb-2">
                {timeLeft.hours.toString().padStart(2, '0')}
              </div>
              <div className="text-sm md:text-base text-gray-400 uppercase tracking-wide">
                Hours
              </div>
            </div>

            <div 
              className="backdrop-blur-sm rounded-lg p-4 md:p-6 border"
              style={{
                backgroundColor: 'rgba(8, 8, 8, 0.8)',
                borderColor: 'rgba(255, 255, 255, 0.1)'
              }}
            >
              <div className="text-3xl md:text-5xl font-bold text-white mb-2">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </div>
              <div className="text-sm md:text-base text-gray-400 uppercase tracking-wide">
                Minutes
              </div>
            </div>

            <div 
              className="backdrop-blur-sm rounded-lg p-4 md:p-6 border"
              style={{
                backgroundColor: 'rgba(11, 11, 11, 0.8)',
                borderColor: 'rgba(255, 255, 255, 0.1)'
              }}
            >
              <div className="text-3xl md:text-5xl font-bold text-white mb-2">
                {timeLeft.seconds.toString().padStart(2, '0')}
              </div>
              <div className="text-sm md:text-base text-gray-400 uppercase tracking-wide">
                Seconds
              </div>
            </div>
          </div>

          <div className="text-lg md:text-xl text-gray-300 font-medium">
            Time remaining until showtime
          </div>
        </div>
      </div>
    </div>
  );
}
