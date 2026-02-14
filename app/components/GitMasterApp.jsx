"use client";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LESSONS } from "../data/lessons";
import Terminal from "./Terminal";
import CommitGraph from "./CommitGraph";
import FileStateView from "./FileStateView";
import DiffView from "./DiffView";

const CHEAT_SHEET = [
    { cat: "Setup", cmds: ["git init", "git clone <url>", "git config --global user.name \"Name\""] },
    { cat: "Changes", cmds: ["git status", "git add <file>", "git add .", "git commit -m \"msg\"", "git diff"] },
    { cat: "Branching", cmds: ["git branch <name>", "git checkout -b <name>", "git merge <branch>", "git rebase <branch>"] },
    { cat: "Remote", cmds: ["git remote -v", "git push origin <branch>", "git pull", "git fetch"] },
    { cat: "Undo", cmds: ["git restore <file>", "git reset HEAD~1", "git stash", "git stash pop"] },
    { cat: "History", cmds: ["git log --oneline", "git reflog", "git blame <file>", "git bisect start"] },
];

function loadProgress() {
    if (typeof window === "undefined") return { completedLessons: [], xp: 0, currentLesson: 1, achievements: [] };
    try {
        const saved = localStorage.getItem("gitmaster-progress");
        return saved ? JSON.parse(saved) : { completedLessons: [], xp: 0, currentLesson: 1, achievements: [] };
    } catch { return { completedLessons: [], xp: 0, currentLesson: 1, achievements: [] }; }
}

function saveProgress(p) {
    if (typeof window === "undefined") return;
    try { localStorage.setItem("gitmaster-progress", JSON.stringify(p)); } catch { }
}

export default function GitMasterApp() {
    const [progress, setProgress] = useState(loadProgress);
    const [lessonId, setLessonId] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showHint, setShowHint] = useState(false);
    const [hintLevel, setHintLevel] = useState(0);
    const [showCheatSheet, setShowCheatSheet] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);
    const [gitState, setGitState] = useState(null);
    const [selectedCommit, setSelectedCommit] = useState(null);
    const [notification, setNotification] = useState(null);
    const [vizCollapsed, setVizCollapsed] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [activeAction, setActiveAction] = useState(null); // Event bus for animations
    const [currentStepIdx, setCurrentStepIdx] = useState(0); // For multi-step challenges
    const [currentDiff, setCurrentDiff] = useState(null);
    const [showPractice, setShowPractice] = useState(false); // Two-phase flow: Theory -> Practice
    const [bonusPracticeMode, setBonusPracticeMode] = useState(false); // Bonus practice after quiz
    const [bonusPracticeStepIdx, setBonusPracticeStepIdx] = useState(0); // Step index for bonus practice
    const contentRef = useRef(null);
    const terminalRef = useRef(null);

    useEffect(() => {
        setIsMounted(true);
        const p = loadProgress();
        setProgress(p);
        setLessonId(p.currentLesson);
    }, []);

    const lesson = useMemo(() => LESSONS.find(l => l.id === lessonId), [lessonId]);

    useEffect(() => {
        if (lesson?.initialState) setGitState(structuredClone(lesson.initialState));
        setCurrentDiff(null);
        setNotification(null);

        // Trigger simulated teammate activity if lesson has metadata
        if (lesson?.teammateEvent) {
            setTimeout(() => {
                setNotification(lesson.teammateEvent);
            }, 2000);
        }
    }, [lesson]);

    useEffect(() => { saveProgress(progress); }, [progress]);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTop = 0;
        }
    }, [lessonId]);

    const completeLesson = useCallback(() => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2500);
        setProgress(prev => {
            const updated = {
                ...prev,
                completedLessons: prev.completedLessons.includes(lessonId) ? prev.completedLessons : [...prev.completedLessons, lessonId],
                xp: prev.completedLessons.includes(lessonId) ? prev.xp : prev.xp + (lesson?.xp || 50),
                currentLesson: Math.min(LESSONS.length, lessonId + 1),
            };
            // Achievements
            const newAch = [...(prev.achievements || [])];
            if (updated.completedLessons.length >= 1 && !newAch.includes("first_commit")) newAch.push("first_commit");
            if (updated.completedLessons.length >= 7 && !newAch.includes("fundamentals")) newAch.push("fundamentals");
            if (updated.completedLessons.length >= 13 && !newAch.includes("basics_done")) newAch.push("basics_done");
            if (updated.completedLessons.length >= 20 && !newAch.includes("branching_pro")) newAch.push("branching_pro");
            if (updated.completedLessons.length >= 35 && !newAch.includes("git_master")) newAch.push("git_master");
            updated.achievements = newAch;
            return updated;
        });
    }, [lessonId, lesson]);

    const handleQuizAnswer = useCallback((idx) => {
        if (answered) return;
        setSelectedAnswer(idx);
        setAnswered(true);
        if (idx === lesson?.challenge?.answer) {
            // If lesson has bonusPractice, don't auto-complete — let user try the bonus
            if (!lesson?.bonusPractice) {
                setTimeout(completeLesson, 600);
            }
        }
    }, [answered, lesson, completeLesson]);

    const retryQuiz = useCallback(() => {
        setAnswered(false);
        setSelectedAnswer(null);
        setShowHint(false);
        setHintLevel(0);
    }, []);

    const handleTerminalCommand = useCallback((cmd) => {
        if (!cmd || typeof cmd !== "string") return { success: false, output: [] };

        // Determine if we're in bonusPractice mode or normal terminal challenge
        const inBonusMode = bonusPracticeMode && lesson?.bonusPractice;
        const challengeSource = inBonusMode ? lesson.bonusPractice : lesson?.challenge;

        if (!inBonusMode && (!lesson?.challenge || lesson.challenge.type !== "terminal")) {
            return { success: false, output: [{ text: "This lesson uses a quiz challenge — answer above!", type: "info" }] };
        }

        const challenge = inBonusMode ? challengeSource : lesson.challenge;
        const steps = challenge.steps || [];
        const isMultiStep = steps.length > 0;

        // Use bonusPracticeStepIdx for bonus mode, currentStepIdx for normal
        const stepIdx = inBonusMode ? bonusPracticeStepIdx : currentStepIdx;
        const currentStep = isMultiStep ? steps[stepIdx] : challenge;
        const expected = currentStep.expectedCommand;
        const alts = currentStep.acceptAlso || [];
        const pattern = currentStep.matchPattern;
        const normalized = cmd.trim().toLowerCase().replace(/\s+/g, " ");

        // BOARD ANIMATION TRIGGER
        if (normalized.startsWith("git init")) setActiveAction("init");
        else if (normalized === "git status") setActiveAction("status");
        else if (normalized.startsWith("git add")) setActiveAction("add");
        else if (normalized.startsWith("git commit")) setActiveAction("commit");
        else if (normalized.startsWith("git checkout") || normalized.startsWith("git switch")) setActiveAction("checkout");
        else if (normalized.startsWith("git branch")) setActiveAction("branch");
        else if (normalized.startsWith("git merge")) setActiveAction("merge");
        else if (normalized.startsWith("git push")) setActiveAction("push");
        else if (normalized.startsWith("git pull") || normalized.startsWith("git fetch")) setActiveAction("pull");
        else if (normalized.startsWith("git clone")) setActiveAction("clone");
        else if (normalized.startsWith("git stash")) setActiveAction("stash");

        // Clear action after duration
        setTimeout(() => setActiveAction(null), 2000);

        // Helper: apply resultState to animate visualization
        const applyResult = () => {
            const stateToApply = currentStep.resultState || (currentStepIdx === steps.length - 1 ? lesson.resultState : null) || (isMultiStep ? null : lesson.resultState);
            if (stateToApply) {
                setTimeout(() => {
                    setGitState(structuredClone(stateToApply));
                    setSelectedCommit(null);
                }, 300);
            }
        };

        // Generate realistic terminal output based on the command
        const getRealisticOutput = (command) => {
            const lines = [];
            const state = lesson.initialState || {};
            const commits = state.commits || [];
            const files = state.files || [];

            if (command.startsWith("git init")) {
                lines.push({ text: "Initialized empty Git repository in /project/.git/", type: "output" });
            } else if (command.startsWith("git config --global user.name")) {
                const name = command.match(/user\.name\s+["']?([^"']+)["']?/)?.[1] || "Your Name";
                lines.push({ text: `user.name set to: ${name}`, type: "output" });
            } else if (command.startsWith("git config --global user.email")) {
                const email = command.match(/user\.email\s+["']?([^"']+)["']?/)?.[1] || "you@example.com";
                lines.push({ text: `user.email set to: ${email}`, type: "output" });
            } else if (command.startsWith("git commit --amend")) {
                const msg = command.match(/-m\s+["']([^"']+)["']/)?.[1] || "Amended commit";
                lines.push({ text: `[main abc1234] ${msg}`, type: "output" });
                lines.push({ text: " Date: Thu Feb 11 10:30:00 2026 +0530", type: "output" });
                lines.push({ text: " 1 file changed, 1 insertion(+)", type: "output" });
            } else if (command.startsWith("git commit -m")) {
                const msg = command.match(/-m\s+["']([^"']+)["']/)?.[1] || "Commit";
                const hash = Math.random().toString(36).substring(2, 9);
                lines.push({ text: `[main ${hash}] ${msg}`, type: "output" });
                lines.push({ text: " 1 file changed, 10 insertions(+)", type: "output" });
            } else if (command === "git log --oneline" || command === "git log --oneline --graph") {
                commits.slice().reverse().forEach((c, i) => {
                    const hash = (c.id || "abc1234").padEnd(7, "0").slice(0, 7);
                    const headMarker = i === 0 ? " (HEAD -> " + (state.head || "main") + ")" : "";
                    lines.push({ text: `${hash}${headMarker} ${c.msg}`, type: "output" });
                });
                if (commits.length === 0) lines.push({ text: "fatal: your current branch 'main' does not have any commits yet", type: "error" });
            } else if (command === "git log") {
                commits.slice().reverse().forEach((c, i) => {
                    const hash = (c.id || "abc1234").padEnd(40, "0").slice(0, 40);
                    lines.push({ text: `commit ${hash}`, type: "output" });
                    if (i === 0) lines.push({ text: `  (HEAD -> ${state.head || "main"})`, type: "output" });
                    lines.push({ text: `Author: You <you@example.com>`, type: "output" });
                    lines.push({ text: `Date:   Thu Feb 11 10:00:00 2026`, type: "output" });
                    lines.push({ text: `    ${c.msg}`, type: "output" });
                    lines.push({ text: " ", type: "output" });
                });
            } else if (command.startsWith("git add")) {
                const file = command.replace("git add ", "");
                if (file === ".") {
                    files.filter(f => f.status === "modified" || f.status === "untracked").forEach(f => {
                        lines.push({ text: `add '${f.name}'`, type: "output" });
                    });
                } else {
                    lines.push({ text: `add '${file}'`, type: "output" });
                }
            } else if (command === "git diff") {
                if (lesson?.challenge?.diffData) {
                    setCurrentDiff(lesson.challenge.diffData);
                    lines.push({ text: "Showing visual diff in the lesson panel...", type: "info" });
                } else {
                    lines.push({ text: "No changes to show.", type: "output" });
                }
            } else if (command === "git status") {
                lines.push({ text: `On branch ${state.head || "main"}`, type: "output" });
                const staged = files.filter(f => f.status === "staged");
                const modified = files.filter(f => f.status === "modified");
                const untracked = files.filter(f => f.status === "untracked");
                if (staged.length > 0) {
                    lines.push({ text: "Changes to be committed:", type: "output" });
                    staged.forEach(f => lines.push({ text: `  (staged)   ${f.name}`, type: "output" }));
                }
                if (modified.length > 0) {
                    lines.push({ text: "Changes not staged for commit:", type: "output" });
                    modified.forEach(f => lines.push({ text: `  modified:  ${f.name}`, type: "output" }));
                }
                if (untracked.length > 0) {
                    lines.push({ text: "Untracked files:", type: "output" });
                    untracked.forEach(f => lines.push({ text: `  ${f.name}`, type: "output" }));
                }
                if (staged.length === 0 && modified.length === 0 && untracked.length === 0) {
                    lines.push({ text: "nothing to commit, working tree clean", type: "output" });
                }
            } else if (command.startsWith("git checkout -b") || command.startsWith("git switch -c")) {
                const branch = command.split(" ").pop();
                lines.push({ text: `Switched to a new branch '${branch}'`, type: "output" });
            } else if (command.startsWith("git checkout") || command.startsWith("git switch")) {
                const branch = command.split(" ").pop();
                lines.push({ text: `Switched to branch '${branch}'`, type: "output" });
            } else if (command.startsWith("git merge")) {
                const branch = command.split(" ").pop();
                lines.push({ text: `Updating abc1234..def5678`, type: "output" });
                lines.push({ text: `Fast-forward`, type: "output" });
                lines.push({ text: ` 1 file changed, 5 insertions(+)`, type: "output" });
            } else if (command.startsWith("git branch -d") || command.startsWith("git branch -D")) {
                const branch = command.split(" ").pop();
                lines.push({ text: `Deleted branch ${branch} (was abc1234).`, type: "output" });
            } else if (command.startsWith("git clone")) {
                const url = command.replace("git clone ", "");
                lines.push({ text: `Cloning into 'repo'...`, type: "output" });
                lines.push({ text: `remote: Enumerating objects: 42, done.`, type: "output" });
                lines.push({ text: `remote: Counting objects: 100% (42/42), done.`, type: "output" });
                lines.push({ text: `Receiving objects: 100% (42/42), done.`, type: "output" });
            } else if (command.startsWith("git push")) {
                lines.push({ text: `Enumerating objects: 5, done.`, type: "output" });
                lines.push({ text: `Counting objects: 100% (5/5), done.`, type: "output" });
                lines.push({ text: `Writing objects: 100% (3/3), 290 bytes | 290.00 KiB/s, done.`, type: "output" });
                lines.push({ text: `To origin`, type: "output" });
                lines.push({ text: `   abc1234..def5678  main -> main`, type: "output" });
            } else if (command === "git pull" || command.startsWith("git pull ")) {
                lines.push({ text: `remote: Enumerating objects: 3, done.`, type: "output" });
                lines.push({ text: `Updating abc1234..def5678`, type: "output" });
                lines.push({ text: `Fast-forward`, type: "output" });
                lines.push({ text: ` 1 file changed, 2 insertions(+)`, type: "output" });
            } else if (command === "git remote -v") {
                const remotes = state.remotes || {};
                Object.entries(remotes).forEach(([name, info]) => {
                    const url = info.url || "https://github.com/user/repo.git";
                    lines.push({ text: `${name}\t${url} (fetch)`, type: "output" });
                    lines.push({ text: `${name}\t${url} (push)`, type: "output" });
                });
            } else if (command === "git stash") {
                lines.push({ text: `Saved working directory and index state WIP on main: abc1234 Initial`, type: "output" });
            } else if (command.startsWith("git restore")) {
                const file = command.split(" ").pop();
                lines.push({ text: `Unstaged changes after reset:`, type: "output" });
                lines.push({ text: `M\t${file}`, type: "output" });
            } else if (command.startsWith("git rm --cached")) {
                const file = command.split(" ").pop();
                lines.push({ text: `rm '${file}'`, type: "output" });
            } else if (command.startsWith("git rm")) {
                const file = command.split(" ").pop();
                lines.push({ text: `rm '${file}'`, type: "output" });
            } else if (command.startsWith("git revert")) {
                const hash = command.split(" ").pop();
                lines.push({ text: `[main def5678] Revert "previous commit"`, type: "output" });
                lines.push({ text: ` 1 file changed, 2 deletions(-)`, type: "output" });
            } else if (command === "git stash pop") {
                lines.push({ text: `On branch main`, type: "output" });
                lines.push({ text: `Changes not staged for commit:`, type: "output" });
                lines.push({ text: `  modified:   feature.js`, type: "output" });
                lines.push({ text: `Dropped refs/stash@{0}`, type: "output" });
            } else if (command.startsWith("git rebase")) {
                const branch = command.split(" ").pop();
                lines.push({ text: `Successfully rebased and updated refs/heads/feature.`, type: "output" });
            } else if (command.startsWith("git cherry-pick")) {
                const hash = command.split(" ").pop();
                lines.push({ text: `[main abc9999] Critical bugfix`, type: "output" });
                lines.push({ text: ` 1 file changed, 3 insertions(+)`, type: "output" });
            } else if (command === "git reflog") {
                lines.push({ text: `abc1234 HEAD@{0}: commit: Feature`, type: "output" });
                lines.push({ text: `def5678 HEAD@{1}: commit: Initial`, type: "output" });
                lines.push({ text: `0000000 HEAD@{2}: clone: from origin`, type: "output" });
            } else if (command.startsWith("git tag")) {
                const tag = command.match(/v[\d.]+/)?.[0] || "v1.0.0";
                if (command.includes("-a")) {
                    lines.push({ text: `Created annotated tag '${tag}'`, type: "output" });
                } else {
                    lines.push({ text: `Created tag '${tag}'`, type: "output" });
                }
            }
            return lines;
        };

        // Build success output with realistic terminal lines
        const buildSuccessOutput = (command) => {
            const realisticLines = getRealisticOutput(command);
            return [
                ...realisticLines,
                { text: challenge.successMessage || "Challenge complete!", type: "success" },
                { text: `+${lesson.xp} XP earned!`, type: "success" },
            ];
        };

        // Match Check
        const isMatch = (normalized === expected || alts.includes(normalized)) ||
            (pattern && normalized.startsWith(pattern.toLowerCase()) && normalized.length > pattern.length);

        if (isMatch) {
            // Check if there are more steps
            if (isMultiStep && stepIdx < steps.length - 1) {
                // Move to next step
                applyResult();
                if (inBonusMode) setBonusPracticeStepIdx(prev => prev + 1);
                else setCurrentStepIdx(prev => prev + 1);
                return {
                    success: true,
                    output: [
                        { text: currentStep.successMessage || "Good job!", type: "success" },
                        { text: "Moving to next step...", type: "info" }
                    ]
                };
            } else {
                // Lesson Complete
                applyResult();
                const delay = (
                    normalized.startsWith("git status") ||
                    normalized.startsWith("git init") ||
                    normalized.startsWith("git commit") ||
                    normalized.startsWith("git add")
                ) ? 2200 : 1000;

                setTimeout(completeLesson, delay);
                return {
                    success: true,
                    output: buildSuccessOutput(normalized),
                };
            }
        }

        // Smart error messages based on what they typed
        if (!normalized.startsWith("git ")) {
            return {
                success: false, output: [
                    { text: `'${normalized}' is not a git command.`, type: "error" },
                    { text: "Git commands always start with 'git'. Try: " + (challenge.hint || expected), type: "info" },
                ]
            };
        }

        // They used git but wrong subcommand
        const userSubcmd = normalized.split(" ")[1];
        const expectedSubcmd = expected.split(" ")[1];

        if (userSubcmd !== expectedSubcmd) {
            return {
                success: false, output: [
                    { text: `'git ${userSubcmd}' isn't what we need here.`, type: "warning" },
                    { text: `This challenge needs 'git ${expectedSubcmd}'. ${challenge.hint || ""}`, type: "info" },
                ]
            };
        }

        // Right base command, wrong flags/arguments
        return {
            success: false, output: [
                { text: "Almost there! You have the right command, but check the flags/arguments.", type: "warning" },
                { text: `Expected format: ${expected}`, type: "info" },
                { text: `💡 ${challenge.hint || "Try the hint command for help."}`, type: "hint" },
            ]
        };
    }, [lesson, completeLesson, bonusPracticeMode, bonusPracticeStepIdx]);

    const goToLesson = useCallback((id) => {
        setLessonId(id);
        setAnswered(false);
        setSelectedAnswer(null);
        setShowHint(false);
        setHintLevel(0);
        setSelectedCommit(null);
        setCurrentStepIdx(0);
        setCurrentDiff(null);
        setShowPractice(false);
        setBonusPracticeMode(false);
        setBonusPracticeStepIdx(0);
        setProgress(prev => ({ ...prev, currentLesson: id }));
    }, []);

    const moduleProgress = useMemo(() => {
        const moduleColors = {
            "Core Concepts & Setup": "#06d6a0",
            "The Local Workflow": "#118ab2",
            "Fixing Mistakes": "#ef476f",
            "Parallel Development": "#ffd166",
            "Remote Collaboration": "#7209b7",
            "Advanced Tools": "#f72585",
        };
        const seen = [];
        LESSONS.forEach(l => {
            if (!seen.find(m => m.name === l.module)) {
                seen.push({ name: l.module, color: moduleColors[l.module] || "#06d6a0", ids: [] });
            }
            seen.find(m => m.name === l.module).ids.push(l.id);
        });
        return seen.map(m => {
            const done = m.ids.filter(id => progress.completedLessons.includes(id)).length;
            return { ...m, done, total: m.ids.length, pct: Math.round((done / m.ids.length) * 100) };
        });
    }, [progress.completedLessons]);

    const totalPct = Math.round((progress.completedLessons.length / LESSONS.length) * 100);

    if (!isMounted) return null;

    return (
        <div className="h-screen w-screen flex bg-bg-primary overflow-hidden">
            {/* SUCCESS OVERLAY */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-bg-primary/80 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-bg-card p-10 rounded-3xl border border-accent-green/30 text-center shadow-2xl relative overflow-hidden"
                        >
                            {/* Particle Animation Simulated with motion.divs */}
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                        opacity: [0, 1, 0],
                                        scale: [0, 1.5, 0],
                                        x: Math.cos(i * 45) * 100,
                                        y: Math.sin(i * 45) * 100
                                    }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                                    className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-accent-green opacity-40"
                                />
                            ))}

                            <div className="text-6xl mb-6">🎉</div>
                            <h1 className="text-3xl font-heading font-black text-text-primary mb-2 tracking-tight">Lesson Complete!</h1>
                            <p className="text-accent-green font-mono text-sm mb-8">+{lesson?.xp || 0} XP EARNED</p>
                            <button
                                onClick={() => setShowSuccess(false)}
                                className="px-10 py-3 bg-accent-green text-bg-primary font-heading font-bold rounded-xl hover:scale-105 transition-transform cursor-pointer"
                            >
                                Keep Learning
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* SIDEBAR */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.aside
                        initial={{ x: -300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="w-72 min-w-[18rem] h-full bg-bg-secondary border-r border-border flex flex-col z-20"
                    >
                        {/* Logo */}
                        <div className="px-5 py-5 border-b border-border">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="4" /><line x1="1.05" y1="12" x2="7" y2="12" /><line x1="17.01" y1="12" x2="22.96" y2="12" />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="font-heading font-bold text-lg text-text-primary tracking-tight">GitMaster</h1>
                                    <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest">Learn by Doing</p>
                                </div>
                            </div>
                        </div>

                        {/* XP Bar */}
                        <div className="px-5 py-3 border-b border-border">
                            <div className="flex items-center justify-between text-xs mb-1.5">
                                <span className="font-mono text-text-muted">{progress.xp} XP</span>
                                <span className="font-mono text-accent-cyan">{totalPct}%</span>
                            </div>
                            <div className="h-1.5 bg-bg-primary rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-green"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${totalPct}%` }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                />
                            </div>
                            <div className="flex items-center justify-between mt-1.5">
                                <span className="text-[10px] font-mono text-text-muted">{progress.completedLessons.length}/{LESSONS.length} lessons</span>
                            </div>
                        </div>

                        {/* Module List */}
                        <div className="flex-1 overflow-y-auto py-2">
                            {moduleProgress.map((mod) => (
                                <div key={mod.name} className="mb-1">
                                    <div className="px-5 py-2 flex items-center justify-between">
                                        <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: mod.color }}>
                                            {mod.name}
                                        </span>
                                        <span className="text-[10px] font-mono" style={{ color: mod.color, opacity: 0.6 }}>
                                            {mod.done}/{mod.total}
                                        </span>
                                    </div>
                                    {mod.ids.map(id => {
                                        const l = LESSONS.find(x => x.id === id);
                                        if (!l) return null;
                                        const completed = progress.completedLessons.includes(id);
                                        const current = id === lessonId;
                                        return (
                                            <button
                                                key={id}
                                                onClick={() => goToLesson(id)}
                                                className={`w-full text-left px-5 py-2 text-sm flex items-center gap-3 transition-all cursor-pointer
                          ${current ? "bg-bg-tertiary border-l-2" : "hover:bg-bg-tertiary/60 border-l-2 border-transparent"}`}
                                                style={current ? { borderColor: mod.color } : {}}
                                            >
                                                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold flex-shrink-0
                          ${completed ? "text-bg-primary" : current ? "border-2" : "border border-border text-text-muted"}`}
                                                    style={completed ? { background: mod.color } : current ? { borderColor: mod.color, color: mod.color } : {}}>
                                                    {completed ? "✓" : id}
                                                </span>
                                                <span className={`truncate ${current ? "text-text-primary font-medium" : completed ? "text-text-secondary" : "text-text-muted"}`}>
                                                    {l.title}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>

                        {/* Achievements */}
                        <div className="px-5 py-3 border-t border-border">
                            <div className="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-2">Achievements</div>
                            <div className="flex gap-2 flex-wrap">
                                {[
                                    { id: "first_commit", icon: "🌟", label: "First Commit" },
                                    { id: "fundamentals", icon: "📚", label: "Fundamentals" },
                                    { id: "basics_done", icon: "⚡", label: "Git Basics" },
                                    { id: "branching_pro", icon: "🌳", label: "Branch Pro" },
                                    { id: "git_master", icon: "👑", label: "Git Master" },
                                ].map(a => (
                                    <div
                                        key={a.id}
                                        title={a.label}
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all
                      ${(progress.achievements || []).includes(a.id) ? "bg-accent-amber/10 border border-accent-amber/30 glow-amber" : "bg-bg-primary border border-border opacity-30"}`}
                                    >
                                        {a.icon}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* MAIN CONTENT */}
            <main className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Top Bar */}
                <header className="flex items-center justify-between px-5 py-3 border-b border-border bg-bg-secondary/50 backdrop-blur-sm flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded-lg hover:bg-bg-tertiary transition-colors cursor-pointer" title="Toggle sidebar">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-muted">
                                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                            </svg>
                        </button>
                        {lesson && (
                            <div>
                                <div className="text-xs font-mono text-text-muted uppercase tracking-wider">{lesson.module} — Lesson {lesson.id}</div>
                                <div className="flex items-center gap-2">
                                    <h2 className="font-heading font-bold text-text-primary">{lesson.title}</h2>
                                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-mono uppercase tracking-widest ${showPractice ? "bg-accent-green/10 text-accent-green" : "bg-accent-cyan/10 text-accent-cyan"}`}>
                                        {showPractice ? "Practice Mode" : "Lecture Mode"}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setShowCheatSheet(!showCheatSheet)} className="px-3 py-1.5 text-xs font-mono rounded-lg bg-bg-tertiary border border-border hover:border-accent-cyan/40 transition-colors cursor-pointer text-text-secondary hover:text-accent-cyan">
                            {showCheatSheet ? "Hide" : "Cheat Sheet"}
                        </button>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-bg-tertiary rounded-lg border border-border">
                            <span className="text-accent-amber text-sm">⚡</span>
                            <span className="text-xs font-mono text-accent-amber">{progress.xp} XP</span>
                        </div>
                    </div>
                </header>

                {/* Cheat Sheet Overlay */}
                <AnimatePresence>
                    {showCheatSheet && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-16 right-4 z-30 w-80 max-h-[60vh] overflow-y-auto bg-bg-card border border-border rounded-xl p-4 shadow-2xl"
                        >
                            <div className="text-xs font-mono uppercase tracking-widest text-accent-cyan mb-3">Git Cheat Sheet</div>
                            {CHEAT_SHEET.map(c => (
                                <div key={c.cat} className="mb-3">
                                    <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-1">{c.cat}</div>
                                    {c.cmds.map(cmd => (
                                        <div key={cmd} className="text-xs font-mono text-text-secondary py-0.5 pl-2 border-l border-border">
                                            {cmd}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Content Area */}
                <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                    {/* LEFT — Visualization */}
                    <div className={`${vizCollapsed ? 'h-12' : 'h-1/2'} lg:h-full w-full lg:w-1/2 flex flex-col border-b lg:border-b-0 lg:border-r border-border overflow-hidden transition-all duration-300 relative grid-bg`}>
                        <div className="absolute inset-0 scanline pointer-events-none opacity-50" />
                        {/* Mobile Collapse Toggle */}
                        <button
                            onClick={() => setVizCollapsed(!vizCollapsed)}
                            className="lg:hidden absolute top-2 right-2 z-30 p-2 bg-bg-tertiary/80 backdrop-blur rounded-lg border border-border text-text-muted hover:text-text-primary"
                        >
                            {vizCollapsed ? "Expand Viz ↑" : "Collapse Viz ↓"}
                        </button>
                        {/* Commit Graph */}
                        <div className="flex-1 overflow-auto grid-bg relative">
                            {gitState && (
                                <CommitGraph
                                    commits={gitState.commits || []}
                                    branches={gitState.branches || []}
                                    head={gitState.head}
                                    detached={gitState.detached}
                                    conflict={gitState.conflict}
                                    onNodeClick={(c) => setSelectedCommit(c)}
                                    lessonId={lessonId}
                                    activeAction={activeAction}
                                />
                            )}
                            <div className="scanline absolute inset-0 pointer-events-none" />
                        </div>

                        {/* File States */}
                        <div className="h-48 min-h-[12rem] border-t border-border overflow-auto p-4 bg-bg-secondary/30 relative">
                            {gitState && (
                                <FileStateView
                                    files={gitState.files || []}
                                    activeAction={activeAction}
                                />
                            )}
                        </div>
                    </div>

                    {/* RIGHT — Lesson + Terminal */}
                    <div className={`flex-1 flex flex-col overflow-hidden relative ${vizCollapsed ? 'h-full' : 'h-1/2 lg:h-full'} w-full lg:w-1/2`}>
                        {/* Commit Detail Portal */}
                        <AnimatePresence>
                            {selectedCommit && (
                                <motion.div
                                    initial={{ x: "100%" }}
                                    animate={{ x: 0 }}
                                    exit={{ x: "100%" }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    className="absolute inset-0 z-40 bg-bg-primary p-6 overflow-y-auto"
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-6 bg-accent-cyan rounded-full" />
                                            <h3 className="font-heading font-bold text-lg text-text-primary">Commit Details</h3>
                                        </div>
                                        <button
                                            onClick={() => setSelectedCommit(null)}
                                            className="p-2 rounded-lg hover:bg-bg-tertiary transition-colors text-text-muted hover:text-text-primary cursor-pointer"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        {/* STORY CONTEXT (PEDAGOGY) */}
                                        {selectedCommit.storyContext && (
                                            <div className="p-5 rounded-2xl bg-accent-purple/5 border border-accent-purple/20 relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
                                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5M12 16h.01" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                </div>
                                                <div className="text-[10px] font-mono uppercase tracking-widest text-accent-purple mb-2">The Project Story</div>
                                                <div className="text-sm italic text-text-primary leading-relaxed relative z-10">
                                                    "{selectedCommit.storyContext}"
                                                </div>
                                            </div>
                                        )}

                                        <div className="p-4 rounded-xl bg-bg-secondary border border-border">
                                            <div className="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-3 flex items-center justify-between">
                                                <span>Commit Info</span>
                                                {selectedCommit.marker && <span className="px-2 py-0.5 rounded-full bg-accent-purple/10 text-accent-purple text-[8px]">{selectedCommit.marker}</span>}
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <div className="text-[10px] font-mono text-text-muted uppercase mb-1">Hash</div>
                                                    <div className="text-xs font-mono text-accent-cyan">{selectedCommit.id}</div>
                                                </div>
                                                <div>
                                                    <div className="text-[10px] font-mono text-text-muted uppercase mb-1">Branch</div>
                                                    <div className="text-xs font-mono text-accent-green">{selectedCommit.branch}</div>
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <div className="text-[10px] font-mono text-text-muted uppercase mb-1">Message</div>
                                                <div className="text-sm font-medium text-text-primary">{selectedCommit.msg}</div>
                                            </div>
                                        </div>

                                        <div className="p-4 rounded-xl bg-bg-secondary border border-border">
                                            <div className="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-3">Snapshot Visualization</div>
                                            <div className="text-xs text-text-secondary leading-relaxed mb-4">
                                                This commit captured the project state precisely. In a real environment, this would include all tracked files.
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {gitState?.files?.filter(f => f.status === "committed").map(f => (
                                                    <div key={f.name} className="px-2 py-1 bg-accent-cyan/10 border border-accent-cyan/20 rounded text-[10px] font-mono text-accent-cyan">
                                                        {f.name}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setSelectedCommit(null)}
                                            className="w-full py-3 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan font-mono text-xs hover:bg-accent-cyan/20 transition-all cursor-pointer"
                                        >
                                            Back to Lesson
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Lesson Content */}
                        <div ref={contentRef} className="flex-1 overflow-y-auto p-6">
                            {lesson ? (
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={lesson.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {/* Content */}
                                        <div className="prose prose-invert max-w-none mb-6">
                                            {lesson.content.split("\n\n").map((para, i) => (
                                                <p key={i} className="text-sm leading-relaxed text-text-secondary mb-3 whitespace-pre-wrap font-body">
                                                    {para.split(/(`[^`]+`)/).map((part, j) =>
                                                        part.startsWith("`") && part.endsWith("`") ? (
                                                            <code key={j} className="px-1.5 py-0.5 bg-bg-tertiary rounded text-accent-cyan font-mono text-xs">
                                                                {part.slice(1, -1)}
                                                            </code>
                                                        ) : part
                                                    )}
                                                </p>
                                            ))}
                                        </div>

                                        {/* Why Box */}
                                        <div className="mb-6 p-4 rounded-xl bg-accent-cyan/5 border border-accent-cyan/10">
                                            <div className="text-[10px] font-mono uppercase tracking-widest text-accent-cyan mb-2 flex items-center gap-2">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                                                Why this matters
                                            </div>
                                            <p className="text-xs text-text-secondary leading-relaxed">{lesson.explanation}</p>
                                        </div>

                                        {/* Visual Diff Section */}
                                        <AnimatePresence>
                                            {currentDiff && showPractice && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                >
                                                    <DiffView diff={currentDiff} />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Start Practice Button */}
                                        {!showPractice && lesson.challenge && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                    boxShadow: ["0 0 20px rgba(0,229,255,0.2)", "0 0 35px rgba(0,229,255,0.4)", "0 0 20px rgba(0,229,255,0.2)"]
                                                }}
                                                transition={{
                                                    y: { duration: 0.3 },
                                                    boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                                                }}
                                                className="mt-4 mb-4"
                                            >
                                                <button
                                                    onClick={() => {
                                                        setShowPractice(true);
                                                        if (contentRef.current) {
                                                            setTimeout(() => {
                                                                contentRef.current.scrollTo({
                                                                    top: contentRef.current.scrollHeight,
                                                                    behavior: "smooth"
                                                                });
                                                            }, 100);
                                                        }
                                                    }}
                                                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-accent-cyan to-accent-blue text-bg-primary font-bold text-sm shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group cursor-pointer"
                                                >
                                                    <span className="text-xl group-hover:rotate-12 transition-transform">🚀</span>
                                                    Ready to Brew! (Start Practice)
                                                </button>
                                            </motion.div>
                                        )}

                                        {/* Challenge */}
                                        {lesson.challenge && showPractice && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="mb-4"
                                            >
                                                <div className="text-[10px] font-mono uppercase tracking-widest text-accent-green mb-3 flex items-center gap-2">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#39ff14" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                                                    Challenge
                                                </div>

                                                {lesson.challenge.type === "quiz" && (
                                                    <div>
                                                        <p className="text-sm font-medium text-text-primary mb-3">{lesson.challenge.question}</p>
                                                        <div className="space-y-2">
                                                            {lesson.challenge.options.map((opt, i) => {
                                                                const isCorrect = i === lesson.challenge.answer;
                                                                const isSelected = i === selectedAnswer;
                                                                let style = "border-border hover:border-text-muted bg-bg-tertiary";
                                                                if (answered) {
                                                                    if (isCorrect) style = "border-accent-green/60 bg-accent-green/5";
                                                                    else if (isSelected) style = "border-accent-red/60 bg-accent-red/5";
                                                                }
                                                                return (
                                                                    <motion.button
                                                                        key={i}
                                                                        onClick={() => handleQuizAnswer(i)}
                                                                        disabled={answered}
                                                                        whileHover={!answered ? { scale: 1.01 } : {}}
                                                                        whileTap={!answered ? { scale: 0.99 } : {}}
                                                                        className={`w-full text-left px-4 py-3 rounded-lg border text-sm font-mono transition-all cursor-pointer ${style}`}
                                                                    >
                                                                        <span className="text-text-muted mr-2">{String.fromCharCode(65 + i)}.</span>
                                                                        <span className={answered && isCorrect ? "text-accent-green" : answered && isSelected ? "text-accent-red" : "text-text-primary"}>
                                                                            {opt}
                                                                        </span>
                                                                        {answered && isCorrect && <span className="ml-2">✓</span>}
                                                                        {answered && isSelected && !isCorrect && <span className="ml-2">✗</span>}
                                                                    </motion.button>
                                                                );
                                                            })}
                                                        </div>
                                                        {answered && selectedAnswer !== lesson.challenge.answer && (
                                                            <motion.div
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                className="mt-3 flex items-center gap-3"
                                                            >
                                                                <p className="text-xs text-accent-red font-mono">
                                                                    Not quite! The correct answer is {String.fromCharCode(65 + lesson.challenge.answer)}.
                                                                </p>
                                                                <button
                                                                    onClick={retryQuiz}
                                                                    className="px-3 py-1.5 text-xs font-mono rounded-lg bg-accent-orange/10 border border-accent-orange/30 text-accent-orange hover:bg-accent-orange/20 transition-all cursor-pointer"
                                                                >
                                                                    🔄 Try Again
                                                                </button>
                                                                <button onClick={completeLesson} className="text-xs font-mono underline text-accent-cyan cursor-pointer">
                                                                    Continue anyway →
                                                                </button>
                                                            </motion.div>
                                                        )}
                                                        {answered && selectedAnswer === lesson.challenge.answer && lesson.bonusPractice && !bonusPracticeMode && (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                className="mt-4 flex items-center gap-3"
                                                            >
                                                                <button
                                                                    onClick={() => {
                                                                        setBonusPracticeMode(true);
                                                                        setBonusPracticeStepIdx(0);
                                                                        if (contentRef.current) {
                                                                            setTimeout(() => {
                                                                                contentRef.current.scrollTo({
                                                                                    top: contentRef.current.scrollHeight,
                                                                                    behavior: "smooth"
                                                                                });
                                                                            }, 100);
                                                                        }
                                                                    }}
                                                                    className="px-4 py-2.5 text-xs font-mono rounded-xl bg-gradient-to-r from-accent-green to-accent-cyan text-bg-primary font-bold hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
                                                                >
                                                                    <span>🧪</span> Bonus Practice — Try it in the Terminal!
                                                                </button>
                                                                <button onClick={completeLesson} className="text-xs font-mono underline text-text-muted cursor-pointer hover:text-text-primary">
                                                                    Skip →
                                                                </button>
                                                            </motion.div>
                                                        )}
                                                        {bonusPracticeMode && lesson.bonusPractice && (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                className="mt-4 p-3 rounded-lg bg-accent-green/5 border border-accent-green/20"
                                                            >
                                                                <div className="flex items-center justify-between mb-1">
                                                                    <p className="text-sm text-accent-green font-mono">🧪 {lesson.bonusPractice.prompt}</p>
                                                                    <button
                                                                        onClick={() => {
                                                                            const cmdToRun = lesson.bonusPractice.steps?.[bonusPracticeStepIdx]?.expectedCommand;
                                                                            terminalRef.current?.runExternalCommand(cmdToRun);
                                                                        }}
                                                                        className="px-2 py-1 text-[9px] font-mono rounded bg-accent-green/10 border border-accent-green/20 text-accent-green hover:bg-accent-green/20 transition-all cursor-pointer uppercase tracking-tight"
                                                                        title="Execute this command for me"
                                                                    >
                                                                        Run for me
                                                                    </button>
                                                                </div>
                                                                <p className="text-[10px] font-mono text-text-muted">Type the command in the terminal below ↓</p>
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                )}

                                                {lesson.challenge.type === "terminal" && (
                                                    <div className="p-3 rounded-lg bg-bg-tertiary border border-border">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <p className="text-sm text-text-primary">{lesson.challenge.prompt}</p>
                                                            <button
                                                                onClick={() => {
                                                                    const cmdToRun = lesson.challenge.steps?.[currentStepIdx]?.expectedCommand || lesson.challenge.expectedCommand;
                                                                    terminalRef.current?.runExternalCommand(cmdToRun);
                                                                }}
                                                                className="px-2 py-1 text-[9px] font-mono rounded bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan hover:bg-accent-cyan/20 transition-all cursor-pointer uppercase tracking-tight"
                                                                title="Execute this command for me"
                                                            >
                                                                Run for me
                                                            </button>
                                                        </div>
                                                        <p className="text-[10px] font-mono text-text-muted">Type the command in the terminal below ↓</p>
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}

                                        {/* Hint */}
                                        {showPractice && lesson.challenge && (
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => { setShowHint(true); setHintLevel(prev => Math.min(prev + 1, 2)); }}
                                                    className="text-xs font-mono text-text-muted hover:text-accent-purple transition-colors cursor-pointer"
                                                >
                                                    {showHint ? "Need more help?" : "💡 Show hint"}
                                                </button>
                                                {showHint && (
                                                    <motion.span
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        className="text-xs font-mono text-accent-purple"
                                                    >
                                                        {lesson.challenge?.hint || "Try re-reading the lesson content above."}
                                                    </motion.span>
                                                )}
                                            </div>
                                        )}

                                        {/* Navigation */}
                                        <div className="flex items-center justify-between mt-8 pt-4 border-t border-border">
                                            <button
                                                onClick={() => lessonId > 1 && goToLesson(lessonId - 1)}
                                                disabled={lessonId <= 1}
                                                className="px-4 py-2 text-xs font-mono rounded-lg bg-bg-tertiary border border-border hover:border-text-muted transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-text-secondary"
                                            >
                                                ← Previous
                                            </button>
                                            <span className="text-[10px] font-mono text-text-muted">{lessonId} / {LESSONS.length}</span>
                                            <button
                                                onClick={() => lessonId < LESSONS.length && goToLesson(lessonId + 1)}
                                                disabled={lessonId >= LESSONS.length}
                                                className="px-4 py-2 text-xs font-mono rounded-lg bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan hover:bg-accent-cyan/20 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                                            >
                                                Next →
                                            </button>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-center">
                                        <div className="text-4xl mb-4">🚀</div>
                                        <h2 className="font-heading text-xl font-bold text-text-primary mb-2">Welcome to GitMaster</h2>
                                        <p className="text-sm text-text-secondary mb-4">Select a lesson from the sidebar to begin your journey.</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Terminal */}
                        <AnimatePresence>
                            {showPractice && (
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 50 }}
                                    className="h-56 min-h-[14rem] border-t border-border"
                                >
                                    <Terminal
                                        ref={terminalRef}
                                        onCommand={handleTerminalCommand}
                                        lessonHint={lesson?.challenge?.steps?.[currentStepIdx]?.hint || lesson?.challenge?.hint}
                                        disabled={showSuccess || (lesson?.challenge?.type === "quiz" && answered)}
                                        currentStep={currentStepIdx + 1}
                                        totalSteps={lesson?.challenge?.steps?.length || 1}
                                        stepInstruction={lesson?.challenge?.steps?.[currentStepIdx]?.instruction || lesson?.challenge?.prompt}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {!showPractice && lesson.challenge && (
                            <div className="h-56 min-h-[14rem] border-t border-border flex flex-col items-center justify-center bg-bg-terminal/50 gap-3 grayscale opacity-40">
                                <div className="w-12 h-12 rounded-full border-2 border-dashed border-text-muted/30 flex items-center justify-center text-2xl">🔒</div>
                                <div className="text-center">
                                    <div className="text-xs font-mono text-text-muted uppercase tracking-widest mb-1">Terminal Locked</div>
                                    <div className="text-[10px] font-mono text-text-muted/60">Read the theory above to unlock the practice challenge</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            {/* TEAMMATE NOTIFICATION */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ x: 400, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 400, opacity: 0 }}
                        className="fixed top-20 right-6 z-50 w-72 p-4 bg-bg-card border border-accent-purple/30 rounded-xl shadow-2xl glow-magenta"
                    >
                        <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-full bg-accent-purple/20 flex items-center justify-center text-lg">
                                {notification.userIcon || "🧑‍💻"}
                            </div>
                            <div>
                                <div className="text-[10px] font-mono text-accent-purple uppercase tracking-widest mb-1">Teammate Activity</div>
                                <div className="text-sm font-medium text-text-primary mb-1">{notification.userName}</div>
                                <div className="text-xs text-text-secondary leading-tight">{notification.message}</div>
                            </div>
                        </div>
                        <button
                            onClick={() => setNotification(null)}
                            className="absolute top-2 right-2 p-1 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
