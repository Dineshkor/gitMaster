"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GIT_COMMANDS } from "../data/lessons";

export default function Terminal({ onCommand, lessonHint, disabled }) {
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

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const updateSuggestions = useCallback((val) => {
        if (val.length < 2) { setSuggestions([]); return; }
        const matches = GIT_COMMANDS.filter(c => c.startsWith(val)).slice(0, 5);
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
                addOutput(result.output.map(line => ({
                    type: line.type || (result.success ? "success" : "error"),
                    text: line.text ?? line,
                })));
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
            <div className="flex items-center gap-2 px-4 py-2.5 bg-bg-secondary border-b border-border">
                <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-accent-red/80" />
                    <span className="w-3 h-3 rounded-full bg-accent-amber/80" />
                    <span className="w-3 h-3 rounded-full bg-accent-green/80" />
                </div>
                <span className="ml-2 text-xs font-mono text-text-muted tracking-wider uppercase">
                    GitMaster Terminal
                </span>
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
}
