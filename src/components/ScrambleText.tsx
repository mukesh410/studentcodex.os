import { useEffect, useState } from 'react';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';

interface ScrambleTextProps {
  text: string;
  isScrambling?: boolean;
}

export default function ScrambleText({ text, isScrambling }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!isScrambling) {
      setDisplay(text);
      return;
    }

    const interval = setInterval(() => {
      const scrambled = text
        .split('')
        .map(() => characters[Math.floor(Math.random() * characters.length)])
        .join('');
      setDisplay(scrambled);
    }, 60);

    return () => clearInterval(interval);
  }, [isScrambling, text]);

  return <span className="scramble-text">{display}</span>;
}
