import { useState } from "react";
import { Trash2, Edit3, CheckSquare } from "lucide-react";
import { GlassCard } from "./ui/glass-card";
import { GlassButton } from "./ui/glass-button";

export interface Note {
  id: string;
  title: string;
  content: string;
  type: "note" | "task";
  completed?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onToggleComplete?: (id: string) => void;
  isAnimationPaused: boolean;
}

export const NoteCard = ({ 
  note, 
  onEdit, 
  onDelete, 
  onToggleComplete,
  isAnimationPaused 
}: NoteCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const animationClass = isAnimationPaused ? "" : "float-animation";
  const delayClass = `delay-[${Math.random() * 2000}ms]`;

  return (
    <GlassCard
      variant="note"
      className={`relative group ${animationClass} ${delayClass} min-h-[180px] w-full max-w-sm`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onEdit(note)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {note.type === "task" && (
            <CheckSquare 
              className={`w-5 h-5 cursor-pointer ios-transition ${
                note.completed ? 'text-primary fill-primary' : 'text-muted-foreground'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleComplete?.(note.id);
              }}
            />
          )}
          <h3 className={`font-semibold text-lg truncate ${
            note.completed ? 'line-through text-muted-foreground' : 'text-glass-card-foreground'
          }`}>
            {note.title || "Untitled"}
          </h3>
        </div>
        
        {/* Action Buttons */}
        <div className={`flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
          <GlassButton
            variant="icon"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(note);
            }}
            className="w-8 h-8 rounded-lg"
          >
            <Edit3 className="w-4 h-4" />
          </GlassButton>
          
          <GlassButton
            variant="icon"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note.id);
            }}
            className="w-8 h-8 rounded-lg hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </GlassButton>
        </div>
      </div>

      {/* Content Preview */}
      <div className="flex-1">
        <p className={`text-sm leading-relaxed line-clamp-4 ${
          note.completed ? 'line-through text-muted-foreground' : 'text-muted-foreground'
        }`}>
          {note.content || "No content..."}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-glass-card-border/20">
        <p className="text-xs text-muted-foreground">
          {note.updatedAt.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>

      {/* Glassmorphism Overlay on Hover */}
      {isHovered && (
        <div className="absolute inset-0 bg-primary/5 rounded-2xl pointer-events-none transition-opacity duration-300" />
      )}
    </GlassCard>
  );
};