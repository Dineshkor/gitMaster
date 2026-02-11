"use client";
import { motion, AnimatePresence } from "framer-motion";

const STATUS_CONFIG = {
    untracked: { color: "#64748b", bg: "rgba(100,116,139,0.08)", label: "Untracked", icon: "?" },
    modified: { color: "#ffb000", bg: "rgba(255,176,0,0.08)", label: "Modified", icon: "M" },
    staged: { color: "#39ff14", bg: "rgba(57,255,20,0.08)", label: "Staged", icon: "S" },
    committed: { color: "#00e5ff", bg: "rgba(0,229,255,0.08)", label: "Committed", icon: "✓" },
    conflict: { color: "#ff006e", bg: "rgba(255,0,110,0.08)", label: "Conflict", icon: "!" },
    ignored: { color: "#334155", bg: "rgba(51,65,85,0.06)", label: "Ignored", icon: "×" },
    system: { color: "#475569", bg: "rgba(71,85,105,0.06)", label: "System", icon: "⚙" },
};

export default function FileStateView({ files = [] }) {
    const areas = {
        working: files.filter(f => ["untracked", "modified"].includes(f.status)),
        staging: files.filter(f => f.status === "staged"),
        repo: files.filter(f => f.status === "committed"),
        conflict: files.filter(f => f.status === "conflict")
    };

    const AreaBox = ({ title, desc, icon, color, areaFiles, stage }) => (
        <div className={`flex-1 flex flex-col min-w-[140px] h-full`}>
            <div className="mb-2 px-1">
                <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1.5">
                        <span className="text-sm" style={{ color }}>{icon}</span>
                        <span className="text-[10px] font-mono font-black uppercase tracking-widest" style={{ color }}>{title}</span>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 rounded-full bg-white/5 border border-white/10" style={{ color }}>
                        {areaFiles.length}
                    </span>
                </div>
                <div className="text-[8px] font-mono text-text-muted uppercase tracking-tighter opacity-60">{desc}</div>
            </div>

            <div className="flex-1 p-2 rounded-xl border border-white/5 bg-bg-primary/40 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                    background: `radial-gradient(circle at top left, ${color}33 0%, transparent 70%)`
                }} />

                <div className="relative z-10 space-y-1.5 h-full">
                    <AnimatePresence mode="popLayout">
                        {areaFiles.map((file) => {
                            const cfg = STATUS_CONFIG[file.status] || STATUS_CONFIG.untracked;
                            return (
                                <motion.div
                                    key={file.name}
                                    layoutId={file.name}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-[10px] font-mono border shadow-sm"
                                    style={{
                                        background: `${cfg.color}10`,
                                        borderColor: `${cfg.color}30`,
                                        color: cfg.color
                                    }}
                                >
                                    <div className="w-4 h-4 rounded-md flex items-center justify-center text-[8px] font-bold shrink-0"
                                        style={{ background: `${cfg.color}20` }}>
                                        {cfg.icon}
                                    </div>
                                    <span className="truncate">{file.name}</span>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                    {areaFiles.length === 0 && (
                        <div className="h-full flex items-center justify-center">
                            <div className="text-[9px] font-mono text-text-muted/30 uppercase tracking-widest rotate-[-15deg]">Empty</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-3">
                <div className="text-[10px] font-mono uppercase tracking-widest text-text-muted">The Three Stages of Git</div>
                {areas.conflict.length > 0 && (
                    <div className="px-2 py-0.5 rounded bg-accent-red/10 border border-accent-red/30 text-accent-red text-[8px] font-mono animate-pulse">
                        CONFLICT DETECTED
                    </div>
                )}
            </div>

            <div className="flex gap-4 h-full">
                <AreaBox
                    title="Working"
                    desc="Your Local Desk"
                    icon="📂"
                    color="#ffb000"
                    areaFiles={[...areas.working, ...areas.conflict]}
                />

                <div className="flex items-center opacity-20">
                    <svg width="12" height="24" viewBox="0 0 12 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2 4L10 12L2 20" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <AreaBox
                    title="Staging"
                    desc="Preparation Tray"
                    icon="📋"
                    color="#39ff14"
                    areaFiles={areas.staging}
                />

                <div className="flex items-center opacity-20">
                    <svg width="12" height="24" viewBox="0 0 12 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2 4L10 12L2 20" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <AreaBox
                    title="Repository"
                    desc="Project Vault"
                    icon="📦"
                    color="#00e5ff"
                    areaFiles={areas.repo}
                />
            </div>
        </div>
    );
}
