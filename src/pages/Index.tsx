import { useState, useEffect } from "react";
import { FloatingActionButtons } from "@/components/FloatingActionButtons";
import { NoteCard, Note } from "@/components/NoteCard";
import { NoteEditor } from "@/components/NoteEditor";
import { LockScreen } from "@/components/LockScreen";
import { GlassCard } from "@/components/ui/glass-card";

const Index = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [isAnimationPaused, setIsAnimationPaused] = useState(false);
  const [currentView, setCurrentView] = useState<"home" | "editor" | "lock">("home");
  const [editingNote, setEditingNote] = useState<Note | undefined>(undefined);

  // Sample notes for demonstration
  useEffect(() => {
    const sampleNotes: Note[] = [
      {
        id: "1",
        title: "Bem-vindo ao GlassNote! 🎉",
        content: "Este é seu primeiro app de notas com design glassmorphism estilo iOS. Experimente criar novas notas e tarefas!",
        type: "note",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "2", 
        title: "Lista de Compras",
        content: "• Pão\n• Leite\n• Ovos\n• Frutas\n• Verduras",
        type: "task",
        completed: false,
        createdAt: new Date(Date.now() - 86400000),
        updatedAt: new Date(Date.now() - 86400000)
      },
      {
        id: "3",
        title: "Ideias para o Projeto",
        content: "Implementar sistema de notificações push, adicionar categorias de notas, sync na nuvem, modo dark automático...",
        type: "note",
        createdAt: new Date(Date.now() - 172800000),
        updatedAt: new Date(Date.now() - 172800000)
      }
    ];
    setNotes(sampleNotes);
  }, []);

  const handleLockToggle = () => {
    if (isLocked) {
      setCurrentView("lock");
    } else {
      setIsLocked(true);
    }
  };

  const handleUnlock = () => {
    setIsLocked(false);
    setCurrentView("home");
  };

  const handleAddNote = () => {
    setEditingNote(undefined);
    setCurrentView("editor");
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setCurrentView("editor");
  };

  const handleSaveNote = (noteData: Omit<Note, "id" | "createdAt" | "updatedAt">) => {
    if (editingNote) {
      // Update existing note
      setNotes(prev => prev.map(note => 
        note.id === editingNote.id
          ? { ...note, ...noteData, updatedAt: new Date() }
          : note
      ));
    } else {
      // Create new note
      const newNote: Note = {
        ...noteData,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setNotes(prev => [newNote, ...prev]);
    }
    setCurrentView("home");
  };

  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const handleToggleComplete = (id: string) => {
    setNotes(prev => prev.map(note =>
      note.id === id
        ? { ...note, completed: !note.completed, updatedAt: new Date() }
        : note
    ));
  };

  // Lock Screen
  if (currentView === "lock") {
    return <LockScreen onUnlock={handleUnlock} />;
  }

  // Note Editor
  if (currentView === "editor") {
    return (
      <NoteEditor
        note={editingNote}
        onSave={handleSaveNote}
        onBack={() => setCurrentView("home")}
      />
    );
  }

  // Main Home View
  return (
    <div className="min-h-screen p-6 font-ios">
      {/* Header */}
      <div className="text-center mb-8 animate-slide-up">
        <h1 className="text-4xl font-bold text-glass-card-foreground mb-2">
          GlassNote
        </h1>
        <p className="text-muted-foreground text-lg">
          Suas notas com estilo iOS glassmorphism ✨
        </p>
      </div>

      {/* Notes Grid */}
      {notes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {notes.map((note, index) => (
            <div
              key={note.id}
              style={{ animationDelay: `${index * 200}ms` }}
              className="animate-slide-up"
            >
              <NoteCard
                note={note}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
                onToggleComplete={handleToggleComplete}
                isAnimationPaused={isAnimationPaused}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[400px]">
          <GlassCard variant="floating" className="text-center max-w-md">
            <div className="space-y-4">
              <div className="text-6xl">📝</div>
              <h3 className="text-xl font-semibold text-glass-card-foreground">
                Nenhuma nota ainda
              </h3>
              <p className="text-muted-foreground">
                Toque no botão + para criar sua primeira nota ou tarefa
              </p>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Floating Action Buttons */}
      <FloatingActionButtons
        onLockToggle={handleLockToggle}
        onAddNote={handleAddNote}
        onToggleAnimation={() => setIsAnimationPaused(!isAnimationPaused)}
        isLocked={isLocked}
        isAnimationPaused={isAnimationPaused}
      />
    </div>
  );
};

export default Index;
