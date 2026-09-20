import React from "react";
import { motion } from "motion/react";
import { Home, GraduationCap, BookA, BookOpen, SpellCheck, Landmark } from "lucide-react";
import { playSfx } from "../../utils/sfx";

export type TabId = "home" | "learn" | "dictionary" | "stories" | "guide" | "culture";

const TABS: { id: TabId; label: string; Icon: React.ComponentType<{ className?: string; strokeWidth?: number }> }[] = [
  { id: "home", label: "Home", Icon: Home },
  { id: "learn", label: "Learn", Icon: GraduationCap },
  { id: "dictionary", label: "Dictionary", Icon: BookA },
  { id: "stories", label: "Stories", Icon: BookOpen },
  { id: "guide", label: "Spelling guide", Icon: SpellCheck },
  { id: "culture", label: "Culture", Icon: Landmark },
];

/** Floating pill navigation (icon-only, like the reference screenshot). */
export default function BottomNav({ active, onChange }: { active: TabId; onChange: (t: TabId) => void }) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pointer-events-none"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 12px)" }}
      aria-label="Main navigation"
    >
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="pointer-events-auto flex items-center gap-1 rounded-full bg-neutral-900/95 backdrop-blur-xl p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.25)] ring-1 ring-white/10 w-full max-w-md justify-between"
      >
        {TABS.map(({ id, label, Icon }) => {
          const isActive = id === active;
          return (
            <button
              key={id}
              onClick={() => {
                playSfx("nav");
                onChange(id);
              }}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              title={label}
              className="relative flex-1 h-11 flex items-center justify-center rounded-full outline-none"
            >
              {isActive && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full bg-white/15"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}
              <motion.span whileTap={{ scale: 0.85 }} className="relative">
                <Icon className={`w-[22px] h-[22px] ${isActive ? "text-white" : "text-white/55"}`} strokeWidth={isActive ? 2.4 : 1.9} />
              </motion.span>
            </button>
          );
        })}
      </motion.div>
    </nav>
  );
}
