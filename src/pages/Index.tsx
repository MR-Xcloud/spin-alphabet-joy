import React, { useState } from "react";
import SpinWheel from "@/components/SpinWheel";
import { Card } from "@/components/ui/card";
import MitsubishiLogo from "@/components/MitsubishiLogo";

const Index = () => {
  const [gameStats, setGameStats] = useState({
    totalSpins: 0,
    lastWinners: [] as string[],
  });

  const handleSpin = (letter: string) => {
    setGameStats((prev) => ({
      totalSpins: prev.totalSpins + 1,
      lastWinners: [letter, ...prev.lastWinners.slice(0, 4)],
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="text-center py-8 px-4">
        {/* <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4"> */}
        <MitsubishiLogo />
        {/* </h1> */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {/* Test your luck with our professional spin wheel! Click the button to
          spin and discover your lucky letter. */}
          The wheel will have the names of the people who have scanned the QR code.
        </p>
      </header>

      {/* Main Game Area */}
      <main className="flex flex-col items-center px-4 pb-8">
        <SpinWheel onSpin={handleSpin} />

        {/* Stats */}
        {/* {gameStats.totalSpins > 0 && (
          <Card className="mt-8 p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Game Stats
              </h3>
              <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spins</p>
                  <p className="text-2xl font-bold text-game-primary">
                    {gameStats.totalSpins}
                  </p>
                </div>
                {gameStats.lastWinners.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Recent Letters
                    </p>
                    <div className="flex space-x-2 justify-center mt-2">
                      {gameStats.lastWinners.map((letter, index) => (
                        <span
                          key={index}
                          className="w-8 h-8 bg-game-secondary text-white rounded text-sm font-bold flex items-center justify-center"
                        >
                          {letter}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        )} */}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 px-4 border-t border-border/20">
        <p className="text-sm text-muted-foreground">
          Enjoy playing responsibly! Each spin is completely random.
        </p>
      </footer>
    </div>
  );
};

export default Index;