import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface SpinWheelProps {
  onSpin?: (letter: string) => void;
}

const SpinWheel: React.FC<SpinWheelProps> = ({ onSpin }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  
  // Generate alphabet segments
  const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  
  // Generate colors for each segment
  const getSegmentColor = (index: number) => {
    const hue = (index * 360) / 26;
    return `hsl(${hue}, 75%, 60%)`;
  };

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setSelectedLetter(null);
    
    // Generate random rotation (3-8 full rotations + random position)
    const baseRotation = 360 * (3 + Math.random() * 5);
    const randomAngle = Math.random() * 360;
    const totalRotation = baseRotation + randomAngle;
    
    // Calculate which letter the wheel lands on
    const segmentAngle = 360 / 26;
    const finalAngle = (360 - (totalRotation % 360)) % 360;
    const selectedIndex = Math.floor(finalAngle / segmentAngle);
    const letter = letters[selectedIndex];
    
    if (wheelRef.current) {
      wheelRef.current.style.setProperty('--spin-rotation', `${totalRotation}deg`);
      wheelRef.current.style.animation = 'none';
      // Force reflow
      wheelRef.current.offsetHeight;
      wheelRef.current.style.animation = 'spin-wheel 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
    }
    
    // Set result after animation completes
    setTimeout(() => {
      setSelectedLetter(letter);
      setIsSpinning(false);
      onSpin?.(letter);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Wheel Container */}
      <div className="relative">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-b-[30px] border-l-transparent border-r-transparent border-b-foreground drop-shadow-md"></div>
        </div>
        
        {/* Wheel */}
        <div
          ref={wheelRef}
          className="relative w-80 h-80 md:w-96 md:h-96 rounded-full shadow-wheel border-4 border-foreground overflow-hidden"
          style={{
            background: `conic-gradient(${letters.map((_, i) => 
              `${getSegmentColor(i)} ${(i * 360) / 26}deg ${((i + 1) * 360) / 26}deg`
            ).join(', ')})`
          }}
        >
          {/* Letters */}
          {letters.map((letter, index) => {
            const angle = (index * 360) / 26;
            const rotation = angle + (360 / 26) / 2; // Center the letter in segment
            
            return (
              <div
                key={letter}
                className="absolute w-full h-full flex items-start justify-center"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transformOrigin: 'center'
                }}
              >
                <div 
                  className="text-xl md:text-2xl font-bold text-white drop-shadow-lg mt-6"
                  style={{ transform: 'rotate(0deg)' }}
                >
                  {letter}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Center Hub */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-foreground rounded-full border-2 border-background shadow-lg"></div>
      </div>

      {/* Spin Button */}
      <Button 
        onClick={spinWheel}
        disabled={isSpinning}
        size="lg"
        className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-6 animate-glow-pulse disabled:animate-none"
      >
        {isSpinning ? 'Spinning...' : 'SPIN THE WHEEL'}
      </Button>

      {/* Result Display */}
      {selectedLetter && !isSpinning && (
        <Card className="p-8 bg-card border-game-primary border-2 animate-bounce-in">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-success bg-clip-text text-transparent">
              🎉 Congratulations! 🎉
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Your letter is:
            </p>
            <div 
              className="text-6xl md:text-8xl font-bold text-white px-6 py-4 rounded-2xl shadow-lg inline-block"
              style={{ 
                backgroundColor: getSegmentColor(selectedLetter.charCodeAt(0) - 65),
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              {selectedLetter}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SpinWheel;