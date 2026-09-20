import React from "react";
import { Wheat, Waves, Mountain, Globe } from "lucide-react";

export default function LangIcon({ name, className = "w-5 h-5" }: { name: string; className?: string }) {
  switch (name) {
    case "wheat":
      return <Wheat className={className} />;
    case "waves":
      return <Waves className={className} />;
    case "mountain":
      return <Mountain className={className} />;
    default:
      return <Globe className={className} />;
  }
}
