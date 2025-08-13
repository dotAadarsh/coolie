import { useState, useEffect } from "react";

const YOUTUBE_PLAYLIST_ID = "PLmSPJ6nq7sbVHEgzaR7N7R2nHZUjka1ry";

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT: any;
  }
}

export default function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMuted, setIsMuted] = useState(true);
  const [player, setPlayer] = useState<any>(null);

  // Countdown timer
  useEffect(() => {
    const targetDate = new Date("2025-08-15T19:10:00");

    const updateTimer = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // YouTube background music
  useEffect(() => {
    window.onYouTubeIframeAPIReady = () => {
      if (window.YT) {
        const newPlayer = new window.YT.Player("youtube-player", {
          playerVars: {
            list: YOUTUBE_PLAYLIST_ID,
            autoplay: 1,
            loop: 1,
            mute: 1,
            controls: 0,
            showinfo: 0,
            rel: 0,
            iv_load_policy: 3,
            shuffle: 1,
            playlist: YOUTUBE_PLAYLIST_ID,
          },
          events: {
            onReady: (event: { target: any }) => {
              setPlayer(event.target);
              event.target.playVideo();
            },
          },
        });
      }
    };

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      delete window.onYouTubeIframeAPIReady;
    };
  }, []);

  const handleMuteToggle = () => {
    if (player) {
      isMuted ? player.unMute() : player.mute();
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <div id="youtube-player" className="w-full h-full object-cover"></div>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/85 z-10"></div>

      {/* Content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-yellow-400">
              Coolie
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              Starts August 15, 2025 at 7:10 PM
            </p>
          </div>

          {/* Countdown */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => {
              const value = [
                timeLeft.days,
                timeLeft.hours,
                timeLeft.minutes,
                timeLeft.seconds,
              ][i];
              return (
                <div
                  key={label}
                  className="backdrop-blur-sm rounded-lg p-4 md:p-6 border border-yellow-400/30 bg-gray-950/80"
                >
                  <div className="text-3xl md:text-5xl font-bold text-yellow-400">
                    {value.toString().padStart(2, "0")}
                  </div>
                  <div className="text-sm md:text-base text-gray-400 uppercase">
                    {label}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-lg md:text-xl font-medium text-yellow-400">
            Time remaining until showtime
          </div>

          {/* Map */}
          <div className="relative w-full h-96 mt-8 rounded-lg overflow-hidden border-4 border-yellow-400">
            <iframe
              title="Coolie Movie Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.088390717098!2d80.20525572513169!3d13.030042963594191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526721ece14b25%3A0x5bcb94ab2e680caa!2sKasi%20Theatre!5e0!3m2!1sen!2sin!4v1755086465173!5m2!1sen!2sin"
              className="w-full h-full"
              style={{
                filter:
                  "grayscale(10%) invert(90%) contrast(90%) brightness(80%)",
              }}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Mute/Unmute button */}
      <button
        onClick={handleMuteToggle}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-gray-900/70 backdrop-blur-md flex items-center justify-center border-2 border-yellow-400 text-yellow-400"
        aria-label={isMuted ? "Unmute music" : "Mute music"}
      >
        {isMuted ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="22" y1="9" x2="16" y2="15"></line>
            <line x1="16" y1="9" x2="22" y2="15"></line>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
          </svg>
        )}
      </button>
    </div>
  );
}
