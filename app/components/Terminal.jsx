"use client";
import { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GIT_COMMANDS } from "../data/lessons";

const Terminal = forwardRef(({ onCommand, lessonHint, disabled, currentStep, totalSteps, stepInstruction }, ref) => {
    const [history, setHistory] = useState([
        { type: "system", text: "GitMaster Terminal v1.0 — Type git commands here" },
        { type: "system", text: 'Type "help" for available commands or follow the lesson prompt.' },
    ]);
    const [input, setInput] = useState("");
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [cmdHistory, setCmdHistory] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [selectedSugg, setSelectedSugg] = useState(0);
    const inputRef = useRef(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    useImperativeHandle(ref, () => ({
        runExternalCommand: (cmd) => {
            if (!cmd) return;
            addOutput([{ type: "input", text: cmd }]);
            const result = onCommand?.(cmd);
            if (result) {
                addOutput(result.output.map(line => {
                    const isObj = line !== null && typeof line === "object";
                    return {
                        type: isObj ? (line.type || (result.success ? "success" : "error")) : (result.success ? "success" : "error"),
                        text: isObj ? (line.text ?? "") : String(line),
                    };
                }));
            }
        }
    }));

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const updateSuggestions = useCallback((val) => {
        const input = val.toLowerCase();
        if (input.length < 2) { setSuggestions([]); return; }

        // Find commands that match the start of the input
        let matches = GIT_COMMANDS.filter(c => c.toLowerCase().startsWith(input)).slice(0, 5);

        // If it's a "git " command, try to suggest flags or subcommands
        if (input.startsWith("git ")) {
            const parts = input.split(" ");
            if (parts.length > 1) {
                const sub = parts[1];
                // Suggest common flags if they match
                const commonFlags = ["--oneline", "-m", "-b", "--all", "-d", "--cached", "--staged", "--version", "--help"];
                const flagMatches = commonFlags
                    .filter(f => f.startsWith(parts[parts.length - 1]))
                    .map(f => parts.slice(0, -1).join(" ") + " " + f);

                matches = [...matches, ...flagMatches].slice(0, 5);
            }
        }

        setSuggestions(matches);
        setSelectedSugg(0);
    }, []);

    const addOutput = useCallback((lines) => {
        setHistory(prev => [...prev, ...lines]);
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (!input.trim() || disabled) return;

        const cmd = input.trim();
        setCmdHistory(prev => [cmd, ...prev]);
        setHistoryIndex(-1);
        setSuggestions([]);

        addOutput([{ type: "input", text: cmd }]);

        if (cmd === "help") {
            addOutput([
                { type: "info", text: "Available commands:" },
                { type: "info", text: "  git init, git add, git commit, git status, git log" },
                { type: "info", text: "  git branch, git checkout, git merge, git rebase" },
                { type: "info", text: "  git push, git pull, git clone, git remote" },
                { type: "info", text: "  git stash, git tag, git diff, git reset, git restore" },
                { type: "info", text: "  git cherry-pick, git reflog, git bisect, git rm" },
                { type: "info", text: "  clear, help, hint" },
            ]);
        } else if (cmd === "clear") {
            setHistory([]);
        } else if (cmd === "hint") {
            addOutput([{ type: "hint", text: lessonHint || "No hint available for this lesson." }]);
        } else {
            const result = onCommand?.(cmd);
            if (result) {
                addOutput(result.output.map(line => {
                    const isObj = line !== null && typeof line === "object";
                    return {
                        type: isObj ? (line.type || (result.success ? "success" : "error")) : (result.success ? "success" : "error"),
                        text: isObj ? (line.text ?? "") : String(line),
                    };
                }));
            }
        }

        setInput("");
    }, [input, disabled, onCommand, lessonHint, addOutput]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === "ArrowUp") {
            e.preventDefault();
            if (suggestions.length > 0) {
                setSelectedSugg(prev => Math.max(0, prev - 1));
            } else if (historyIndex < cmdHistory.length - 1) {
                const newIdx = historyIndex + 1;
                setHistoryIndex(newIdx);
                setInput(cmdHistory[newIdx]);
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (suggestions.length > 0) {
                setSelectedSugg(prev => Math.min(suggestions.length - 1, prev + 1));
            } else if (historyIndex > 0) {
                const newIdx = historyIndex - 1;
                setHistoryIndex(newIdx);
                setInput(cmdHistory[newIdx]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInput("");
            }
        } else if (e.key === "Tab") {
            e.preventDefault();
            if (suggestions.length > 0) {
                setInput(suggestions[selectedSugg] + " ");
                setSuggestions([]);
            }
        }
    }, [suggestions, selectedSugg, historyIndex, cmdHistory]);

    const getLineColor = (type) => {
        switch (type) {
            case "input": return "text-accent-cyan";
            case "success": return "text-accent-green";
            case "error": return "text-accent-red";
            case "warning": return "text-accent-amber";
            case "hint": return "text-accent-purple";
            case "info": return "text-text-secondary";
            case "system": return "text-text-muted";
            default: return "text-text-primary";
        }
    };

    return (
        <div className="flex flex-col h-full bg-bg-terminal rounded-xl border border-border overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-bg-secondary border-b border-border">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5 mr-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-accent-red/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-accent-amber/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-accent-green/80" />
                    </div>
                    {totalSteps > 1 && (
                        <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md bg-accent-cyan/10 border border-accent-cyan/20 text-[10px] font-mono font-bold text-accent-cyan uppercase tracking-wider">
                                Step {currentStep} / {totalSteps}
                            </span>
                            <div className="h-1 w-12 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-accent-cyan shadow-[0_0_8px_rgba(0,229,255,0.5)]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {stepInstruction && (
                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={stepInstruction}
                        className="text-[10px] font-mono text-accent-green/80 truncate max-w-[200px]"
                    >
                        <span className="opacity-50 mr-1">👉</span> {stepInstruction}
                    </motion.div>
                )}
            </div>

            {/* Terminal Output */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 font-mono text-sm leading-relaxed">
                <AnimatePresence>
                    {history.map((line, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.15 }}
                            className={`${getLineColor(line.type)} ${line.type === "input" ? "mt-1" : ""}`}
                        >
                            {line.type === "input" ? (
                                <span><span className="text-accent-green">❯</span> {line.text}</span>
                            ) : (
                                <span>{line.text}</span>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div className="scanline absolute inset-0 pointer-events-none" />
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
                <div className="px-4 pb-1">
                    <div className="flex gap-2 flex-wrap">
                        {suggestions.map((s, i) => (
                            <button
                                key={s}
                                onClick={() => { setInput(s + " "); setSuggestions([]); inputRef.current?.focus(); }}
                                className={`px-2 py-0.5 text-xs font-mono rounded cursor-pointer transition-colors
                  ${i === selectedSugg ? "bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/40" : "bg-bg-secondary text-text-secondary border border-border hover:border-accent-cyan/30"}`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 border-t border-border bg-bg-terminal">
                <span className="text-accent-green font-mono text-sm">❯</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => { setInput(e.target.value); updateSuggestions(e.target.value); }}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    placeholder={disabled ? "Complete the challenge above first..." : "Type a git command..."}
                    className="flex-1 bg-transparent text-text-primary font-mono text-sm outline-none placeholder:text-text-muted"
                    spellCheck={false}
                    autoComplete="off"
                />
                <span className="terminal-cursor text-accent-cyan font-mono">▊</span>
            </form>
        </div>
    );
});

export default Terminal;
