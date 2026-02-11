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
        committed: files.filter(f => ["committed", "system", "ignored"].includes(f.status)),
        conflict: files.filter(f => f.status === "conflict"),
    };

    const AreaBox = ({ title, icon, color, areaFiles }) => (
        <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-mono font-semibold" style={{ color }}>{icon}</span>
                <span className="text-xs font-mono uppercase tracking-wider" style={{ color }}>{title}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full" style={{ background: `${color}15`, color }}>
                    {areaFiles.length}
                </span>
            </div>
            <div className="space-y-1.5 min-h-[48px] p-2 rounded-lg border border-border/50 bg-bg-primary/50">
                <AnimatePresence>
                    {areaFiles.map((file) => {
                        const cfg = STATUS_CONFIG[file.status] || STATUS_CONFIG.untracked;
                        return (
                            <motion.div
                                key={file.name}
                                layout
                                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-mono"
                                style={{ background: cfg.bg, border: `1px solid ${cfg.color}20` }}
                            >
                                <span className="w-4 h-4 rounded flex items-center justify-center text-[9px] font-bold"
                                    style={{ background: `${cfg.color}20`, color: cfg.color }}>
                                    {cfg.icon}
                                </span>
                                <span style={{ color: cfg.color }}>{file.name}</span>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
                {areaFiles.length === 0 && (
                    <div className="text-[10px] font-mono text-text-muted text-center py-3 opacity-50">empty</div>
                )}
            </div>
        </div>
    );

    return (
        <div className="space-y-3">
            <div className="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-1">File States</div>
            {areas.conflict.length > 0 && (
                <AreaBox title="Conflicts" icon="⚡" color="#ff006e" areaFiles={areas.conflict} />
            )}
            <div className="flex gap-3">
                <AreaBox title="Working" icon="📂" color="#ffb000" areaFiles={areas.working} />
                <AreaBox title="Staging" icon="📋" color="#39ff14" areaFiles={areas.staging} />
            </div>
            <AreaBox title="Repository" icon="📦" color="#00e5ff" areaFiles={areas.committed} />
        </div>
    );
}
