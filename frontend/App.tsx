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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
              Coolie Movie
            </h1>
            <p className="text-xl md:text-2xl text-purple-200">
              Starts August 15, 2025 at 7:10 PM
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-white/20">
              <div className="text-3xl md:text-5xl font-bold text-white mb-2">
                {timeLeft.days.toString().padStart(2, '0')}
              </div>
              <div className="text-sm md:text-base text-purple-200 uppercase tracking-wide">
                Days
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-white/20">
              <div className="text-3xl md:text-5xl font-bold text-white mb-2">
                {timeLeft.hours.toString().padStart(2, '0')}
              </div>
              <div className="text-sm md:text-base text-purple-200 uppercase tracking-wide">
                Hours
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-white/20">
              <div className="text-3xl md:text-5xl font-bold text-white mb-2">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </div>
              <div className="text-sm md:text-base text-purple-200 uppercase tracking-wide">
                Minutes
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-white/20">
              <div className="text-3xl md:text-5xl font-bold text-white mb-2">
                {timeLeft.seconds.toString().padStart(2, '0')}
              </div>
              <div className="text-sm md:text-base text-purple-200 uppercase tracking-wide">
                Seconds
              </div>
            </div>
          </div>

          <div className="text-lg md:text-xl text-purple-100 font-medium">
            Time remaining until showtime
          </div>
        </div>
      </div>
    </div>
  );
}
