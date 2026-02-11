"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function DiffView({ diff = [] }) {
    if (!diff || diff.length === 0) return null;

    return (
        <div className="rounded-lg border border-border bg-bg-terminal overflow-hidden font-mono text-[11px] leading-tight mb-4">
            <div className="bg-bg-secondary px-3 py-1.5 border-b border-border flex items-center justify-between">
                <span className="text-text-muted uppercase tracking-widest text-[9px]">Visual Diff</span>
                <span className="text-[9px] text-accent-cyan opacity-60">git diff</span>
            </div>
            <div className="p-2 space-y-0.5">
                {diff.map((line, i) => {
                    const isAdded = line.startsWith("+");
                    const isRemoved = line.startsWith("-");
                    const isHeader = line.startsWith("@@");

                    let bgColor = "transparent";
                    let textColor = "text-text-secondary";

                    if (isAdded) {
                        bgColor = "rgba(57, 255, 20, 0.08)";
                        textColor = "text-accent-green";
                    } else if (isRemoved) {
                        bgColor = "rgba(255, 59, 48, 0.08)";
                        textColor = "text-accent-red";
                    } else if (isHeader) {
                        textColor = "text-accent-purple opacity-70";
                    }

                    return (
                        <div
                            key={i}
                            className={`px-2 py-0.5 rounded-sm flex gap-3 ${textColor}`}
                            style={{ backgroundColor: bgColor }}
                        >
                            <span className="w-4 select-none opacity-40 text-right">
                                {isAdded ? "+" : isRemoved ? "-" : " "}
                            </span>
                            <span className="whitespace-pre-wrap break-all">
                                {isAdded || isRemoved ? line.slice(1) : line}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
