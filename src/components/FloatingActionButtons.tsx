import { Lock, Plus, Pause, Play } from "lucide-react";
import { GlassButton } from "./ui/glass-button";

interface FloatingActionButtonsProps {
  onLockToggle: () => void;
  onAddNote: () => void;
  onToggleAnimation: () => void;
  isLocked: boolean;
  isAnimationPaused: boolean;
}

export const FloatingActionButtons = ({
  onLockToggle,
  onAddNote,
  onToggleAnimation,
  isLocked,
  isAnimationPaused
}: FloatingActionButtonsProps) => {
  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
      <GlassButton
        variant="floating"
        size="lg"
        onClick={onLockToggle}
        className="w-14 h-14 rounded-full"
        title={isLocked ? "Unlock App" : "Lock App"}
      >
        <Lock className={`w-6 h-6 ${isLocked ? 'text-destructive' : ''}`} />
      </GlassButton>

      <GlassButton
        variant="floating"
        size="lg"
        onClick={onAddNote}
        className="w-14 h-14 rounded-full"
        title="Add New Note"
      >
        <Plus className="w-6 h-6" />
      </GlassButton>

      <GlassButton
        variant="floating"
        size="lg"
        onClick={onToggleAnimation}
        className="w-14 h-14 rounded-full"
        title={isAnimationPaused ? "Resume Animation" : "Pause Animation"}
      >
        {isAnimationPaused ? (
          <Play className="w-6 h-6" />
        ) : (
          <Pause className="w-6 h-6" />
        )}
      </GlassButton>
    </div>
  );
};