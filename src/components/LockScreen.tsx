import { useState } from "react";
import { Lock, Unlock } from "lucide-react";
import { GlassCard } from "./ui/glass-card";
import { GlassButton } from "./ui/glass-button";

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen = ({ onUnlock }: LockScreenProps) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const correctPin = "1234"; // In a real app, this would be stored securely

  const handleNumberClick = (number: string) => {
    if (pin.length < 4) {
      const newPin = pin + number;
      setPin(newPin);
      
      if (newPin.length === 4) {
        if (newPin === correctPin) {
          onUnlock();
        } else {
          setError("PIN incorreto");
          setTimeout(() => {
            setPin("");
            setError("");
          }, 1000);
        }
      }
    }
  };

  const handleClear = () => {
    setPin("");
    setError("");
  };

  const numbers = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["", "0", "⌫"]
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 animate-slide-up">
      <GlassCard variant="floating" className="w-full max-w-sm text-center">
        <div className="space-y-8">
          {/* Lock Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="w-10 h-10 text-primary" />
            </div>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-2xl font-bold text-glass-card-foreground mb-2">
              GlassNote
            </h1>
            <p className="text-muted-foreground">
              Digite seu PIN para continuar
            </p>
          </div>

          {/* PIN Display */}
          <div className="flex justify-center gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full border-2 transition-colors ${
                  index < pin.length
                    ? "bg-primary border-primary"
                    : "border-muted-foreground/30"
                }`}
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-destructive text-sm animate-scale-bounce">
              {error}
            </p>
          )}

          {/* Number Pad */}
          <div className="grid grid-cols-3 gap-3">
            {numbers.map((row, rowIndex) =>
              row.map((number, colIndex) => {
                if (number === "") return <div key={`${rowIndex}-${colIndex}`} />;
                
                return (
                  <GlassButton
                    key={number}
                    variant="icon"
                    size="lg"
                    onClick={() => {
                      if (number === "⌫") {
                        setPin(pin.slice(0, -1));
                      } else {
                        handleNumberClick(number);
                      }
                    }}
                    className="w-16 h-16 rounded-full text-xl font-semibold"
                  >
                    {number}
                  </GlassButton>
                );
              })
            )}
          </div>

          {/* Unlock Button */}
          <GlassButton
            variant="floating"
            onClick={onUnlock}
            className="w-full rounded-xl py-4"
          >
            <Unlock className="w-5 h-5 mr-2" />
            Desbloquear sem PIN
          </GlassButton>
        </div>
      </GlassCard>
    </div>
  );
};