export const LESSONS = [
    // ─── MODULE 1: CORE CONCEPTS & SETUP ───
    {
        id: 1, module: "Core Concepts & Setup", title: "Git vs GitHub",
        icon: "☕", xp: 50,
        content: "Let's start with the most common confusion beginners have: Git and GitHub are NOT the same thing!\n\nThink of it like coffee and a coffee shop:\n\n• Git is the coffee — it's the actual tool that lives on YOUR computer. It tracks every change you make to your files: who changed what, when, and where. Git works completely offline, with no internet needed. It's a career-long skill that every developer uses.\n\n• GitHub is the coffee shop — it's a website (a cloud service) where you can store your Git projects online, share them with others, and collaborate as a team.\n\nYou can use Git without GitHub (just like you can make coffee at home), but GitHub without Git doesn't make much sense.",
        explanation: "Understanding this distinction is crucial. Git is the engine under the hood — the version control system. GitHub, GitLab, and Bitbucket are just cloud platforms built on top of Git. Master Git first, and you'll be comfortable with any hosting service.",
        challenge: {
            type: "quiz", question: "Which statement best describes the relationship between Git and GitHub?",
            options: [
                "They are the same tool with different names",
                "Git is a local version control tool; GitHub is a cloud hosting service built on top of Git",
                "GitHub is the tool you install; Git is the website",
                "You must use GitHub to use Git"
            ],
            answer: 1, hint: "Remember the coffee analogy — one is the product, the other is the store."
        },
        initialState: { commits: [], branches: ["main"], head: "main", files: [{ name: "my-project/", status: "system" }] }
    },
    {
        id: 2, module: "Core Concepts & Setup", title: "The Three Stages of Git",
        icon: "🏗️", xp: 75,
        content: "Git has a unique three-stage architecture that every beginner must understand. Think of it like shipping a package:\n\n1. Working Directory (Your Desk)\nThis is where you actively edit and create files. Any file you open, modify, or create lives here. Git can SEE these changes, but it hasn't saved them yet.\n\n2. Staging Area (The Shipping Box)\nThis is the \"middle ground\" — a preparation zone. When you're happy with certain changes, you move them here. Think of it as placing items into a shipping box before sealing it. You choose EXACTLY which changes to include.\n\n3. Local Repository (The Post Office)\nWhen you \"commit,\" your staged changes are permanently saved here. It's like dropping off your sealed package — it's now part of the official record. Each commit is a snapshot you can return to at any time.\n\nThe flow is always: Working Directory → Staging Area → Repository",
        explanation: "This three-stage design gives you precise control. Unlike a simple 'Save' button, Git lets you review and select exactly which changes to record. This is powerful when you've changed 10 files but only want to save 3 of them in one commit.",
        challenge: {
            type: "quiz", question: "What is the correct order of Git's three stages?",
            options: [
                "Repository → Staging Area → Working Directory",
                "Working Directory → Repository → Staging Area",
                "Working Directory → Staging Area → Repository",
                "Staging Area → Working Directory → Repository"
            ],
            answer: 2, hint: "Think about the shipping analogy: desk → box → post office."
        },
        initialState: {
            commits: [
                { id: "c1", msg: "Initial commit", branch: "main", marker: "The Big Bang", milestone: true, storyContext: "The moment the coffee shop dream became a project! This commit is the root of the entire tree." }
            ],
            branches: ["main"], head: "main",
            files: [{ name: "index.html", status: "modified" }, { name: "style.css", status: "staged" }, { name: "app.js", status: "committed" }]
        }
    },
    {
        id: 3, module: "Core Concepts & Setup", title: "The Hidden .git Folder",
        icon: "📁", xp: 50,
        content: "When you initialize Git in a project, it creates a hidden folder called `.git` inside your project directory. This is the brain of your repository!\n\nThe `.git` folder contains:\n• All your commit history (every snapshot ever saved)\n• Branch information (which timelines exist)\n• Configuration settings (your name, email, etc.)\n• The HEAD pointer (which tells Git where you currently are)\n\nYou should NEVER manually edit or delete the `.git` folder. If you delete it, you lose ALL your version history — it's like erasing your project's entire memory.\n\nThe `.git` folder is hidden by default because you don't need to interact with it directly — Git manages it for you behind the scenes.",
        explanation: "The .git folder is what makes a regular folder into a Git repository. Without it, Git has no idea your project exists. Everything Git knows lives inside this hidden directory.",
        challenge: {
            type: "quiz", question: "What happens if you delete the .git folder from your project?",
            options: [
                "Nothing, Git recreates it automatically",
                "Your files are deleted",
                "You lose all version history but keep your current files",
                "Git stops working on your entire computer"
            ],
            answer: 2, hint: "The .git folder stores ALL tracking data. What happens when you remove the brain?"
        },
        initialState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }], branches: ["main"], head: "main", files: [{ name: ".git/", status: "system" }, { name: ".git/config", status: "system" }, { name: ".git/HEAD", status: "system" }] }
    },
    {
        id: 4, module: "Core Concepts & Setup", title: "Installing Git",
        icon: "💻", xp: 50,
        content: "Before using Git, you need to install it on your computer. Here's how for each operating system:\n\nWindows:\nDownload the installer from git-scm.com. Choose the 64-bit version (most common). Run the installer and accept the default settings.\n\nmacOS:\nOpen Terminal and type `brew install git` (requires Homebrew), or download from git-scm.com.\n\nLinux (Ubuntu/Debian):\nOpen Terminal and type `sudo apt-get install git`.\n\nAfter installing, you can verify it worked by opening a terminal and typing:\n\n`git --version`\n\nThis should print something like `git version 2.42.0`. If you see a version number, Git is installed and ready to use!",
        explanation: "Git is a command-line tool that runs in your terminal (Command Prompt on Windows, Terminal on Mac/Linux). While graphical tools exist, learning the command line gives you the deepest understanding and the most control.",
        challenge: {
            type: "quiz", question: "How do you verify that Git is installed correctly?",
            options: [
                "Open the Git website",
                "Type 'git --version' in the terminal",
                "Check your Applications folder",
                "Restart your computer"
            ],
            answer: 1, hint: "There's a specific command you type in the terminal to check..."
        },
        initialState: { commits: [], branches: [], head: null, files: [] }
    },
    {
        id: 5, module: "Core Concepts & Setup", title: "Configuring Your Identity",
        icon: "🪪", xp: 75,
        content: "After installing Git, the FIRST thing you must do is tell Git who you are. This is mandatory because every commit (every save point) records who made it.\n\nYou need to set two things — your name and your email:\n\n`git config --global user.name \"Your Name\"`\n`git config --global user.email \"you@example.com\"`\n\nThe `--global` flag means this setting applies to ALL your Git projects on this computer. Without `--global`, the setting would only apply to the current project.\n\nThis is a one-time setup! Once configured, Git remembers your identity for every future project.",
        explanation: "Your Git identity is attached to every commit you make. When you work on a team, this is how everyone knows who changed what. It's like signing your name on every page of a shared notebook.",
        challenge: {
            type: "terminal", prompt: "Set your Git username — type: git config --global user.name \"Your Name\"",
            matchPattern: "git config --global user.name",
            expectedCommand: "git config --global user.name \"Your Name\"",
            successMessage: "Identity configured! Git now knows who you are. Every commit will be attributed to you.",
            hint: "Type: git config --global user.name \"Your Name\" (use any name you like)"
        },
        initialState: { commits: [], branches: ["main"], head: "main", files: [] },
        resultState: { commits: [], branches: ["main"], head: "main", files: [{ name: ".gitconfig", status: "committed" }] }
    },

    // ─── MODULE 2: THE LOCAL WORKFLOW ───
    {
        id: 6, module: "The Local Workflow", title: "Initializing a Repository",
        icon: "🚀", xp: 75,
        content: "To start tracking a project with Git, you need to initialize a repository. This is always the first step when starting a new project.\n\nNavigate to your project folder in the terminal and type:\n\n`git init`\n\nThis command does one thing: it creates the hidden `.git` folder inside your project. That's it! Your project folder is now a Git repository.\n\nBefore `git init`: Your folder is just a regular folder — Git knows nothing about it.\nAfter `git init`: Git is now watching every change you make inside this folder.\n\nYou only need to run `git init` once per project, at the very beginning.",
        explanation: "Think of git init as flipping a switch that turns on Git's tracking camera. From this moment on, Git can see every file you create, edit, or delete. But remember — seeing changes and SAVING them are different things (that's where add and commit come in).",
        challenge: {
            type: "terminal", prompt: "Initialize a new Git repository — type: git init",
            expectedCommand: "git init",
            successMessage: "Repository initialized! Notice the .git folder has been created. Git is now tracking this project.",
            diffData: [
                "--- /dev/null",
                "+++ .git/",
                "@@ -0,0 +1 @@",
                "+(Initial Git repository created)"
            ],
            hint: "Type exactly: git init"
        },
        initialState: { commits: [], branches: [], head: null, files: [] },
        resultState: { commits: [], branches: ["main"], head: "main", files: [{ name: ".git/", status: "system" }, { name: ".git/config", status: "system" }, { name: ".git/HEAD", status: "system" }] }
    },
    {
        id: 7, module: "The Local Workflow", title: "Checking File Status",
        icon: "🔍", xp: 75,
        content: "Now that Git is tracking your project, how do you know what's going on? The `git status` command is your best friend — it shows you the current state of ALL your files.\n\nType this command anytime to see what's happening:\n\n`git status`\n\nGit status will show you files in three categories:\n\n• Untracked files (red): New files Git has never seen before. Git notices them but isn't tracking them yet.\n• Modified files (red): Files that existed before but have been changed since the last commit.\n• Staged files (green): Files that are ready to be committed (saved permanently).\n\nThink of `git status` as asking Git: \"Hey, what's changed since the last save?\" You'll use this command constantly — it's the most frequently used Git command!",
        explanation: "Get into the habit of running git status before AND after every operation. It's your sanity check — it tells you exactly where things stand, what's been staged, and what hasn't been tracked yet. When in doubt, git status!",
        challenge: {
            type: "terminal", prompt: "Check the current status of your files — type: git status",
            expectedCommand: "git status",
            successMessage: "Status displayed! You can see which files are modified, staged, and untracked.",
            hint: "Type exactly: git status"
        },
        initialState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }], branches: ["main"], head: "main", files: [{ name: "index.html", status: "modified" }, { name: "style.css", status: "untracked" }] },
        resultState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }], branches: ["main"], head: "main", files: [{ name: "index.html", status: "modified" }, { name: "style.css", status: "untracked" }] }
    },
    {
        id: 8, module: "The Local Workflow", title: "Staging Files",
        icon: "📦", xp: 100,
        content: "Remember the shipping analogy? Staging is like putting items into the box before sealing it. You're telling Git: \"These are the changes I want to save.\"\n\nThe command to stage files is `git add`. There are several ways to use it:\n\n`git add index.html` — Stage one specific file\n`git add .` — Stage ALL changes in the current directory and subdirectories\n`git add --all` or `git add -A` — Stage ALL changes in the entire project\n\nWhich one should you use?\n• Use `git add filename` when you want to be precise about what to save.\n• Use `git add .` when you want to save everything you've changed.\n\nAfter staging, the file moves from red (unstaged) to green (staged) when you run `git status`.\n\nLet's practice! Stage the index.html file:\n\n`git add index.html`",
        explanation: "Staging gives you surgical control over your commits. Imagine you fixed a bug AND started a new feature — you can stage just the bug fix, commit it, then stage the feature separately. This keeps your project history clean and organized.",
        challenge: {
            type: "terminal", prompt: "Stage the index.html file — type: git add index.html",
            expectedCommand: "git add index.html",
            acceptAlso: ["git add ."],
            successMessage: "File staged! index.html has moved from 'modified' (red) to 'staged' (green). It's now ready to be committed.",
            hint: "Type: git add index.html"
        },
        initialState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }], branches: ["main"], head: "main", files: [{ name: "index.html", status: "modified" }] },
        resultState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }], branches: ["main"], head: "main", files: [{ name: "index.html", status: "staged" }] }
    },
    {
        id: 9, module: "The Local Workflow", title: "Your First Commit",
        icon: "🎯", xp: 100,
        content: "A commit is a permanent snapshot of your project at a specific moment. Think of it as pressing 'Save' in a video game — you can always come back to this exact state.\n\nTo create a commit, you use:\n\n`git commit -m \"Your message here\"`\n\nLet's break this down:\n• `git commit` — tells Git to save the staged changes\n• `-m` — stands for \"message\" (a shortcut to write the message inline)\n• `\"Your message here\"` — a short description of WHAT you changed and WHY\n\nGood commit messages are crucial! They're like breadcrumbs that help you (and your team) understand the project's history. Examples:\n• ✅ Good: \"Add login form validation\"\n• ✅ Good: \"Fix navbar disappearing on mobile\"\n• ❌ Bad: \"stuff\"\n• ❌ Bad: \"changes\"\n\nWe've already staged index.html for you. Now create your first commit!",
        explanation: "Each commit gets a unique ID (called a hash), records who made it, when, and what changed. Commits are the building blocks of Git history — they're what make time travel possible. Write messages that your future self will thank you for!",
        challenge: {
            type: "terminal", prompt: "Create your first commit — type: git commit -m \"your message\"",
            matchPattern: "git commit -m",
            expectedCommand: "git commit -m \"Initial commit\"",
            acceptAlso: ["git commit -m 'Initial commit'"],
            successMessage: "Your first commit! A new snapshot has been saved. Look at the commit graph — a new node appeared!",
            hint: "Type: git commit -m \"Initial commit\" (you can use any message you like)"
        },
        initialState: { commits: [], branches: ["main"], head: "main", files: [{ name: "index.html", status: "staged" }] },
        resultState: {
            commits: [
                { id: "a1b2c3", msg: "Initial commit", branch: "main", marker: "First Roast", milestone: true, storyContext: "You've officially sealed the first version of your coffee recipe! This is a solid point you can always return to if the recipe goes wrong." }
            ],
            branches: ["main"], head: "main",
            files: [{ name: "index.html", status: "committed" }]
        }
    },
    {
        id: 10, module: "The Local Workflow", title: "Staging Strategies",
        icon: "🧠", xp: 75,
        content: "Now that you know how staging works, let's explore the different strategies:\n\n`git add .` (dot)\nStages everything in the CURRENT directory and its subdirectories. If you're in the root of your project, this stages everything.\n\n`git add --all` or `git add -A`\nStages ALL changes across the ENTIRE project, no matter where you are in the directory structure. This also stages deleted files.\n\n`git add filename`\nStages only the specified file. This is the most precise option.\n\n`git add *.css`\nStages all files matching a pattern (in this case, all CSS files).\n\nWhich strategy should you use? It depends:\n• Working alone on a small project? `git add .` is usually fine.\n• Working on a team? Stage files individually with `git add filename` for cleaner commits.\n• Want to include deleted files? Use `git add --all`.",
        explanation: "The staging area is one of Git's most powerful features. It exists specifically so you can craft meaningful commits. Instead of saving everything at once, you can group related changes together — making your project history a readable story rather than random noise.",
        challenge: {
            type: "quiz", question: "What is the difference between 'git add .' and 'git add --all'?",
            options: [
                "They are exactly the same",
                "'git add .' stages the current directory; 'git add --all' stages the entire project including deletions",
                "'git add .' is faster than 'git add --all'",
                "'git add --all' only works on new files"
            ],
            answer: 1, hint: "Think about scope — one is relative to where you are, the other covers everything."
        },
        initialState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }], branches: ["main"], head: "main", files: [{ name: "index.html", status: "modified" }, { name: "style.css", status: "untracked" }, { name: "app.js", status: "modified" }] }
    },
    {
        id: 11, module: "The Local Workflow", title: "File Deletion with git rm",
        icon: "🗑️", xp: 75,
        content: "Sometimes you need to remove files from your project. But simply deleting a file from your computer isn't enough — you also need to tell Git to stop tracking it.\n\nThe `git rm` command does both at once: it deletes the file AND stages the deletion for the next commit.\n\n`git rm filename` — Delete a file and stage the removal\n`git rm -r foldername` — Recursively delete a folder and all its contents\n`git rm -f filename` — Force delete a file even if it has uncommitted changes\n\nImportant: After running `git rm`, you still need to run `git commit` to make the deletion permanent in your history.\n\nLet's practice removing the old.txt file that's no longer needed:\n\n`git rm old.txt`",
        explanation: "If you just delete a file normally (without git rm), Git will show it as 'deleted' in git status but won't stage the deletion for you. You'd then need to run 'git add' on the deleted file separately. git rm is the shortcut that handles both steps.",
        challenge: {
            type: "terminal", prompt: "Remove the old.txt file from the project — type: git rm old.txt",
            expectedCommand: "git rm old.txt",
            successMessage: "File removed and deletion staged! The file is gone from your working directory and Git knows about it.",
            diffData: [
                "--- a/old.txt",
                "+++ /dev/null",
                "@@ -1 +0,0 @@",
                "-This file is no longer needed."
            ],
            hint: "Type: git rm old.txt"
        },
        initialState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }, { id: "c2", msg: "Add project files", branch: "main" }], branches: ["main"], head: "main", files: [{ name: "index.html", status: "committed" }, { name: "old.txt", status: "committed" }] },
        resultState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }, { id: "c2", msg: "Add project files", branch: "main" }], branches: ["main"], head: "main", files: [{ name: "index.html", status: "committed" }] }
    },
    {
        id: 12, module: "The Local Workflow", title: "Removing from Tracking",
        icon: "👁️‍🗨️", xp: 75,
        content: "What if you accidentally started tracking a file you shouldn't have? For example, a file with passwords, API keys, or large binary files?\n\nYou don't want to delete the file — you just want Git to STOP tracking it. That's what `--cached` does:\n\n`git rm --cached secrets.txt`\n\nThis removes the file from Git's tracking (the staging area) but keeps the actual file on your computer. The file becomes \"untracked\" again — Git pretends it doesn't exist.\n\nThis is especially useful for:\n• Files with sensitive data (passwords, API keys)\n• Large files that shouldn't be in version control\n• IDE configuration files (like .idea/ or .vscode/)\n• Files you forgot to add to .gitignore\n\nLet's remove secrets.txt from tracking while keeping the actual file:",
        explanation: "The --cached flag is a lifesaver when you realize you've committed something you shouldn't have. Combined with a .gitignore file (which tells Git to permanently ignore certain files), it's the proper way to handle sensitive or unnecessary files.",
        challenge: {
            type: "terminal", prompt: "Stop tracking secrets.txt (keep the file) — type: git rm --cached secrets.txt",
            expectedCommand: "git rm --cached secrets.txt",
            successMessage: "File removed from tracking! Git will now ignore secrets.txt, but the file still exists on your computer.",
            diffData: [
                "--- a/secrets.txt",
                "+++ /dev/null",
                "@@ -1 +0,0 @@",
                "-API_KEY=5f3e9c..."
            ],
            hint: "Type: git rm --cached secrets.txt"
        },
        initialState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }], branches: ["main"], head: "main", files: [{ name: "index.html", status: "committed" }, { name: "secrets.txt", status: "committed" }] },
        resultState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }], branches: ["main"], head: "main", files: [{ name: "index.html", status: "committed" }, { name: "secrets.txt", status: "untracked" }] }
    },
    {
        id: 13, module: "The Local Workflow", title: "Viewing Commit History",
        icon: "📜", xp: 75,
        content: "Every commit you make is saved in Git's history. To see this history, use the `git log` command.\n\n`git log` — Shows the full commit history with details (hash ID, author, date, message)\n`git log --oneline` — Shows a compact, one-line-per-commit summary\n\nThe full `git log` shows each commit with:\n• A unique commit hash (like a fingerprint — e.g., a1b2c3d)\n• The author's name and email\n• The date and time\n• The commit message\n\nThe `--oneline` format is more practical for quick browsing — it shows just the short hash and the message on one line.\n\nLook at the commit graph on the left — those nodes ARE your commit history! Let's view it in the terminal:\n\n`git log --oneline`",
        explanation: "git log is your window into the project's past. The --oneline flag is great for a quick overview, but the full log gives you all the details you need for debugging or understanding who changed what and when.",
        challenge: {
            type: "terminal", prompt: "View the commit history in compact format — type: git log --oneline",
            expectedCommand: "git log --oneline",
            acceptAlso: ["git log"],
            successMessage: "History displayed! Each line shows a shortened hash and commit message. These are the snapshots of your project.",
            hint: "Type: git log --oneline"
        },
        initialState: { commits: [{ id: "a1b2c3", msg: "Initial commit", branch: "main" }, { id: "d4e5f6", msg: "Add homepage", branch: "main" }, { id: "g7h8i9", msg: "Add styling", branch: "main" }], branches: ["main"], head: "main", files: [{ name: "index.html", status: "committed" }, { name: "style.css", status: "committed" }] },
        resultState: { commits: [{ id: "a1b2c3", msg: "Initial commit", branch: "main" }, { id: "d4e5f6", msg: "Add homepage", branch: "main" }, { id: "g7h8i9", msg: "Add styling", branch: "main" }], branches: ["main"], head: "main", files: [{ name: "index.html", status: "committed" }, { name: "style.css", status: "committed" }] }
    },
    {
        id: 14, module: "The Local Workflow", title: "Comparing Changes with git diff",
        icon: "🔎", xp: 75,
        content: "Before committing, you often want to see EXACTLY what changed in your files. The `git diff` command shows you line-by-line differences.\n\n`git diff` — Shows unstaged changes (what's different between your working directory and the staging area)\n`git diff --staged` — Shows staged changes (what will be included in the next commit)\n`git diff commit1 commit2` — Compares two specific commits\n\nThe output uses colors:\n• Lines in RED (prefixed with -) are lines that were REMOVED\n• Lines in GREEN (prefixed with +) are lines that were ADDED\n• Lines without a prefix are unchanged context\n\nExample output:\n`-  <h1>Hello World</h1>`\n`+  <h1>Hello Git!</h1>`\n\nThis tells you the heading text was changed from \"Hello World\" to \"Hello Git!\".",
        explanation: "git diff is like a magnifying glass for your changes. Use it before committing to double-check your work. It's especially useful when you've been working for hours and need to remember exactly what you changed before creating a commit.",
        challenge: {
            type: "quiz", question: "In git diff output, what do red lines (prefixed with -) represent?",
            options: [
                "New lines that were added",
                "Lines that were removed or replaced",
                "Lines with errors",
                "Lines that haven't been changed"
            ],
            answer: 1, hint: "Think about what a minus sign means — something was taken away."
        },
        initialState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }, { id: "c2", msg: "Add content", branch: "main" }], branches: ["main"], head: "main", files: [{ name: "index.html", status: "modified" }] }
    },
    {
        id: 15, module: "The Local Workflow", title: "Local Workflow Review",
        icon: "🎓", xp: 100,
        content: "Let's review everything you've learned about the local Git workflow! Here's the complete cycle:\n\n1. `git init` — Start tracking a project (once per project)\n2. Edit your files — Work normally in your editor\n3. `git status` — Check what has changed\n4. `git add filename` — Stage the changes you want to save\n5. `git commit -m \"message\"` — Permanently save the staged changes\n6. `git log --oneline` — View your commit history\n\nThis cycle repeats over and over: edit → status → add → commit → repeat.\n\nAdditional commands you learned:\n• `git rm filename` — Delete a file and stage the deletion\n• `git rm --cached filename` — Stop tracking a file without deleting it\n• `git diff` — See what changed line by line\n\nRemember: `git status` is your best friend. Use it constantly to stay oriented!",
        explanation: "This edit-stage-commit workflow is the heartbeat of every Git project. Whether you're working alone or on a team of 100, these are the commands you'll use every single day. Master this cycle and you've mastered the foundation of Git.",
        challenge: {
            type: "quiz", question: "What is the correct sequence to save changes in Git?",
            options: [
                "git commit → git add → git status",
                "git add → git status → git commit",
                "git status → git add → git commit",
                "git init → git commit → git add"
            ],
            answer: 2, hint: "Think about the logical order: first check what changed, then prepare it, then save it."
        },
        initialState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }, { id: "c2", msg: "Add homepage", branch: "main" }], branches: ["main"], head: "main", files: [{ name: "index.html", status: "committed" }, { name: "style.css", status: "staged" }, { name: "app.js", status: "modified" }] }
    },

    // ─── MODULE 3: FIXING MISTAKES ───
    {
        id: 16, module: "Fixing Mistakes", title: "Undoing Changes Overview",
        icon: "⏪", xp: 75,
        content: "Everyone makes mistakes — that's exactly why Git exists! Git gives you several safety nets depending on WHERE your mistake is:\n\nMistake in the Working Directory (you edited a file badly):\n→ `git restore filename` — Throws away your local changes and reverts the file to the last committed version.\n\nMistake in the Staging Area (you staged something you shouldn't have):\n→ `git restore --staged filename` — Moves the file back from staging to working directory, keeping your changes intact.\n\nMistake in a Commit (you committed something wrong):\n→ `git revert commitID` — Creates a NEW commit that undoes the changes from a previous commit. This is the safest option.\n\nNuclear Option (delete everything since last commit):\n→ `git reset --hard` — ⚠️ DANGEROUS! Deletes ALL local changes permanently. Use only as a last resort.\n\nThe golden rule: The more recent the mistake, the easier it is to fix.",
        explanation: "Git's undo system is designed so you always have a way to recover. The key is matching the right command to the right situation. When in doubt, prefer 'git revert' because it never destroys history — it just adds a new commit that reverses the change.",
        challenge: {
            type: "quiz", question: "You staged a file by mistake. Which command moves it back to the working directory WITHOUT losing your changes?",
            options: [
                "git reset --hard",
                "git restore --staged filename",
                "git rm filename",
                "git revert HEAD"
            ],
            answer: 1, hint: "You want to unstage (remove from the staging area) without deleting anything."
        },
        initialState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }, { id: "c2", msg: "Add feature", branch: "main" }], branches: ["main"], head: "main", files: [{ name: "index.html", status: "staged" }, { name: "app.js", status: "modified" }] }
    },
    {
        id: 17, module: "Fixing Mistakes", title: "Restoring Files",
        icon: "🔄", xp: 75,
        content: "You've been editing index.html and made a mess of it. You want to throw away all your recent edits and go back to the last saved (committed) version.\n\nThe command to discard working directory changes is:\n\n`git restore index.html`\n\nThis reverts the file to exactly how it looked in the last commit. Your recent edits are permanently discarded.\n\n⚠️ Warning: This is destructive! Once you restore a file, your unsaved changes are gone forever. Git cannot recover them because they were never committed.\n\nUse this when:\n• You broke something and want to start over on that file\n• You were experimenting and want to undo the experiment\n• You accidentally edited the wrong file",
        explanation: "Think of git restore as an 'undo all' button for a specific file. It's powerful but irreversible — make sure you really want to throw away those changes before running it. If you're unsure, consider committing your current changes first (even as a 'work in progress' commit) before restoring.",
        challenge: {
            type: "terminal", prompt: "Discard changes to index.html — type: git restore index.html",
            expectedCommand: "git restore index.html",
            successMessage: "File restored! index.html has been reverted to its last committed state. Your recent edits have been discarded.",
            hint: "Type: git restore index.html"
        },
        initialState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }, { id: "c2", msg: "Add homepage", branch: "main" }], branches: ["main"], head: "main", files: [{ name: "index.html", status: "modified" }, { name: "style.css", status: "committed" }] },
        resultState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }, { id: "c2", msg: "Add homepage", branch: "main" }], branches: ["main"], head: "main", files: [{ name: "index.html", status: "committed" }, { name: "style.css", status: "committed" }] }
    },
    {
        id: 18, module: "Fixing Mistakes", title: "Unstaging Files",
        icon: "↩️", xp: 75,
        content: "Oops! You ran `git add` on a file that you didn't mean to stage. No problem — you can unstage it without losing your changes.\n\nThe command to remove a file from the staging area is:\n\n`git restore --staged style.css`\n\nThis moves the file back from the staging area to the working directory. Your changes are still there — they're just no longer queued for the next commit.\n\nThink of it like taking an item back OUT of the shipping box. The item still exists, you just decided not to ship it right now.\n\nYou can also unstage ALL files at once with:\n`git reset` (this unstages everything but keeps all your changes)",
        explanation: "This is one of the most common Git operations. You'll frequently stage a file, realize you want to make more changes first, unstage it, edit it more, and then stage it again. The staging area is flexible — files can move in and out freely.",
        challenge: {
            type: "terminal", prompt: "Unstage style.css (keep changes) — type: git restore --staged style.css",
            expectedCommand: "git restore --staged style.css",
            successMessage: "File unstaged! style.css is back in your working directory with all changes intact. It won't be included in the next commit.",
            hint: "Type: git restore --staged style.css"
        },
        initialState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }], branches: ["main"], head: "main", files: [{ name: "index.html", status: "staged" }, { name: "style.css", status: "staged" }] },
        resultState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }], branches: ["main"], head: "main", files: [{ name: "index.html", status: "staged" }, { name: "style.css", status: "modified" }] }
    },
    {
        id: 19, module: "Fixing Mistakes", title: "Understanding git reset",
        icon: "⚠️", xp: 75,
        content: "The `git reset` command has different power levels, like a volume knob:\n\n`git reset` (no flags)\nUnstages all files. Equivalent to running `git restore --staged` on every file. Your changes are preserved, just moved back to the working directory. Safe to use.\n\n`git reset --soft HEAD~1`\nUndoes the last commit but keeps the changes staged. It's like saying \"I committed too early, let me add more changes first.\" Relatively safe.\n\n`git reset --hard`\n⚠️ DANGEROUS! This is the nuclear option. It deletes ALL uncommitted changes — both staged and unstaged — and resets everything to the last commit. There is NO undo for this.\n\n`git reset --hard HEAD~1`\n⚠️ EXTREMELY DANGEROUS! Deletes the last commit AND all uncommitted changes. The commit is gone from history.\n\nRule of thumb: If working with a team, prefer `git revert` over `git reset` because revert doesn't rewrite history.",
        explanation: "git reset is powerful but risky. The --hard flag should be used with extreme caution because it permanently destroys work. In professional settings, --hard is generally avoided in favor of git revert, which is safer because it adds history instead of erasing it.",
        challenge: {
            type: "quiz", question: "Which git reset option is DANGEROUS and permanently destroys uncommitted changes?",
            options: [
                "git reset (no flags)",
                "git reset --soft",
                "git reset --hard",
                "git reset --mixed"
            ],
            answer: 2, hint: "The name itself sounds intense — which option is the 'nuclear option'?"
        },
        initialState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }, { id: "c2", msg: "Add feature", branch: "main" }], branches: ["main"], head: "main", files: [{ name: "index.html", status: "staged" }, { name: "app.js", status: "modified" }] }
    },
    {
        id: 20, module: "Fixing Mistakes", title: "Reverting Commits",
        icon: "🔙", xp: 100,
        content: "What if you committed something that broke the project, and other people have already pulled your changes? You can't just delete the commit — that would mess up everyone's history.\n\nThe solution is `git revert`. Instead of deleting the bad commit, it creates a brand NEW commit that does the exact opposite:\n\n`git revert abc1234`\n\n(Replace abc1234 with the actual commit hash from `git log`)\n\nFor example, if commit abc1234 added 3 lines and deleted 1 line, then `git revert abc1234` will delete those 3 lines and re-add that 1 line.\n\nWhy is this better than reset?\n• It doesn't rewrite history — the original commit still exists\n• It's safe to use on shared/public branches\n• Your teammates won't have conflicts\n\nLook at the commit graph — we want to undo the \"Break homepage\" commit. Let's revert it:\n\n`git revert c3d4e5`",
        explanation: "git revert is the professional way to undo changes. It's transparent — anyone looking at the history can see both the original change and its reversal. This makes debugging easier and keeps the team's history consistent.",
        challenge: {
            type: "terminal", prompt: "Revert the bad commit — type: git revert c3d4e5",
            expectedCommand: "git revert c3d4e5",
            successMessage: "Commit reverted! A new commit has been created that undoes the changes from the bad commit. The history is preserved.",
            hint: "Type: git revert c3d4e5"
        },
        initialState: { commits: [{ id: "a1b2c3", msg: "Initial commit", branch: "main" }, { id: "b2c3d4", msg: "Add homepage", branch: "main" }, { id: "c3d4e5", msg: "Break homepage", branch: "main" }], branches: ["main"], head: "main", files: [{ name: "index.html", status: "committed" }] },
        resultState: { commits: [{ id: "a1b2c3", msg: "Initial commit", branch: "main" }, { id: "b2c3d4", msg: "Add homepage", branch: "main" }, { id: "c3d4e5", msg: "Break homepage", branch: "main" }, { id: "d4e5f6", msg: "Revert \"Break homepage\"", branch: "main" }], branches: ["main"], head: "main", files: [{ name: "index.html", status: "committed" }] }
    },
    // ─── MODULE 4: PARALLEL DEVELOPMENT ───
    {
        id: 21, module: "Parallel Development", title: "Understanding Branches",
        icon: "🌿", xp: 75,
        content: "Imagine you're a chef with a successful restaurant menu. You want to experiment with new recipes, but you don't want to risk ruining the dishes your customers already love.\n\nSolution? Set up a side kitchen! You experiment there, and only add the new dish to the main menu when it's perfected.\n\nThat's exactly what Git branches do:\n\n• The `main` branch is your main menu — the stable, working version of your project.\n• A feature branch is your side kitchen — an isolated copy where you can experiment freely.\n\nWhen you create a branch, Git copies your current state and lets you make changes without affecting `main`. If your experiment works, you merge it back. If it fails, you delete the branch — no harm done!\n\nKey terms:\n• Branch: An independent line of development\n• HEAD: A pointer that tells Git which branch you're currently on (\"you are here\")\n• main: The default branch created when you initialize a repository",
        explanation: "Branches are Git's killer feature. They let teams work on multiple features simultaneously without stepping on each other's toes. In a real project, you might have branches for 'feature-login', 'bugfix-navbar', and 'experiment-new-ui' all running at the same time.",
        challenge: {
            type: "quiz", question: "What is the purpose of creating a Git branch?",
            options: [
                "To delete old code permanently",
                "To create an isolated environment for development without affecting the main code",
                "To speed up your computer's performance",
                "To upload code to GitHub"
            ],
            answer: 1, hint: "Think about the kitchen analogy — why would you set up a side kitchen?"
        },
        initialState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }, { id: "c2", msg: "Add homepage", branch: "main" }], branches: ["main"], head: "main", files: [{ name: "index.html", status: "committed" }] }
    },
    {
        id: 22, module: "Parallel Development", title: "Creating Branches",
        icon: "🔀", xp: 100,
        content: "Now let's create your first branch! There are two commands to know:\n\n`git branch` — Lists all branches in your project (the current branch has a * next to it)\n`git branch feature-login` — Creates a new branch called 'feature-login'\n\nWhen you create a branch:\n• Git creates a new pointer at your current commit\n• The new branch inherits ALL the history from the current branch\n• You're still on the original branch — creating doesn't switch you\n\nNaming conventions for branches:\n• Features: `feature-login`, `feature-dashboard`\n• Bug fixes: `bugfix-navbar`, `fix-typo`\n• Experiments: `experiment-new-ui`\n\nLet's create a branch called 'feature-login' for our new login page:\n\n`git branch feature-login`",
        explanation: "Branch names should be descriptive and use hyphens (not spaces). Good names tell your team what's being worked on at a glance. Many teams also include ticket numbers like 'feature/JIRA-123-login'.",
        challenge: {
            type: "terminal", prompt: "Create a new branch — type: git branch feature-login",
            expectedCommand: "git branch feature-login",
            successMessage: "Branch created! 'feature-login' now exists alongside 'main'. Notice the new branch in the visualization — but you're still on main!",
            hint: "Type: git branch feature-login"
        },
        initialState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }, { id: "c2", msg: "Add homepage", branch: "main" }], branches: ["main"], head: "main", files: [{ name: "index.html", status: "committed" }] },
        resultState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }, { id: "c2", msg: "Add homepage", branch: "main" }], branches: ["main", "feature-login"], head: "main", files: [{ name: "index.html", status: "committed" }] }
    },
    {
        id: 23, module: "Parallel Development", title: "Switching Branches",
        icon: "🔄", xp: 75,
        content: "Creating a branch doesn't move you there — you need to switch to it! There are two ways:\n\n`git checkout feature-login` — Switch to the feature-login branch\n`git checkout -b new-branch` — Create AND switch to a new branch in one step (shortcut!)\n\nWhen you switch branches:\n• Your working directory instantly changes to match that branch's state\n• Files that exist only on the other branch will appear/disappear\n• HEAD moves to point at the new branch\n\nThe `-b` flag is a popular shortcut that combines `git branch` + `git checkout` into one command.\n\nYou can also see all branches with `git branch` — the one with the * is your current branch.\n\nLet's switch to our feature branch:\n\n`git checkout feature-login`",
        explanation: "Switching branches is instant — Git just moves files around. Your working directory always reflects the current branch. This is why it's important to commit or stash your changes before switching — otherwise, Git might complain about unsaved work.",
        challenge: {
            type: "terminal", prompt: "Switch to the feature branch — type: git checkout feature-login",
            expectedCommand: "git checkout feature-login",
            acceptAlso: ["git switch feature-login"],
            successMessage: "Switched! You're now on 'feature-login'. Notice HEAD has moved to the new branch. Any commits you make now will be on this branch only.",
            hint: "Type: git checkout feature-login"
        },
        initialState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }, { id: "c2", msg: "Add homepage", branch: "main" }], branches: ["main", "feature-login"], head: "main", files: [{ name: "index.html", status: "committed" }] },
        resultState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }, { id: "c2", msg: "Add homepage", branch: "main" }], branches: ["main", "feature-login"], head: "feature-login", files: [{ name: "index.html", status: "committed" }] }
    },
    {
        id: 24, module: "Parallel Development", title: "Merging Branches",
        icon: "🔗", xp: 100,
        content: "Your feature is done and tested on the 'feature-login' branch. Now it's time to bring those changes back into 'main'. This is called merging.\n\nTo merge, you must:\n1. First, switch to the branch you want to merge INTO (the receiving branch)\n2. Then run the merge command\n\nStep 1: `git checkout main` (switch to main)\nStep 2: `git merge feature-login` (merge feature-login INTO main)\n\nGit will combine the changes from 'feature-login' into 'main'. If there are no conflicting changes, Git does this automatically — it's called a \"fast-forward merge.\"\n\nAfter merging, the feature branch's commits become part of main's history. You can then safely delete the feature branch if you're done with it.\n\nLet's merge the feature branch! We're already on main:\n\n`git merge feature-login`",
        explanation: "Merging is how features go from development to production. In professional workflows, merges often happen through Pull Requests (which we'll cover later) where teammates review the code before it's merged.",
        challenge: {
            type: "terminal", prompt: "Merge feature-login into main — type: git merge feature-login",
            expectedCommand: "git merge feature-login",
            successMessage: "Merge successful! The changes from 'feature-login' are now part of 'main'. Look at the commit graph — the branch has been integrated.",
            hint: "Type: git merge feature-login"
        },
        initialState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }, { id: "c2", msg: "Add homepage", branch: "main" }, { id: "c3", msg: "Add login form", branch: "feature-login" }], branches: ["main", "feature-login"], head: "main", files: [{ name: "index.html", status: "committed" }] },
        resultState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }, { id: "c2", msg: "Add homepage", branch: "main" }, { id: "c3", msg: "Add login form", branch: "main" }], branches: ["main", "feature-login"], head: "main", files: [{ name: "index.html", status: "committed" }, { name: "login.html", status: "committed" }] }
    },
    {
        id: 25, module: "Parallel Development", title: "Merge Conflicts",
        icon: "⚡", xp: 100,
        content: "Sometimes two branches edit the SAME line of the SAME file differently. When you try to merge, Git doesn't know which version to keep — this is called a merge conflict.\n\nWhen a conflict happens, Git marks the conflicting file like this:\n\n`<<<<<<< HEAD`\n`Your version of the code (current branch)`\n`=======`\n`Their version of the code (incoming branch)`\n`>>>>>>> feature-login`\n\nTo resolve the conflict:\n1. Open the conflicting file in your editor\n2. Find the `<<<<<<<`, `=======`, and `>>>>>>>` markers\n3. Decide which version to keep (or combine both)\n4. Delete the conflict markers\n5. Stage the resolved file: `git add filename`\n6. Commit the resolution: `git commit -m \"Resolve merge conflict\"`\n\nConflicts aren't errors — they're Git asking for your help! It's saying: \"I can't decide, you tell me.\"",
        explanation: "Merge conflicts are normal, especially in team projects. The key is not to panic. Read both versions carefully, decide what the code should look like, clean up the markers, and commit. With practice, resolving conflicts becomes second nature.",
        challenge: {
            type: "quiz", question: "What should you do AFTER manually resolving a merge conflict in a file?",
            options: [
                "Run git merge again",
                "Delete the file and recreate it",
                "Stage the file with git add, then commit",
                "Run git reset --hard"
            ],
            answer: 2, hint: "After editing the file to resolve the conflict, you need to tell Git you're done — using the same add + commit cycle."
        },
        initialState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }, { id: "c2", msg: "Update header", branch: "main" }, { id: "c3", msg: "Change header", branch: "feature" }], branches: ["main", "feature"], head: "main", conflict: true, files: [{ name: "index.html", status: "modified" }] }
    },

    // ─── MODULE 5: REMOTE COLLABORATION ───
    {
        id: 26, module: "Remote Collaboration", title: "Remote Repositories",
        icon: "🌐", xp: 75,
        content: "So far, everything we've done has been LOCAL — on your own computer. But what if your hard drive crashes? What if you need to collaborate with teammates?\n\nThat's where remote repositories come in. A remote is a copy of your repository hosted on a server (like GitHub, GitLab, or Bitbucket).\n\nKey concepts:\n\n• `origin` — The default name for your remote repository. When you clone a project or connect to GitHub, Git names that remote 'origin' automatically.\n\n• Remote URL — The web address of the remote repository (like https://github.com/username/myproject.git)\n\n• `git remote -v` — Shows you which remotes are connected and their URLs\n\nThe relationship is:\n• Your local repo → You work here, make commits\n• Remote repo (origin) → Backup & collaboration hub\n\nYou push changes UP to the remote and pull changes DOWN from the remote.",
        explanation: "Remotes are what make Git a collaboration tool instead of just a local backup system. In most workflows, 'origin' is your primary remote, but you can have multiple remotes (useful for open source projects where you might have your fork AND the original repo).",
        challenge: {
            type: "quiz", question: "What does 'origin' refer to in Git?",
            options: [
                "The first commit ever made",
                "The main branch of the repository",
                "The default name for the remote repository",
                "Your computer's local storage"
            ],
            answer: 2, hint: "When you connect to GitHub, Git gives the remote connection a name. What's the default name?"
        },
        initialState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }], branches: ["main"], head: "main", remotes: { origin: { url: "https://github.com/user/repo.git" } }, files: [{ name: "index.html", status: "committed" }] }
    },
    {
        id: 27, module: "Remote Collaboration", title: "Cloning a Repository",
        icon: "📥", xp: 75,
        content: "What if you want to work on a project that already exists on GitHub? You don't need to create it from scratch — you can CLONE it!\n\n`git clone` downloads a complete copy of a remote repository to your computer, including ALL its history, branches, and files.\n\n`git clone https://github.com/username/project.git`\n\nWhat happens when you clone:\n1. Git creates a new folder with the project name\n2. Downloads all files and the complete commit history\n3. Automatically sets up 'origin' to point to the source URL\n4. Checks out the default branch (usually 'main')\n\nCloning is different from downloading a ZIP file because:\n• You get the FULL history (every commit ever made)\n• You can push and pull changes to/from the remote\n• You're connected to the project, not just downloading a snapshot\n\nLet's clone a repository:",
        explanation: "Cloning is usually the first thing you do when joining a team or contributing to an open source project. The clone is a fully independent copy — you can work offline, make commits, and push them back when you're ready.",
        challenge: {
            type: "terminal", prompt: "Clone a repository — type: git clone https://github.com/team/project.git",
            matchPattern: "git clone",
            expectedCommand: "git clone https://github.com/team/project.git",
            successMessage: "Repository cloned! You now have a complete local copy with full history. The remote 'origin' is automatically configured.",
            hint: "Type: git clone https://github.com/team/project.git"
        },
        initialState: { commits: [], branches: [], head: null, files: [] },
        resultState: { commits: [{ id: "a1b2c3", msg: "Initial commit", branch: "main" }, { id: "d4e5f6", msg: "Add features", branch: "main" }], branches: ["main"], head: "main", remotes: { origin: { url: "https://github.com/team/project.git" } }, files: [{ name: "index.html", status: "committed" }, { name: "README.md", status: "committed" }] }
    },
    {
        id: 28, module: "Remote Collaboration", title: "Pushing Changes",
        icon: "📤", xp: 100,
        content: "You've made local commits and want to share them with your team. Pushing uploads your commits to the remote repository.\n\n`git push origin main`\n\nLet's break this down:\n• `git push` — The command to upload\n• `origin` — The name of the remote (where to send it)\n• `main` — The branch to push\n\nImportant rules:\n• You can only push commits, not unstaged or staged changes. Always commit first!\n• If someone else pushed changes that you don't have, Git will reject your push. You'll need to pull first.\n• The first push to a new branch might need: `git push -u origin branch-name` (the `-u` flag sets up tracking)\n\nThe flow is: edit → add → commit → push\n\nLet's push our local commits to GitHub:",
        explanation: "Pushing is how your work reaches the rest of the team. In many companies, you don't push directly to 'main' — instead, you push to a feature branch and create a Pull Request. But the push command is the same regardless.",
        challenge: {
            type: "terminal", prompt: "Push your commits to the remote — type: git push origin main",
            expectedCommand: "git push origin main",
            acceptAlso: ["git push"],
            successMessage: "Push successful! Your commits are now on GitHub. Your team can see your changes.",
            hint: "Type: git push origin main"
        },
        initialState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }, { id: "c2", msg: "Add feature", branch: "main" }], branches: ["main"], head: "main", remotes: { origin: { url: "https://github.com/user/repo.git" } }, files: [{ name: "index.html", status: "committed" }, { name: "feature.js", status: "committed" }] },
        resultState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }, { id: "c2", msg: "Add feature", branch: "main" }], branches: ["main"], head: "main", remotes: { origin: { url: "https://github.com/user/repo.git" } }, files: [{ name: "index.html", status: "committed" }, { name: "feature.js", status: "committed" }] }
    },
    {
        id: 29, module: "Remote Collaboration", title: "Fetching & Pulling",
        icon: "📥", xp: 100,
        content: "Your teammates have been pushing changes to GitHub while you were working. To get their changes, you have two options:\n\n`git fetch` — Downloads remote changes but does NOT merge them\nThink of it as checking your mailbox. The letters are there, but you haven't opened them yet.\n\n`git pull` — Downloads AND merges remote changes immediately\nThink of it as checking your mailbox AND reading every letter right away.\n\n`git pull` = `git fetch` + `git merge`\n\nWhich should you use?\n• `git pull` — When you want to quickly update and are confident there won't be conflicts\n• `git fetch` — When you want to review what changed before merging (safer on large teams)\n\nBest practice: Always pull before you start working to make sure you have the latest code!\n\nLet's pull the latest changes from the remote:\n\n`git pull origin main`",
        explanation: "In team environments, always pull before you push. This ensures you have the latest code and reduces merge conflicts. Think of it as checking the shared document before adding your edits — it keeps everyone in sync.",
        challenge: {
            type: "terminal", prompt: "Pull the latest changes — type: git pull origin main",
            expectedCommand: "git pull origin main",
            acceptAlso: ["git pull"],
            successMessage: "Pull complete! You now have the latest changes from the remote. Your local code is up to date.",
            hint: "Type: git pull origin main"
        },
        initialState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }], branches: ["main"], head: "main", remotes: { origin: { url: "https://github.com/user/repo.git" } }, files: [{ name: "index.html", status: "committed" }] },
        resultState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }, { id: "c2", msg: "teammate: Add navbar", branch: "main" }], branches: ["main"], head: "main", remotes: { origin: { url: "https://github.com/user/repo.git" } }, files: [{ name: "index.html", status: "committed" }, { name: "navbar.html", status: "committed" }] }
    },
    {
        id: 30, module: "Remote Collaboration", title: "Pull Requests",
        icon: "📋", xp: 100,
        content: "In professional teams, you don't merge directly into 'main'. Instead, you create a Pull Request (PR) — a formal request to merge your branch into another branch.\n\nThe Pull Request workflow:\n\n1. Create a feature branch: `git checkout -b feature-login`\n2. Make your changes, commit them\n3. Push the branch to GitHub: `git push origin feature-login`\n4. On GitHub, click \"New Pull Request\"\n5. Select the \"Base\" branch (main) and \"Compare\" branch (feature-login)\n6. Add a description of your changes\n7. Teammates review your code, leave comments\n8. After approval, click \"Merge Pull Request\"\n\nWhy use Pull Requests?\n• Code Review: Teammates catch bugs before they reach production\n• Discussion: You can discuss implementation decisions\n• Documentation: PRs serve as a record of why changes were made\n• Quality: No code reaches main without at least one review\n\nPRs are a GitHub/GitLab feature, not a Git command — they happen in the web browser.",
        explanation: "Pull Requests are the backbone of modern software development. Even solo developers use PRs to organize their work and create a paper trail. Most companies require at least one approval before a PR can be merged.",
        challenge: {
            type: "quiz", question: "What is the PRIMARY purpose of a Pull Request?",
            options: [
                "To download code from GitHub",
                "To allow code review before merging into the main branch",
                "To delete old branches automatically",
                "To create a backup of the repository"
            ],
            answer: 1, hint: "Think about what 'Request' means — you're requesting that someone review and approve your changes."
        },
        initialState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }, { id: "c2", msg: "Add homepage", branch: "main" }, { id: "c3", msg: "Add login form", branch: "feature-login" }], branches: ["main", "feature-login"], head: "feature-login", files: [{ name: "index.html", status: "committed" }, { name: "login.html", status: "committed" }] }
    },

    // ─── MODULE 6: ADVANCED TOOLS ───
    {
        id: 31, module: "Advanced Tools", title: "Stashing Work",
        icon: "📌", xp: 75,
        content: "You're in the middle of coding a feature when your teammate says: \"There's a critical bug on main — can you fix it NOW?\"\n\nProblem: You have uncommitted changes that aren't ready to be committed. You can't switch branches with dirty files.\n\nSolution: `git stash` — temporarily shelves your uncommitted changes so you can switch to something else.\n\n`git stash` — Saves your current changes and reverts your working directory to the last commit\n\nAfter fixing the bug, you come back and restore your stashed work:\n\n`git stash pop` — Restores your stashed changes and removes the stash\n\nThe analogy: Think of it like putting a bookmark in your book. You set it aside, handle the interruption, and then pick up right where you left off.\n\nLet's stash your current work:\n\n`git stash`",
        explanation: "Stashing is a developer's best friend during context switches. It's much cleaner than making a messy 'WIP' commit. Your stashed changes are stored safely and can be applied to any branch, not just the one you stashed from.",
        challenge: {
            type: "terminal", prompt: "Stash your current changes — type: git stash",
            expectedCommand: "git stash",
            successMessage: "Changes stashed! Your working directory is now clean. You can safely switch branches. When you're ready, use 'git stash pop' to restore your work.",
            hint: "Type: git stash"
        },
        initialState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }, { id: "c2", msg: "Add homepage", branch: "main" }], branches: ["main", "feature"], head: "feature", files: [{ name: "index.html", status: "committed" }, { name: "feature.js", status: "modified" }, { name: "utils.js", status: "staged" }] },
        resultState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }, { id: "c2", msg: "Add homepage", branch: "main" }], branches: ["main", "feature"], head: "feature", files: [{ name: "index.html", status: "committed" }] }
    },
    {
        id: 32, module: "Advanced Tools", title: "Stash Management",
        icon: "📚", xp: 75,
        content: "You can have MULTIPLE stashes! Git stores them in a stack (like a pile of bookmarks). Here are the commands to manage them:\n\n`git stash list` — View all saved stashes\nShows something like:\nstash@{0}: WIP on feature: abc1234 Add homepage\nstash@{1}: WIP on main: def5678 Initial commit\n\n`git stash pop` — Restore the most recent stash AND remove it from the list\n\n`git stash apply` — Restore the most recent stash but KEEP it in the list\nUseful when you want to apply the same stash to multiple branches.\n\n`git stash drop` — Delete the most recent stash without restoring it\n\n`git stash apply stash@{1}` — Apply a specific stash by its index\n\nTip: Don't let stashes pile up! Apply or drop them regularly. Old stashes are confusing and can cause conflicts.",
        explanation: "The difference between 'pop' and 'apply' is important: pop removes the stash after restoring, while apply keeps it. Use apply when you want to try your stashed changes on a different branch without losing the stash.",
        challenge: {
            type: "quiz", question: "What is the difference between 'git stash pop' and 'git stash apply'?",
            options: [
                "There is no difference — they do the same thing",
                "pop restores and removes the stash; apply restores but keeps the stash",
                "pop only works on the main branch; apply works on any branch",
                "apply is faster than pop"
            ],
            answer: 1, hint: "One of them removes the stash from the list after restoring, the other keeps a copy."
        },
        initialState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }], branches: ["main"], head: "main", files: [{ name: "index.html", status: "committed" }] }
    },
    {
        id: 33, module: "Advanced Tools", title: "Understanding Rebasing",
        icon: "📐", xp: 100,
        content: "When you merge a branch, Git creates a \"merge commit\" — an extra commit that says \"these two branches were combined.\" Over time, this can make your history messy with lots of merge commits.\n\nRebasing is an alternative to merging that creates a CLEAN, LINEAR history.\n\n`git rebase main`\n\nInstead of creating a merge commit, rebase takes your branch's commits and REPLAYS them on top of the target branch. The result is a straight line of history, as if the branch never existed.\n\nMerge result: A → B → C ─┐\n                          └→ D → E (merge commit)\n\nRebase result: A → B → C → D → E (clean line)\n\n⚠️ THE GOLDEN RULE OF REBASING:\nNEVER rebase commits that have been pushed to a shared/public branch! Rebasing rewrites history, and if others have already pulled those commits, it creates chaos.\n\nRebase is safe to use on:\n• Your local feature branches (before pushing)\n• Private branches that nobody else is working on",
        explanation: "Rebasing creates a cleaner, more readable history — but at the cost of rewriting commits. In practice, many teams use 'rebase before merge' — you rebase your feature branch onto main to get a clean history, then merge it via a Pull Request.",
        challenge: {
            type: "quiz", question: "When should you NEVER use git rebase?",
            options: [
                "On your local feature branch",
                "Before pushing commits to a remote",
                "On shared/public branches where others have already pulled the commits",
                "On branches with only one commit"
            ],
            answer: 2, hint: "The golden rule: don't rewrite history that others are relying on."
        },
        initialState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }, { id: "c2", msg: "Add homepage", branch: "main" }, { id: "c3", msg: "Add feature", branch: "feature" }], branches: ["main", "feature"], head: "feature", files: [{ name: "index.html", status: "committed" }, { name: "feature.js", status: "committed" }] }
    },
    {
        id: 34, module: "Advanced Tools", title: "Rebase in Practice",
        icon: "🔧", xp: 100,
        content: "Let's see rebasing in action! You're on a feature branch and want to replay your commits on top of the latest main branch.\n\nThe workflow:\n1. You're on your feature branch\n2. Main has new commits you don't have\n3. Instead of merging main into your branch (creating a merge commit), you rebase:\n\n`git rebase main`\n\nThis takes all the commits unique to your feature branch and replays them on top of main's latest commit. The result is a clean, linear history.\n\nAfter rebasing:\n• Your branch appears to have been created from the latest main commit\n• No merge commits clutter the history\n• The commit hashes will change (because commits are replayed)\n\nWe're currently on the 'feature' branch. Let's rebase onto main:\n\n`git rebase main`",
        explanation: "Rebasing is a powerful tool for keeping a clean project history. Combined with Pull Requests and code review, it ensures that when changes land in main, the history tells a clear, linear story of how the project evolved.",
        challenge: {
            type: "terminal", prompt: "Rebase your feature branch onto main — type: git rebase main",
            expectedCommand: "git rebase main",
            successMessage: "Rebase complete! Your feature commits have been replayed on top of main. The history is now a clean, linear line.",
            hint: "Type: git rebase main"
        },
        initialState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }, { id: "c2", msg: "Add homepage", branch: "main" }, { id: "c3", msg: "Update styles", branch: "main" }, { id: "c4", msg: "Add feature", branch: "feature" }], branches: ["main", "feature"], head: "feature", files: [{ name: "index.html", status: "committed" }, { name: "feature.js", status: "committed" }] },
        resultState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }, { id: "c2", msg: "Add homepage", branch: "main" }, { id: "c3", msg: "Update styles", branch: "main" }, { id: "c4r", msg: "Add feature", branch: "main" }], branches: ["main", "feature"], head: "feature", files: [{ name: "index.html", status: "committed" }, { name: "feature.js", status: "committed" }] }
    },
    {
        id: "conflict-1",
        module: "Collaboration Scenarios",
        title: "The Great Conflict",
        icon: "⚔️",
        xp: 150,
        content: "### Oh no! A Merge Conflict!\nWhile you were making coffee, Sarah pushed a change to the EXACT same line in `recipe.md`. Git doesn't know which one to keep.",
        explanation: "Think of it like two people trying to write on the same line of a notebook. You need to pick which one is correct. This is the ultimate test for a beginner!",
        teammateEvent: {
            userName: "Sarah (Lead Dev)",
            userIcon: "👩‍💻",
            message: "Just pushed the new roast timings! Hope I didn't break anything... 😅"
        },
        challenge: {
            type: "terminal",
            prompt: "Resolve the conflict by merging 'main' into your branch.",
            expectedCommand: "git merge main",
            diffData: [
                "<<<<<<< HEAD",
                "Brew time: 5 mins",
                "=======",
                "Brew time: 7 mins",
                ">>>>>>> main"
            ]
        },
        initialState: {
            head: "feature-roast",
            conflict: true,
            files: [
                { name: "recipe.md", status: "conflict" }
            ],
            commits: [
                { id: "a1b2c3d", msg: "Initial roast", branch: "main" },
                { id: "e5f6g7h", msg: "My roast tweak", branch: "feature-roast" }
            ]
        },
        resultState: {
            head: "feature-roast",
            files: [
                { name: "recipe.md", status: "committed" }
            ],
            commits: [
                { id: "a1b2c3d", msg: "Initial roast", branch: "main" },
                { id: "e5f6g7h", msg: "My roast tweak", branch: "feature-roast" },
                { id: "x9y8z7w", msg: "Merge branch 'main'", branch: "feature-roast" }
            ]
        }
    },
    {
        id: "ignore-1",
        module: "Collaboration Scenarios",
        title: "The .gitignore Lab",
        icon: "🙈",
        xp: 100,
        content: "### Making Files Disappear\nSome files should NEVER be in Git (like `node_modules` or `.env` files with passwords). You tell Git to ignore them using a special file called `.gitignore`.",
        explanation: "Adding a file to `.gitignore` is like giving Git a pair of 'invisible' glasses. It will simply ignore those files even if they are in your folder.",
        challenge: {
            type: "terminal",
            prompt: "Create a .gitignore file to ignore 'logs.txt'. Type: echo logs.txt > .gitignore",
            expectedCommand: "echo logs.txt > .gitignore",
            diffData: [
                "--- /dev/null",
                "+++ .gitignore",
                "@@ -0,0 +1 @@",
                "+logs.txt"
            ]
        },
        initialState: {
            head: "main",
            files: [
                { name: "index.html", status: "committed" },
                { name: "logs.txt", status: "untracked" }
            ],
            commits: [{ id: "c1", msg: "Initial commit", branch: "main" }]
        },
        resultState: {
            head: "main",
            files: [
                { name: "index.html", status: "committed" },
                { name: ".gitignore", status: "staged" }
            ],
            commits: [{ id: "c1", msg: "Initial commit", branch: "main" }]
        }
    }
];

export const GIT_COMMANDS = [
    "git init", "git status", "git add", "git add .", "git add --all",
    "git commit -m", "git log", "git log --oneline", "git diff",
    "git rm", "git rm --cached", "git restore", "git restore --staged",
    "git reset", "git reset --hard", "git revert",
    "git branch", "git checkout", "git checkout -b", "git merge",
    "git clone", "git push", "git pull", "git fetch",
    "git remote -v", "git stash", "git stash pop", "git stash apply",
    "git stash list", "git stash drop", "git rebase",
    "git config --global user.name", "git config --global user.email",
];

