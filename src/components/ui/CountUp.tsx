import React, { useEffect, useState } from "react";
import { animate } from "motion/react";

export default function CountUp({ value, className }: { value: number; className?: string }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const c = animate(0, value, { duration: 0.9, ease: "easeOut", onUpdate: (v) => setShown(Math.round(v)) });
    return () => c.stop();
  }, [value]);
  return <span className={className}>{shown}</span>;
}
