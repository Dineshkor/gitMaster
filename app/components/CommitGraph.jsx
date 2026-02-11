"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const BRANCH_COLORS = {
    main: "#00e5ff",
    master: "#00e5ff",
    feature: "#39ff14",
    "feature-login": "#39ff14",
    "feature-x": "#39ff14",
    hotfix: "#ff006e",
    release: "#ffb000",
    develop: "#a855f7",
};

function getBranchColor(name) {
    if (BRANCH_COLORS[name]) return BRANCH_COLORS[name];
    for (const key of Object.keys(BRANCH_COLORS)) {
        if (name.startsWith(key)) return BRANCH_COLORS[key];
    }
    const hash = [...name].reduce((a, c) => a + c.charCodeAt(0), 0);
    const colors = ["#06b6d4", "#f43f5e", "#8b5cf6", "#eab308", "#ec4899"];
    return colors[hash % colors.length];
}

export default function CommitGraph({ commits = [], branches = [], head, detached, conflict, onNodeClick }) {
    const canvasRef = useRef(null);
    const nodeRadius = 14;
    const nodeSpacingY = 70;
    const startX = 80;
    const startY = 40;

    // Group commits by branch for layout
    const branchLanes = {};
    branches.forEach((b, i) => { branchLanes[b] = i; });

    return (
        <div className="relative w-full h-full overflow-auto p-4">
            <svg className="w-full" style={{ minHeight: Math.max(300, commits.length * nodeSpacingY + 80) }}>
                {/* Branch lines */}
                {commits.length > 1 && commits.map((commit, i) => {
                    if (i === 0) return null;
                    const prevCommit = commits[i - 1];
                    const lane = branchLanes[commit.branch] || 0;
                    const prevLane = branchLanes[prevCommit.branch] || 0;
                    const x1 = startX + prevLane * 100;
                    const y1 = startY + (i - 1) * nodeSpacingY;
                    const x2 = startX + lane * 100;
                    const y2 = startY + i * nodeSpacingY;
                    const color = getBranchColor(commit.branch);

                    if (lane !== prevLane) {
                        return (
                            <motion.path
                                key={`line-${i}`}
                                d={`M ${x1} ${y1} C ${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2}`}
                                fill="none"
                                stroke={color}
                                strokeWidth={2.5}
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.6 }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                            />
                        );
                    }

                    return (
                        <motion.line
                            key={`line-${i}`}
                            x1={x1} y1={y1} x2={x2} y2={y2}
                            stroke={color}
                            strokeWidth={2.5}
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.6 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                        />
                    );
                })}

                {/* Commit nodes */}
                {commits.map((commit, i) => {
                    const lane = branchLanes[commit.branch] || 0;
                    const cx = startX + lane * 100;
                    const cy = startY + i * nodeSpacingY;
                    const color = getBranchColor(commit.branch);
                    const isHead = (!detached && head === commit.branch && i === commits.filter(c => c.branch === commit.branch).length - 1) ||
                        (detached && head === commit.id);
                    const isConflict = conflict && i === commits.length - 1;

                    return (
                        <g key={commit.id}>
                            {/* Glow */}
                            {isHead && (
                                <motion.circle
                                    cx={cx} cy={cy} r={nodeRadius + 8}
                                    fill="none"
                                    stroke={color}
                                    strokeWidth={1.5}
                                    className="pulse-ring"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.4 }}
                                />
                            )}

                            {/* Node */}
                            <motion.circle
                                cx={cx} cy={cy} r={nodeRadius}
                                fill={isConflict ? "#ff006e" : color}
                                stroke={isHead ? "#fff" : color}
                                strokeWidth={isHead ? 3 : 1.5}
                                style={{ filter: `drop-shadow(0 0 ${isHead ? 12 : 6}px ${color}50)` }}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.1 }}
                                className="commit-node cursor-pointer"
                                onClick={() => onNodeClick?.(commit)}
                            />

                            {/* Commit hash */}
                            <motion.text
                                x={cx} y={cy + 1}
                                textAnchor="middle"
                                dominantBaseline="central"
                                fill="#0a0e17"
                                fontSize={8}
                                fontFamily="var(--font-mono)"
                                fontWeight={700}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.1 + 0.2 }}
                            >
                                {(commit.id || "").slice(0, 4)}
                            </motion.text>

                            {/* Commit message */}
                            <motion.text
                                x={cx + nodeRadius + 12}
                                y={cy + 1}
                                dominantBaseline="central"
                                fill="#94a3b8"
                                fontSize={11}
                                fontFamily="var(--font-mono)"
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 + 0.3 }}
                            >
                                {commit.msg}
                            </motion.text>

                            {/* HEAD pointer */}
                            {isHead && (
                                <motion.g
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 + 0.4 }}
                                >
                                    <rect
                                        x={cx - nodeRadius - 55}
                                        y={cy - 10}
                                        width={40}
                                        height={20}
                                        rx={4}
                                        fill={detached ? "#ff006e" : color}
                                        opacity={0.15}
                                        stroke={detached ? "#ff006e" : color}
                                        strokeWidth={1}
                                    />
                                    <text
                                        x={cx - nodeRadius - 35}
                                        y={cy + 1}
                                        textAnchor="middle"
                                        dominantBaseline="central"
                                        fill={detached ? "#ff006e" : color}
                                        fontSize={9}
                                        fontFamily="var(--font-mono)"
                                        fontWeight={700}
                                    >
                                        HEAD
                                    </text>
                                    <text
                                        x={cx - nodeRadius - 35}
                                        y={cy + 14}
                                        textAnchor="middle"
                                        dominantBaseline="central"
                                        fill="#64748b"
                                        fontSize={7}
                                        fontFamily="var(--font-mono)"
                                    >
                                        (you are here)
                                    </text>
                                </motion.g>
                            )}

                            {/* Conflict marker */}
                            {isConflict && (
                                <motion.text
                                    x={cx}
                                    y={cy - nodeRadius - 10}
                                    textAnchor="middle"
                                    fill="#ff006e"
                                    fontSize={16}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: [0.5, 1, 0.5], y: 0 }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                    ⚡
                                </motion.text>
                            )}
                        </g>
                    );
                })}

                {/* Branch labels */}
                {branches.map((branch, i) => {
                    const color = getBranchColor(branch);
                    const lastCommit = [...commits].reverse().find(c => c.branch === branch);
                    const idx = lastCommit ? commits.indexOf(lastCommit) : 0;
                    const cx = startX + i * 100;
                    const cy = startY + idx * nodeSpacingY;

                    return (
                        <motion.g
                            key={branch}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <rect
                                x={cx - branch.length * 3.5 - 8}
                                y={cy + nodeRadius + 8}
                                width={branch.length * 7 + 16}
                                height={22}
                                rx={11}
                                fill={color}
                                opacity={0.12}
                                stroke={color}
                                strokeWidth={1}
                            />
                            <text
                                x={cx}
                                y={cy + nodeRadius + 20}
                                textAnchor="middle"
                                dominantBaseline="central"
                                fill={color}
                                fontSize={10}
                                fontFamily="var(--font-mono)"
                                fontWeight={600}
                            >
                                {branch}
                            </text>
                            <text
                                x={cx}
                                y={cy + nodeRadius + 34}
                                textAnchor="middle"
                                dominantBaseline="central"
                                fill="#64748b"
                                fontSize={7}
                                fontFamily="var(--font-mono)"
                            >
                                {branch === "main" || branch === "master" ? "(default branch)" : branch.startsWith("feature") || branch.startsWith("hotfix") ? "(your branch)" : "(branch)"}
                            </text>
                        </motion.g>
                    );
                })}
            </svg>
        </div>
    );
}
