import { useState, useEffect } from "react";
import { ArrowLeft, Save, CheckSquare, FileText } from "lucide-react";
import { GlassCard } from "./ui/glass-card";
import { GlassButton } from "./ui/glass-button";
import { Note } from "./NoteCard";

interface NoteEditorProps {
  note?: Note;
  onSave: (note: Omit<Note, "id" | "createdAt" | "updatedAt">) => void;
  onBack: () => void;
}

export const NoteEditor = ({ note, onSave, onBack }: NoteEditorProps) => {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [type, setType] = useState<"note" | "task">(note?.type || "note");

  // Auto-save functionality
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (title.trim() || content.trim()) {
        handleSave();
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [title, content, type]);

  const handleSave = () => {
    onSave({
      title: title.trim() || "Untitled",
      content: content.trim(),
      type,
      completed: note?.completed || false
    });
  };

  const handleBack = () => {
    handleSave();
    onBack();
  };

  return (
    <div className="min-h-screen p-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <GlassButton
          variant="icon"
          onClick={handleBack}
          className="w-12 h-12 rounded-xl"
        >
          <ArrowLeft className="w-6 h-6" />
        </GlassButton>

        <div className="flex items-center gap-3">
          {/* Type Selector */}
          <div className="flex items-center glass-card p-1 rounded-xl">
            <GlassButton
              variant={type === "note" ? "floating" : "icon"}
              size="sm"
              onClick={() => setType("note")}
              className="w-10 h-10 rounded-lg"
            >
              <FileText className="w-5 h-5" />
            </GlassButton>
            <GlassButton
              variant={type === "task" ? "floating" : "icon"}
              size="sm"
              onClick={() => setType("task")}
              className="w-10 h-10 rounded-lg"
            >
              <CheckSquare className="w-5 h-5" />
            </GlassButton>
          </div>

          <GlassButton
            variant="floating"
            onClick={handleSave}
            className="w-12 h-12 rounded-xl"
          >
            <Save className="w-6 h-6" />
          </GlassButton>
        </div>
      </div>

      {/* Editor */}
      <GlassCard variant="floating" className="w-full max-w-4xl mx-auto">
        <div className="space-y-6">
          {/* Title Input */}
          <input
            type="text"
            placeholder={type === "task" ? "Task title..." : "Note title..."}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent border-none text-2xl font-bold text-glass-card-foreground placeholder:text-muted-foreground focus:outline-none"
            autoFocus
          />

          {/* Content Textarea */}
          <textarea
            placeholder={type === "task" ? "Task description..." : "Start writing your note..."}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-[400px] bg-transparent border-none text-lg text-glass-card-foreground placeholder:text-muted-foreground focus:outline-none resize-none leading-relaxed"
          />

          {/* Footer Info */}
          <div className="pt-4 border-t border-glass-card-border/20">
            <p className="text-sm text-muted-foreground">
              {type === "task" ? "📋 Task" : "📝 Note"} • Auto-saved • 
              {note ? ` Modified ${note.updatedAt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}` : " New"}
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};