import React from "react";
import { Footprints, GraduationCap, Flame, Award, BookMarked, Trophy, RotateCcw, Puzzle, Mic, Send, Landmark } from "lucide-react";

export default function BadgeIcon({ name, className = "w-5 h-5" }: { name: string; className?: string }) {
  const map: Record<string, React.ComponentType<{ className?: string }>> = {
    footprints: Footprints, grad: GraduationCap, flame: Flame, award: Award, book: BookMarked,
    trophy: Trophy, rotate: RotateCcw, puzzle: Puzzle, mic: Mic, send: Send, landmark: Landmark,
  };
  const I = map[name] || Award;
  return <I className={className} />;
}
