import React from "react";
import { motion } from "motion/react";

export default function PageHeader({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex items-end justify-between gap-4 pt-2"
    >
      <div className="min-w-0">
        <h1 className="text-[28px] leading-tight font-semibold tracking-tight text-neutral-900">{title}</h1>
        {subtitle && <p className="text-sm text-neutral-500 mt-1 leading-snug">{subtitle}</p>}
      </div>
      {right}
    </motion.div>
  );
}
