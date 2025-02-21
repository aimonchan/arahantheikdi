// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
//               src/app/page.js
//             </code>
//             .
//           </li>
//           <li>Save and see your changes instantly.</li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }
"use client";

import { useState } from 'react';

export default function Home() {
  const [remainingTimes, setRemainingTimes] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [interval, setInterval] = useState(0);
  const [restTime, setRestTime] = useState(0);
  const [intervalCounter, setIntervalCounter] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);

  const playAudio = () => {
    if (remainingTimes > 0) {
      const audio = new Audio('/audio/arahanbagawa2.mp3');
      setCurrentAudio(audio);
      audio.play().then(() => {
        console.log('Audio is playing');
        audio.onended = () => {
          if (!isPaused) {
            setCompleted(prev => prev + 1);
            setRemainingTimes(prev => prev - 1);
            setIntervalCounter(prev => prev + 1);

            if (intervalCounter >= interval && interval > 0) {
              setIntervalCounter(0);
              setTimeout(playAudio, restTime * 1000);
            } else {
              playAudio();
            }
          }
        };
      }).catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  };

  const handlePlayClick = () => {
    if (remainingTimes === 0) {
      const times = parseInt(document.getElementById('timesInput').value, 10);
      const intervalValue = parseInt(document.getElementById('intervalInput').value, 10);
      const restTimeValue = parseInt(document.getElementById('restTimeInput').value, 10);

      if (isNaN(times) || times <= 0 || isNaN(intervalValue) || intervalValue <= 0 || isNaN(restTimeValue) || restTimeValue < 0) {
        alert('Please enter valid numbers for times, interval, and rest time');
        return;
      }
      setRemainingTimes(times);
      setInterval(intervalValue);
      setRestTime(restTimeValue);
    }
    setIsPaused(false);
    playAudio();
  };

  const handlePauseClick = () => {
    if (currentAudio) {
      if (currentAudio.paused) {
        currentAudio.play();
        setIsPaused(false);
      } else {
        currentAudio.pause();
        setIsPaused(true);
      }
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <input type="number" id="timesInput" placeholder="Enter number of times" style={{ color: 'black' }} />
        <input type="number" id="intervalInput" placeholder="Enter interval" style={{ color: 'black' }} />
        <input type="number" id="restTimeInput" placeholder="Enter rest time (seconds)" style={{ color: 'black' }} />
        <button id="playButton" onClick={handlePlayClick}>Play Audio</button>
        <button id="pauseButton" onClick={handlePauseClick}>Pause Audio</button>
        <p id="completedTimes">Completed: {completed} times</p>
      </main>
    </div>
  );
}