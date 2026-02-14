export const LESSONS = [
    // ─── MODULE 1: FUNDAMENTALS (Setup & Local Basics) ───
    {
        id: 1, module: "Module 1: Fundamentals", title: "The 'Git' Philosophy",
        icon: "💡", xp: 50,
        content: "Before we touch the terminal, let's understand Git's philosophy. Most beginners think of Git as a way to save files. It's much deeper than that.\n\nImagine you're developing a secret coffee roast. Traditional 'saving' is like overwriting your recipe every time. Git is different — it's like a **Time Machine** for your recipe book. It records every tiny tweak, who made it, and why.\n\n### Why Git Matters:\n• **Collaboration**: Parallel roasting! You tweak the beans while your partner tweaks the water temperature.\n• **Safety**: If a batch is ruined, you instantly jump back to 'Version 4'.\n• **Context**: Every save (commit) explains *why* a change was made.",
        explanation: "Pro Git 1.1: Git is a Distributed Version Control System. Unlike Centralized systems (SVN), every developer has a FULL copy of the project history on their own machine. This is your project's digital immune system.",
        challenge: {
            type: "quiz", question: "What is the core difference between Git and traditional saving?",
            options: [
                "Git saves files faster than a regular editor",
                "Git only works when you have an internet connection",
                "Git keeps a complete history of all changes, allowing you to 'time travel'",
                "Git replaces the need for folders"
            ],
            answer: 2, hint: "Think about the recipe book analogy — do we overwrite or record?"
        },
        bonusPractice: {
            type: "terminal",
            prompt: "Let's verify Git is installed on your machine!",
            steps: [
                {
                    instruction: "Check your Git version",
                    expectedCommand: "git --version",
                    acceptAlso: ["git -v"],
                    successMessage: "Git is installed! You\'re ready to start your version control journey.",
                    hint: "git --version"
                }
            ]
        },
        initialState: { commits: [], branches: ["main"], head: "main", files: [] }
    },
    {
        id: 2, module: "Module 1: Fundamentals", title: "Git vs GitHub: The Coffee Shop",
        icon: "☕", xp: 50,
        content: "Beginners often confuse Git and GitHub. Let's use our coffee shop analogy to fix that once and for all:\n\n• **Git is the Coffee Engine**: It's the technical tool on your local machine. It tracks files offline. You own the engine.\n• **GitHub is the Coffee Shop**: It's the social cloud platform where you host your projects. It's the place where others can 'taste' your code and collaborate.\n\nYou use Git to brew the project; you use GitHub to serve it to the world.",
        explanation: "Git is the engine; GitHub is the garage. You can build a car in your engine without a garage, but the garage makes it easier to show it to friends and work on it together.",
        challenge: {
            type: "quiz", question: "Can you use Git without having a GitHub account?",
            options: [
                "No, Git requires a cloud connection to work",
                "Yes, because Git is a local tool that works completely offline",
                "Only if you use a Mac",
                "Only for projects smaller than 1GB"
            ],
            answer: 1, hint: "Remember the engine/garage analogy."
        },
        bonusPractice: {
            type: "terminal",
            prompt: "Prove Git works without any internet! Initialize a local repo.",
            steps: [
                {
                    instruction: "Initialize a new Git repository right here",
                    expectedCommand: "git init",
                    successMessage: "See? No internet needed. Git works 100% locally!",
                    hint: "git init"
                }
            ]
        },
        initialState: { commits: [], branches: ["main"], head: "main", files: [] }
    },
    {
        id: 3, module: "Module 1: Fundamentals", title: "The Three Stages: Your Desk",
        icon: "🏗️", xp: 75,
        content: "Git doesn't just 'save' everything at once. It uses a **Three-Stage Architecture** for surgical precision:\n\n1. **Working Directory (Your Desk)**: Where you currently edit files. Changes here are 'untracked' or 'modified'.\n2. **Staging Area (The Shipping Box)**: A landing zone for changes you *intend* to save. You can choose to stage File A but not File B.\n3. **Repository (The Vault)**: Where Git stores the final, permanent snapshots (commits).\n\nThis workflow ensures your project history is clean and intentional.",
        explanation: "Pro Git 1.3: The three states of your files: Modified, Staged, and Committed. This unique design is what gives Git its power over simple 'Autosave' features.",
        challenge: {
            type: "quiz", question: "Which area acts as a 'middle ground' where you prepare specific changes before saving?",
            options: [
                "The Vault",
                "The Working Directory",
                "The Staging Area",
                "The .git folder"
            ],
            answer: 2, hint: "It's like a shipping box you're filling up."
        },
        bonusPractice: {
            type: "terminal",
            prompt: "See the three stages in action! Check and stage your files.",
            steps: [
                {
                    instruction: "Check which files are in each stage",
                    expectedCommand: "git status",
                    successMessage: "You can see modified, staged, and untracked files — the three stages!",
                    hint: "git status"
                },
                {
                    instruction: "Move roast_v1.txt from your Desk to the Shipping Box (stage it)",
                    expectedCommand: "git add roast_v1.txt",
                    successMessage: "Staged! The file moved from Working Directory to Staging Area.",
                    hint: "git add roast_v1.txt"
                }
            ]
        },
        initialState: {
            commits: [],
            branches: ["main"], head: "main",
            files: [
                { name: "roast_v1.txt", status: "modified" },
                { name: "beans.md", status: "staged" },
                { name: "shop_logo.png", status: "untracked" }
            ]
        },
        resultState: {
            commits: [],
            branches: ["main"], head: "main",
            files: [
                { name: "roast_v1.txt", status: "staged" },
                { name: "beans.md", status: "staged" },
                { name: "shop_logo.png", status: "untracked" }
            ]
        }
    },
    {
        id: 4, module: "Module 1: Fundamentals", title: "Initializing the 'Brain'",
        icon: "📁", xp: 50,
        content: "Every tracked project needs a brain. In Git, this brain is the hidden `.git` folder. Without it, your folder is just a regular bunch of files.\n\nWhen you run `git init`, Git creates this hidden folder. It contains all the history, configurations, and pointers. **Never delete this folder** unless you want to erase your project's memory forever!",
        explanation: "The .git folder is the repository. Everything else in your project folder is just a 'checkout' of one version of your project.",
        challenge: {
            type: "terminal",
            prompt: "Prepare your project! Set up the Git 'Brain' now.",
            steps: [
                {
                    instruction: "Initialize the repository",
                    expectedCommand: "git init",
                    successMessage: "Brain created! The .git folder is now watching.",
                    hint: "Type: git init"
                }
            ]
        },
        initialState: { commits: [], branches: [], head: null, files: [] },
        resultState: {
            commits: [], branches: ["main"], head: "main",
            files: [{ name: ".git/", status: "system" }]
        }
    },
    {
        id: 5, module: "Module 1: Fundamentals", title: "Configuring Your Identity",
        icon: "🪪", xp: 100,
        content: "Every commit in history needs an author. Git won't let you save your 'roast' secrets without signing your work first! \n\nYou must configure your name and email using these commands:\n• `git config --global user.name \"Your Name\"` \n• `git config --global user.email \"you@example.com\"` \n\nThis is a one-time setup that attaches your digital signature to every project you touch.",
        explanation: "Pro Git 1.6: These settings live in your `.gitconfig` file. Use the `--global` flag to set them once for your entire computer.",
        challenge: {
            type: "terminal",
            prompt: "Tell Git who is brewing this code.",
            steps: [
                {
                    instruction: "Set your global username",
                    expectedCommand: "git config --global user.name \"Name\"",
                    matchPattern: "git config --global user.name",
                    successMessage: "Name set! Now Git knows who the 'Roaster' is.",
                    hint: "git config --global user.name \"Your Name\""
                },
                {
                    instruction: "Set your global email",
                    expectedCommand: "git config --global user.email \"you@example.com\"",
                    matchPattern: "git config --global user.email",
                    successMessage: "Identity complete! You are ready to record history.",
                    hint: "git config --global user.email \"you@example.com\""
                }
            ]
        },
        initialState: { commits: [], branches: ["main"], head: "main", files: [] },
        resultState: { commits: [], branches: ["main"], head: "main", files: [{ name: ".gitconfig", status: "committed" }] }
    },
    {
        id: 6, module: "Module 1: Fundamentals", title: "The Power of 'Status'",
        icon: "🔎", xp: 50,
        content: "`git status` is the most important command you'll ever learn. It's your compass. It tells you exactly what Git is seeing in your folder right now.\n\nThink of it as looking at your desk before you start work. In the terminal, files shown in **Red** are untracked — Git knows they exist but isn't watching them yet.",
        explanation: "Running git status frequently prevents mistakes. It's the ultimate 'What did I just do?' tool.",
        challenge: {
            type: "terminal",
            prompt: "Audit your current work state to see the new recipe.",
            steps: [
                {
                    instruction: "Check the status of your folder",
                    expectedCommand: "git status",
                    successMessage: "Perfect! See the 'recipe.md' in red? That's an untracked file.",
                    hint: "git status"
                }
            ]
        },
        initialState: {
            commits: [],
            branches: ["main"], head: "main",
            files: [{ name: "recipe.md", status: "untracked" }]
        },
        resultState: {
            commits: [],
            branches: ["main"], head: "main",
            files: [{ name: "recipe.md", status: "untracked" }]
        }
    },
    {
        id: 7, module: "Module 1: Fundamentals", title: "Recording Your First Roast",
        icon: "🖍️", xp: 100,
        content: "Now that you've seen that 'Red' file in your status, it's time for the real work. To save it, you must perform the **Two-Step Shuffle**:\n\n1. **Add**: Move it to the Staging area (the shipping box) using `git add recipe.md`.\n2. **Commit**: Seal the box and put it in the Vault using `git commit -m \"Your message\"`.",
        explanation: "Pro Git 2.2: Recording changes to the repository. Note how files transition through the Three Stages.",
        challenge: {
            type: "terminal",
            prompt: "Seal your secret recipe into the vault.",
            steps: [
                {
                    instruction: "Stage the recipe file",
                    expectedCommand: "git add recipe.md",
                    successMessage: "Boxed! The file is now in the Staging area.",
                    hint: "git add recipe.md"
                },
                {
                    instruction: "Commit with a message",
                    expectedCommand: "git commit -m \"Initial recipe\"",
                    matchPattern: "git commit -m",
                    successMessage: "History recorded! You've made your first snapshot.",
                    hint: "git commit -m \"Initial recipe\""
                }
            ]
        },
        initialState: {
            commits: [], branches: ["main"], head: "main",
            files: [{ name: "recipe.md", status: "untracked" }]
        },
        resultState: {
            commits: [{ id: "c1", msg: "Initial recipe", branch: "main", marker: "The Big Bang", milestone: true }],
            branches: ["main"], head: "main",
            files: [{ name: "recipe.md", status: "committed" }]
        }
    },
    {
        id: 8, module: "Module 1: Fundamentals", title: "Shortcuts: Staging All",
        icon: "⚡", xp: 75,
        content: "In large projects, manually adding 50 files one by one is painful. Git provides shortcuts to stage multiple changes at once.\n\n• `git add .` : Stage everything in your current folder.\n• `git add --all` : Stage every change in the entire project.\n• `git add *.css` : Stage all CSS files.\n\nUse these carefully! Don't accidentally stage your private notes.",
        explanation: "Pro Git 2.2: Tracking new files. The `.` refers to the current directory.",
        challenge: {
            type: "terminal",
            prompt: "Clean up the desk! Stage all files.",
            steps: [
                {
                    instruction: "Stage everything at once",
                    expectedCommand: "git add .",
                    acceptAlso: ["git add --all", "git add -A"],
                    successMessage: "All files boxed and ready for shipping!",
                    hint: "git add ."
                }
            ]
        },
        initialState: {
            commits: [{ id: "c1", msg: "Initial commit", branch: "main" }],
            branches: ["main"], head: "main",
            files: [
                { name: "index.html", status: "modified" },
                { name: "style.css", status: "untracked" },
                { name: "beans.jpg", status: "untracked" }
            ]
        },
        resultState: {
            commits: [{ id: "c1", msg: "Initial commit", branch: "main" }],
            branches: ["main"], head: "main",
            files: [
                { name: "index.html", status: "staged" },
                { name: "style.css", status: "staged" },
                { name: "beans.jpg", status: "staged" }
            ]
        }
    },
    {
        id: 9, module: "Module 1: Fundamentals", title: "The Commit Message Guide",
        icon: "📝", xp: 50,
        content: "A commit message is a letter to your future self. 'Fixed stuff' is a terrible letter. 'Add validation to the coffee bean counter' is a great one.\n\n### The Golden Rules:\n1. Be concise but descriptive.\n2. Use the imperative mood (e.g., 'Add feature' not 'Added feature').\n3. Imagine your teammate reading this 6 months from now.",
        explanation: "Good commit messages make `git log` readable. Your history should read like a story of progress.",
        challenge: {
            type: "quiz", question: "Which of these is considered a 'Best Practice' commit message?",
            options: [
                "bug fix",
                "Fix: resolve bean overflow in local roaster",
                "I finally fixed the annoying bug that was making the coffee taste like dirt",
                "updated code"
            ],
            answer: 1, hint: "Look for the one that provides context without being a novel."
        },
        bonusPractice: {
            type: "terminal",
            prompt: "Write a proper commit message following the golden rules!",
            steps: [
                {
                    instruction: "Commit with a descriptive message in imperative mood",
                    expectedCommand: "git commit -m \"Add coffee bean counter validation\"",
                    matchPattern: "git commit -m",
                    successMessage: "Great commit message! Descriptive and imperative — your future self will thank you.",
                    hint: "git commit -m \"Add coffee bean counter validation\""
                }
            ]
        },
        initialState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }], branches: ["main"], head: "main", files: [{ name: "counter.js", status: "staged" }] },
        resultState: { commits: [{ id: "c1", msg: "Initial commit", branch: "main" }, { id: "c2", msg: "Add validation", branch: "main" }], branches: ["main"], head: "main", files: [] }
    },
    {
        id: 10, module: "Module 1: Fundamentals", title: "Summary: The Local Heartbeat",
        icon: "🏁", xp: 100,
        content: "You've mastered the 'Local Heartbeat' of Git. Every developer, from startups to Google, uses this exact cycle:\n\n1. **Edit**: Open your code and break things.\n2. **Status**: Check what's broken.\n3. **Add**: Choose what to save.\n4. **Commit**: Save the history.\n\nReady to move to branching? Let's go!",
        explanation: "This cycle is the foundation. Master it, and you're 50% of the way to being a Git pro.",
        challenge: {
            type: "terminal",
            prompt: "Finish Module 1 with a clean commit.",
            steps: [
                {
                    instruction: "Check the status first",
                    expectedCommand: "git status",
                    successMessage: "Good habit! See your modified files.",
                    hint: "git status"
                },
                {
                    instruction: "Stage the final progress",
                    expectedCommand: "git add .",
                    successMessage: "Finalizing...",
                    hint: "git add ."
                },
                {
                    instruction: "Commit Module 1 completion",
                    expectedCommand: "git commit -m \"Complete Module 1\"",
                    matchPattern: "git commit -m",
                    successMessage: "MODULE 1 COMPLETE! 🎉 You've learned the fundamentals of professional version control.",
                    hint: "git commit -m \"Complete Module 1\""
                }
            ]
        },
        initialState: {
            commits: [{ id: "c1", msg: "Initial commit", branch: "main" }],
            branches: ["main"], head: "main",
            files: [{ name: "module1_notes.md", status: "modified" }]
        },
        resultState: {
            commits: [
                { id: "c1", msg: "Initial commit", branch: "main" },
                { id: "c2", msg: "Complete Module 1", branch: "main", milestone: true, marker: "Fundamentals Mastery" }
            ],
            branches: ["main"], head: "main",
            files: [{ name: "module1_notes.md", status: "committed" }]
        }
    },

    // ─── MODULE 2: BRANCHING (Parallel Universes) ───
    {
        id: 11, module: "Module 2: Branching", title: "Branching: Multiple Universes",
        icon: "🌿", xp: 100,
        content: "Imagine your coffee shop is stable and profitable. You want to experiment with a 'Spicy Pumpkin Latte', but if it tastes terrible, you don't want to ruin your main menu.\n\nIn Git, a **Branch** is a pointer to a specific commit. By creating a branch, you create a 'Parallel Universe'. You can experiment freely, and if it works, you bring it home (Merge). If not, you delete the universe and no one ever knows.",
        explanation: "Pro Git 3.1: A branch in Git is simply a lightweight movable pointer to one of these commits. The default branch name in Git is 'main'.",
        challenge: {
            type: "quiz", question: "What is the primary benefit of using branches?",
            options: [
                "It makes the files smaller",
                "It allows you to work on new features without affecting the stable code",
                "It automatically fixes bugs for you",
                "It speeds up git push"
            ],
            answer: 1, hint: "Side kitchens and experimental menus — why isolate them?"
        },
        bonusPractice: {
            type: "terminal",
            prompt: "Create your first branch and see it in the list!",
            steps: [
                {
                    instruction: "List all existing branches",
                    expectedCommand: "git branch",
                    successMessage: "You can see the asterisk (*) marks your current branch!",
                    hint: "git branch"
                },
                {
                    instruction: "Create a new branch called 'feature'",
                    expectedCommand: "git branch feature",
                    successMessage: "New branch created! Notice you\'re still on main — creating doesn\'t switch.",
                    hint: "git branch feature"
                }
            ]
        },
        initialState: { commits: [{ id: "c1", msg: "Initial roast", branch: "main" }], branches: ["main"], head: "main", files: [] },
        resultState: { commits: [{ id: "c1", msg: "Initial roast", branch: "main" }], branches: ["main", "feature"], head: "main", files: [] }
    },
    {
        id: 12, module: "Module 2: Branching", title: "Creating Your Side Kitchen",
        icon: "🔀", xp: 100,
        content: "Let's create that experiment branch. You use `git branch [name]` to create the pointer.\n\nNote: Creating a branch **does not** switch you to it. You're still in the 'Main Kitchen' until you step into the new one.",
        explanation: "Pro Git 3.2: Basic Branching. Git creates a new pointer at the same commit you're currently on.",
        challenge: {
            type: "terminal",
            prompt: "Create a branch for your experiments.",
            steps: [
                {
                    instruction: "Create the 'experiment' branch",
                    expectedCommand: "git branch experiment",
                    successMessage: "Branch created! It's invisible for now, but the pointer exists.",
                    hint: "git branch experiment"
                },
                {
                    instruction: "List all branches to see it",
                    expectedCommand: "git branch",
                    successMessage: "There it is! Notice the * is still on main.",
                    hint: "git branch"
                }
            ]
        },
        initialState: { commits: [{ id: "c1", msg: "Initial roast", branch: "main" }], branches: ["main"], head: "main", files: [] },
        resultState: { commits: [{ id: "c1", msg: "Initial roast", branch: "main" }], branches: ["main", "experiment"], head: "main", files: [] }
    },
    {
        id: 13, module: "Module 2: Branching", title: "Stepping into the Lab",
        icon: "🚪", xp: 75,
        content: "To switch between branches, we use `git checkout`. Think of it as walking through a door into a different room.\n\nIn the 'Experiment' room, you can change files, and the 'Main' room stays exactly as it was.",
        explanation: "Pro Git 3.2: Switching branches moves the HEAD pointer to the new branch and updates the files in your working directory.",
        challenge: {
            type: "terminal",
            prompt: "Switch to your new experiment branch.",
            steps: [
                {
                    instruction: "Checkout the experiment branch",
                    expectedCommand: "git checkout experiment",
                    acceptAlso: ["git switch experiment"],
                    successMessage: "You are now in the experiment universe!",
                    hint: "git checkout experiment"
                }
            ]
        },
        initialState: { commits: [{ id: "c1", msg: "Initial roast", branch: "main" }], branches: ["main", "experiment"], head: "main", files: [] },
        resultState: { commits: [{ id: "c1", msg: "Initial roast", branch: "main" }], branches: ["main", "experiment"], head: "experiment", files: [] }
    },
    {
        id: 14, module: "Module 2: Branching", title: "The Fast-Track Shortcut",
        icon: "🏃", xp: 50,
        content: "Developers are lazy (in a good way). Instead of two commands (`branch` then `checkout`), we use one: `git checkout -b [name]`.\n\nThis is the most common way branches are born.",
        explanation: "The -b flag stands for 'branch'. It tells Git: 'Create this branch AND move me there immediately.'",
        challenge: {
            type: "terminal",
            prompt: "Create and switch to a 'latte-art' branch in one go.",
            steps: [
                {
                    instruction: "Create and switch shortcut",
                    expectedCommand: "git checkout -b latte-art",
                    acceptAlso: ["git switch -c latte-art"],
                    successMessage: "Boom! Created and switched instantly.",
                    hint: "git checkout -b latte-art"
                }
            ]
        },
        initialState: { commits: [{ id: "c1", msg: "Initial roast", branch: "main" }], branches: ["main"], head: "main", files: [] },
        resultState: { commits: [{ id: "c1", msg: "Initial roast", branch: "main" }], branches: ["main", "latte-art"], head: "latte-art", files: [] }
    },
    {
        id: 15, module: "Module 2: Branching", title: "Merging the Success",
        icon: "🤝", xp: 125,
        content: "The 'Spicy Pumpkin' was a hit! Now we want to move it to the **Main Menu**.\n\n1. Go to the receiving branch (`main`).\n2. Pull the changes in (`merge`).\n\nIf the paths are linear, Git does a **Fast-Forward** — it just slides the 'main' pointer up to the 'experiment' pointer.",
        explanation: "Pro Git 3.2: Basic Merging. A merge takes two snapshots and finds a common ancestor to combine them.",
        challenge: {
            type: "terminal",
            prompt: "Bring your experiment into the main branch.",
            steps: [
                {
                    instruction: "Switch back to main first",
                    expectedCommand: "git checkout main",
                    successMessage: "Back in the main kitchen.",
                    hint: "git checkout main"
                },
                {
                    instruction: "Merge the experiment",
                    expectedCommand: "git merge experiment",
                    successMessage: "Success! Main now has the new roast.",
                    hint: "git merge experiment"
                }
            ]
        },
        initialState: {
            commits: [
                { id: "c1", msg: "Base roast", branch: "main" },
                { id: "c2", msg: "Add pumpkin spice", branch: "experiment" }
            ],
            branches: ["main", "experiment"], head: "experiment", files: []
        },
        resultState: {
            commits: [
                { id: "c1", msg: "Base roast", branch: "main" },
                { id: "c2", msg: "Add pumpkin spice", branch: "main" }
            ],
            branches: ["main", "experiment"], head: "main", files: []
        }
    },
    {
        id: 16, module: "Module 2: Branching", title: "Conflict: The Dual Roast",
        icon: "💥", xp: 150,
        content: "What happens if you change the brew time to 5 mins on `main` and someone else changes it to 7 mins on `branch`?\n\nGit pauses and says: **'Merge Conflict'**. It doesn't know which brew is better. It's your job to pick the winner and clean up the markers.",
        explanation: "Pro Git 3.2: Basic Merge Conflicts. Git places markers (<<<<<<<, =======, >>>>>>>) in the code to show the competing changes.",
        challenge: {
            type: "quiz", question: "What should you do when a merge conflict occurs?",
            options: [
                "Delete the repository and start over",
                "Wait for the other developer to fix it",
                "Manually edit the file, choose the correct lines, remove markers, and commit",
                "Git automatically picks the newest one"
            ],
            answer: 2, hint: "Git is a tool, but you are the judge."
        },
        bonusPractice: {
            type: "terminal",
            prompt: "Trigger a merge to see how conflicts start!",
            steps: [
                {
                    instruction: "Attempt to merge the branch with conflicting changes",
                    expectedCommand: "git merge branch",
                    successMessage: "Conflict triggered! In a real scenario, you\'d see <<<<<<< markers in the file. Edit, choose, and commit!",
                    hint: "git merge branch"
                },
                {
                    instruction: "After resolving, stage the fixed file",
                    expectedCommand: "git add menu.txt",
                    successMessage: "Staged! Now commit to seal the resolved conflict.",
                    hint: "git add menu.txt"
                },
                {
                    instruction: "Commit the merge resolution",
                    expectedCommand: "git commit -m \"Resolve merge conflict\"",
                    matchPattern: "git commit -m",
                    successMessage: "Conflict resolved like a pro! You\'re the judge, and you judged well.",
                    hint: "git commit -m \"Resolve merge conflict\""
                }
            ]
        },
        initialState: { commits: [{ id: "c1", msg: "Split commit", branch: "main" }], branches: ["main", "branch"], head: "main", files: [{ name: "menu.txt", status: "modified" }] },
        resultState: { commits: [{ id: "c1", msg: "Split commit", branch: "main" }, { id: "c2", msg: "Resolve merge conflict", branch: "main" }], branches: ["main", "branch"], head: "main", files: [] }
    },
    {
        id: 17, module: "Module 2: Branching", title: "Cleaning Up: Deleting Branches",
        icon: "🧹", xp: 50,
        content: "Once a branch is merged, the 'Side Kitchen' is just taking up space. It's time to tear it down.\n\nUse `git branch -d [name]` to delete safely. Git won't let you delete an unmerged branch unless you use the 'Force' (`-D`).",
        explanation: "Housekeeping is essential for long-term projects. Stale branches clutter the visualization and confuse the team.",
        challenge: {
            type: "terminal",
            prompt: "Delete the finished 'experiment' branch.",
            steps: [
                {
                    instruction: "Delete the branch",
                    expectedCommand: "git branch -d experiment",
                    successMessage: "Kitchen cleared! The pointer is gone.",
                    hint: "git branch -d experiment"
                }
            ]
        },
        initialState: { commits: [{ id: "c1", msg: "Base", branch: "main" }], branches: ["main", "experiment"], head: "main", files: [] },
        resultState: { commits: [{ id: "c1", msg: "Base", branch: "main" }], branches: ["main"], head: "main", files: [] }
    },
    {
        id: 18, module: "Module 2: Branching", title: "Rebasing: Linear History",
        icon: "📏", xp: 150,
        content: "Merging creates a 'Merge Commit' which can look like a messy spiderweb. **Rebasing** takes your changes and 'replays' them on top of the newest work.\n\nBy running `git rebase main`, you're effectively saying: 'Take my work and move it to the very tip of the current main branch.' It makes your history look like one straight line. It's cleaner, but it's like rewriting time — use with caution!",
        explanation: "Pro Git 3.6: Rebasing. Rebasing re-reads the changes from your branch and applies them to the current HEAD of another branch.",
        challenge: {
            type: "quiz", question: "What is the main advantage of Rebasing over Merging?",
            options: [
                "It is faster than merging",
                "It avoids merge conflicts entirely",
                "It creates a clean, linear project history without merge commits",
                "It's the only way to save code"
            ],
            answer: 2, hint: "Think about how the lines look in the graph — a web or a straight line?"
        },
        bonusPractice: {
            type: "terminal",
            prompt: "Rebase your feature branch onto main for a clean history!",
            steps: [
                {
                    instruction: "Rebase your current branch onto main",
                    expectedCommand: "git rebase main",
                    successMessage: "Rebased! Your commits now sit on top of main — a clean, linear history.",
                    hint: "git rebase main"
                }
            ]
        },
        initialState: { commits: [{ id: "c1", msg: "Split", branch: "main" }], branches: ["main", "feature"], head: "feature", files: [] },
        resultState: { commits: [{ id: "c1", msg: "Split", branch: "main" }, { id: "c2", msg: "Feature work", branch: "feature" }], branches: ["main", "feature"], head: "feature", files: [] }
    },
    {
        id: 19, module: "Module 2: Branching", title: "Cherry Picking",
        icon: "🍒", xp: 125,
        content: "Sometimes you don't want the whole branch, just **one specific commit**. Maybe just the 'Better Cup Design' from a messy experiment.\n\n`git cherry-pick [hash]` grabs that one commit and brings it into your current branch.",
        explanation: "This is perfect for hotfixes or grabbing individual features from discarded branches.",
        challenge: {
            type: "terminal",
            prompt: "Grab the specific 'Fix typo' commit (id: a1b2) into main.",
            steps: [
                {
                    instruction: "Cherry-pick the fix",
                    expectedCommand: "git cherry-pick a1b2",
                    successMessage: "Just the cherry! You've grabbed the single fix successfully.",
                    hint: "git cherry-pick a1b2"
                }
            ]
        },
        initialState: {
            commits: [
                { id: "c1", msg: "Base", branch: "main" },
                { id: "a1b2", msg: "Fix typo", branch: "feature" }
            ],
            branches: ["main", "feature"], head: "main", files: []
        },
        resultState: {
            commits: [
                { id: "c1", msg: "Base", branch: "main" },
                { id: "a1b2", msg: "Fix typo", branch: "main" }
            ],
            branches: ["main", "feature"], head: "main", files: []
        }
    },
    {
        id: 20, module: "Module 2: Branching", title: "Stashing: The Emergency Shelf",
        icon: "📌", xp: 125,
        content: "You're in the middle of a complex roast when a customer complains about the 'main' coffee. You need to switch branches, but your work is too messy to commit.\n\n`git stash` puts your work on a temporary 'shelf'. You fix the bug, then `git stash pop` to bring your mess back.",
        explanation: "Pro Git 7.3: Stashing and Cleaning. Useful for context switching when you're not ready for a commit.",
        challenge: {
            type: "terminal",
            prompt: "Shelf your work to handle an emergency.",
            steps: [
                {
                    instruction: "Stash the mess",
                    expectedCommand: "git stash",
                    successMessage: "Safely shelved. Your folder is clean now.",
                    hint: "git stash"
                },
                {
                    instruction: "Check status to verify cleanliness",
                    expectedCommand: "git status",
                    successMessage: "Clean as a whistle. Now go fix that bug!",
                    hint: "git status"
                }
            ]
        },
        initialState: {
            commits: [{ id: "c1", msg: "Base", branch: "main" }],
            branches: ["main"], head: "main",
            files: [{ name: "messy_experiment.txt", status: "modified" }]
        },
        resultState: {
            commits: [{ id: "c1", msg: "Base", branch: "main" }],
            branches: ["main"], head: "main",
            files: []
        }
    },
    // ─── MODULE 3: COLLABORATION (Connect the Kitchens) ───
    {
        id: 21, module: "Module 3: Collaboration", title: "Remote: The Central Cloud Kitchen",
        icon: "🌐", xp: 100,
        content: "Up until now, your coffee shop has been a one-person show. But what if you want to open a franchise? Or backup your recipes in case your shop burns down?\n\nA **Remote** is a copy of your repository living on a server (like GitHub). It's the 'Main Hub' where everyone shares their work.",
        explanation: "Pro Git 2.5: Working with Remotes. Remotes are versions of your project that are hosted on the Internet or network somewhere.",
        challenge: {
            type: "quiz", question: "What is the industry-standard name for your primary remote repository?",
            options: ["master", "main", "origin", "cloud"],
            answer: 2, hint: "It starts with O and means 'beginning/source'."
        },
        bonusPractice: {
            type: "terminal",
            prompt: "Check if your repository has any remote connections!",
            steps: [
                {
                    instruction: "List all remote repositories",
                    expectedCommand: "git remote -v",
                    acceptAlso: ["git remote"],
                    successMessage: "This shows all remote connections. A fresh repo has none — you'll add one soon!",
                    hint: "git remote -v"
                }
            ]
        },
        initialState: { commits: [{ id: "c1", msg: "Base", branch: "main" }], branches: ["main"], head: "main", files: [] },
        resultState: { commits: [{ id: "c1", msg: "Base", branch: "main" }], branches: ["main"], head: "main", files: [] }
    },
    {
        id: 22, module: "Module 3: Collaboration", title: "Adding a Remote",
        icon: "🔗", xp: 100,
        content: "To connect your local git to GitHub, you use `git remote add origin [URL]`. \n\n'origin' is just a nickname. Instead of typing the long URL every time, you just say 'origin'.",
        explanation: "Pro Git 2.5: To add a new remote Git repository as a short name you can reference easily, run `git remote add <shortname> <url>`.",
        challenge: {
            type: "terminal",
            prompt: "Connect your shop to the cloud.",
            steps: [
                {
                    instruction: "Add the remote 'origin'",
                    expectedCommand: "git remote add origin https://github.com/coffee/shop.git",
                    successMessage: "Remote connected! Your local git now knows where to send the beans.",
                    hint: "git remote add origin https://github.com/coffee/shop.git"
                },
                {
                    instruction: "Verify the remote connection",
                    expectedCommand: "git remote -v",
                    successMessage: "There it is! You see 'fetch' and 'push' URLs for origin.",
                    hint: "git remote -v"
                }
            ]
        },
        initialState: { commits: [{ id: "c1", msg: "Base", branch: "main" }], branches: ["main"], head: "main", files: [] },
        resultState: { commits: [{ id: "c1", msg: "Base", branch: "main" }], branches: ["main"], head: "main", remotes: { origin: { url: "https://github.com/coffee/shop.git" } }, files: [] }
    },
    {
        id: 23, module: "Module 3: Collaboration", title: "Cloning: Stealing the Recipes",
        icon: "📥", xp: 100,
        content: "What if you see a great coffee shop on GitHub and want to open a local branch of it? You **Clone** it.\n\n`git clone [URL]` downloads the entire history, every branch, and every commit. You get the whole box of beans!",
        explanation: "Pro Git 2.1: If you want to get a copy of an existing Git repository, the command you need is `git clone`.",
        challenge: {
            type: "terminal",
            prompt: "Clone the famous 'Latte Art' project.",
            steps: [
                {
                    instruction: "Clone the repo",
                    expectedCommand: "git clone https://github.com/brewers/latte-art.git",
                    successMessage: "Downloaded everything! You now have a perfect replica locally.",
                    hint: "git clone https://github.com/brewers/latte-art.git"
                }
            ]
        },
        initialState: { commits: [], branches: [], head: null, files: [] },
        resultState: {
            commits: [{ id: "c1", msg: "Initial art", branch: "main" }],
            branches: ["main"], head: "main",
            remotes: { origin: { url: "https://github.com/brewers/latte-art.git" } },
            files: [{ name: "tutorial.md", status: "committed" }]
        }
    },
    {
        id: 24, module: "Module 3: Collaboration", title: "Pushing: Shipping the Beans",
        icon: "📤", xp: 100,
        content: "You've made some great local commits. Now it's time to share them with the world. You **Push** them up to the remote.\n\n`git push origin main` tells Git: 'Send my `main` branch commits to the remote called `origin`.'",
        explanation: "Pro Git 2.5: When you have your project at a point that you want to share, you have to push it upstream.",
        challenge: {
            type: "terminal",
            prompt: "Upload your local work to GitHub.",
            steps: [
                {
                    instruction: "Push to main",
                    expectedCommand: "git push origin main",
                    successMessage: "Shipment successful! Your commits are now visible to the whole world.",
                    hint: "git push origin main"
                }
            ]
        },
        initialState: {
            commits: [{ id: "c1", msg: "New roast", branch: "main" }],
            branches: ["main"], head: "main",
            remotes: { origin: { url: "https://github.com/coffee/shop.git" } },
            files: []
        },
        resultState: {
            commits: [{ id: "c1", msg: "New roast", branch: "main" }],
            branches: ["main"], head: "main",
            remotes: { origin: { url: "https://github.com/coffee/shop.git", pushed: true } },
            files: []
        }
    },
    {
        id: 25, module: "Module 3: Collaboration", title: "Fetch vs Pull: The Mailbox",
        icon: "✉️", xp: 100,
        content: "Your team has been busy. Sarah added a 'Mocha' recipe to GitHub. \n\n`git fetch` checks the cloud mailbox — it sees the new commits but doesn't touch your local code. \n`git pull` checks the mailbox AND automatically pours the beans into your local kitchen.",
        explanation: "Pro Git 2.5: `git fetch` only downloads the data to your local repository — it doesn’t automatically merge it. `git pull` is more common for beginners.",
        challenge: {
            type: "quiz", question: "Which command automatically updates your local files with remote changes?",
            options: ["git fetch", "git pull", "git merge", "git remote"],
            answer: 1, hint: "Fetch looks, Pull takes."
        },
        bonusPractice: {
            type: "terminal",
            prompt: "Use git fetch to safely check what's new on the remote!",
            steps: [
                {
                    instruction: "Fetch the latest changes from origin without merging",
                    expectedCommand: "git fetch",
                    acceptAlso: ["git fetch origin"],
                    successMessage: "Fetched! You can now see what's new without touching your local code. Safe and sound.",
                    hint: "git fetch"
                }
            ]
        },
        initialState: { commits: [{ id: "c1", msg: "Base", branch: "main" }], branches: ["main"], head: "main", files: [] },
        resultState: { commits: [{ id: "c1", msg: "Base", branch: "main" }], branches: ["main"], head: "main", files: [] }
    },
    {
        id: 26, module: "Module 3: Collaboration", title: "Pulling the Latest",
        icon: "🚜", xp: 100,
        content: "Always stay in sync! If you work on old code, you'll get conflicts. Start every day with a `git pull`.\n\n`git pull origin main` fetches the updates and merges them into your current branch instantly.",
        explanation: "It is a best practice to 'Pull early, pull often'.",
        challenge: {
            type: "terminal",
            prompt: "Get Sarah's new recipes from the cloud.",
            steps: [
                {
                    instruction: "Pull changes",
                    expectedCommand: "git pull origin main",
                    successMessage: "Great! You are now in sync with Sarah's latest roast.",
                    hint: "git pull origin main"
                }
            ]
        },
        initialState: {
            commits: [{ id: "c1", msg: "Base", branch: "main" }],
            branches: ["main"], head: "main",
            remotes: { origin: { url: "https://github.com/coffee/shop.git" } }
        },
        resultState: {
            commits: [
                { id: "c1", msg: "Base", branch: "main" },
                { id: "s1", msg: "Sarah: Add Mocha", branch: "main" }
            ],
            branches: ["main"], head: "main",
            files: [{ name: "mocha.txt", status: "committed" }]
        }
    },
    {
        id: 27, module: "Module 3: Collaboration", title: "Pull Requests (PRs)",
        icon: "📃", xp: 100,
        content: "In professional kitchens, you don't just dump your experimental latte into the main vat. You show it to the Lead Chef first. \n\nA **Pull Request** is a request for a code review. You say: 'Hey team, I've finished the Spicy Pumpkin. Can you check it before I merge it into main?'",
        explanation: "PRs are a GitHub feature, not a Git command. They facilitate communication and quality control.",
        challenge: {
            type: "quiz", question: "What happens during a Pull Request?",
            options: [
                "Your computer restarts",
                "Teammates review your code, leave comments, and then approve the merge",
                "Git automatically deletes all your bugs",
                "The code is uploaded to the internet and then deleted"
            ],
            answer: 1, hint: "Review and Approval — the keywords of teamwork."
        },
        bonusPractice: {
            type: "terminal",
            prompt: "Push your feature branch to prepare for a Pull Request!",
            steps: [
                {
                    instruction: "Push your feature branch to the remote",
                    expectedCommand: "git push origin feature",
                    successMessage: "Pushed! Now go to GitHub and open a Pull Request for your team to review.",
                    hint: "git push origin feature"
                }
            ]
        },
        initialState: { commits: [{ id: "c1", msg: "Base", branch: "main" }], branches: ["main"], head: "main", files: [] },
        resultState: { commits: [{ id: "c1", msg: "Base", branch: "main" }], branches: ["main"], head: "main", files: [] }
    },
    {
        id: 28, module: "Module 3: Collaboration", title: "The Fork: Your Own Franchise",
        icon: "🍴", xp: 75,
        content: "You see a successful 'Starbucks' repo, but you don't have permission to change it. \n\nYou **Fork** it. GitHub creates a total copy under YOUR account. Now it's your franchise, and you can change the logo to 'Green Coffee' as much as you want!",
        explanation: "Forks are essential for Open Source. You fork a project, improve it, and then send a 'Pull Request' to the original owner.",
        challenge: {
            type: "quiz", question: "How is a 'Fork' different from a 'Clone'?",
            options: [
                "Fork is on GitHub servers; Clone is on your local computer",
                "Clone is faster than Fork",
                "Fork costs money; Clone is free",
                "There is no difference"
            ],
            answer: 0, hint: "Where does the copy live? Cloud or Local?"
        },
        bonusPractice: {
            type: "terminal",
            prompt: "After forking on GitHub, clone the repo to your local machine!",
            steps: [
                {
                    instruction: "Clone your forked repository",
                    expectedCommand: "git clone https://github.com/you/franchise.git",
                    matchPattern: "git clone",
                    successMessage: "Cloned your fork! Now you have a local copy of your franchise to work on.",
                    hint: "git clone https://github.com/you/franchise.git"
                }
            ]
        },
        initialState: { commits: [{ id: "c1", msg: "Base", branch: "main" }], branches: ["main"], head: "main", files: [] },
        resultState: { commits: [{ id: "c1", msg: "Base", branch: "main" }], branches: ["main"], head: "main", files: [] }
    },
    {
        id: 29, module: "Module 3: Collaboration", title: "Distributed Power",
        icon: "⚡", xp: 100,
        content: "The magic of Git is that **Distributed** means every developer has the FULL history. If GitHub explodes tomorrow, any one team member could restore the entire project from their last clone.\n\nThis is why Git is so resilient.",
        explanation: "Pro Git 1.1: Distributed Version Control Systems. Unlike old systems (SVN), Git doesn't rely on one central server for history.",
        challenge: {
            type: "quiz", question: "What does 'Distributed' mean in Git?",
            options: [
                "You have to pay for each user",
                "The data is split into small pieces across the internet",
                "Every user has a full copy of the entire repository project and its history",
                "The code only works on certain computers"
            ],
            answer: 2, hint: "Complete backup on every laptop."
        },
        bonusPractice: {
            type: "terminal",
            prompt: "See your full local history — proof that everything is stored on YOUR machine!",
            steps: [
                {
                    instruction: "View the commit history in a compact format",
                    expectedCommand: "git log --oneline",
                    acceptAlso: ["git log"],
                    successMessage: "See? Your entire project history is right here on your machine. That's the power of distributed!",
                    hint: "git log --oneline"
                }
            ]
        },
        initialState: { commits: [{ id: "c1", msg: "Base", branch: "main" }], branches: ["main"], head: "main", files: [] },
        resultState: { commits: [{ id: "c1", msg: "Base", branch: "main" }], branches: ["main"], head: "main", files: [] }
    },
    {
        id: 30, module: "Module 3: Collaboration", title: "The Sarah Conflict",
        icon: "⚔️", xp: 200,
        content: "Sarah changed the `menu.txt` on the remote. You changed `menu.txt` locally. \n\nWhen you run `git pull origin main`, Git will hit a **Conflict**. You must open the file, choose between Sarah's 'Espresso' or your 'Cold Brew', and commit the resolution using `git add` and `git commit`.",
        explanation: "This is the most common real-world git problem. Don't panic. Resolving conflicts is where you become a real developer.",
        challenge: {
            type: "terminal",
            prompt: "Resolve the conflict with Sarah's changes.",
            steps: [
                {
                    instruction: "Pull from origin (this will cause a conflict)",
                    expectedCommand: "git pull origin main",
                    successMessage: "CONFLICT! menu.txt needs your attention. (Markers: <<<<<< <)",
                    hint: "git pull origin main"
                },
                {
                    instruction: "Stage the resolved file",
                    expectedCommand: "git add menu.txt",
                    successMessage: "Conflict markers removed. File staged.",
                    hint: "git add menu.txt"
                },
                {
                    instruction: "Commit the resolution",
                    expectedCommand: "git commit -m \"Resolve conflict with Sarah's menu\"",
                    successMessage: "History is whole again! You're a pro.",
                    hint: "git commit -m \"Resolve conflict with Sarah's menu\""
                }
            ]
        },
        initialState: {
            commits: [{ id: "c1", msg: "Initial menu", branch: "main" }],
            branches: ["main"], head: "main",
            files: [{ name: "menu.txt", status: "modified" }],
            remotes: { origin: { url: "https://github.com/coffee/shop.git", hasNewCommits: true } }
        },
        resultState: {
            commits: [
                { id: "c1", msg: "Initial menu", branch: "main" },
                { id: "s1", msg: "Sarah: Add Espresso", branch: "main" },
                { id: "r1", msg: "Resolve conflict", branch: "main" }
            ],
            branches: ["main"], head: "main",
            files: [{ name: "menu.txt", status: "committed" }]
        }
    },

    // ─── MODULE 4: MASTERY (Professional Grade) ───
    {
        id: 31, module: "Module 4: Mastery", title: "Rewriting History: Amend",
        icon: "🖍️", xp: 100,
        content: "You just committed, but realized you forgot a comma or made a typo. Don't make a new commit just for that!\n\nUse `git commit --amend` to 'edit' your last commit. It's like a time-travel eraser.",
        explanation: "Pro Git 2.4: Undoing Things. Be careful — ONLY amend commits that haven't been pushed yet.",
        challenge: {
            type: "terminal",
            prompt: "Fix your last commit message.",
            steps: [
                {
                    instruction: "Amend the last commit",
                    expectedCommand: "git commit --amend -m \"Better message\"",
                    successMessage: "Old commit replaced! No one will ever know you had a typo.",
                    hint: "git commit --amend -m \"Better message\""
                }
            ]
        },
        initialState: { commits: [{ id: "c1", msg: "Original typo message", branch: "main" }], branches: ["main"], head: "main", files: [] },
        resultState: { commits: [{ id: "c2", msg: "Better message", branch: "main" }], branches: ["main"], head: "main", files: [] }
    },
    {
        id: 32, module: "Module 4: Mastery", title: "Git Reset: The Safety Brake",
        icon: "🛑", xp: 125,
        content: "You've gone too far. Your code is a mess, and you want to throw it all away and go back to the last safe commit.\n\n`git reset --hard HEAD` is the 'Nuclear Option'. It wipes your working folder clean to match the last commit.",
        explanation: "Pro Git 7.7: Reset Demystified. --hard is dangerous because it deletes uncommitted changes forever.",
        challenge: {
            type: "terminal",
            prompt: "Emergency reset to last commit.",
            steps: [
                {
                    instruction: "Hard reset",
                    expectedCommand: "git reset --hard HEAD",
                    successMessage: "Clean slate! The mess is gone.",
                    hint: "git reset --hard HEAD"
                }
            ]
        },
        initialState: {
            commits: [{ id: "c1", msg: "Safe state", branch: "main" }],
            branches: ["main"], head: "main",
            files: [{ name: "disaster.js", status: "modified" }]
        },
        resultState: {
            commits: [{ id: "c1", msg: "Safe state", branch: "main" }],
            branches: ["main"], head: "main",
            files: []
        }
    },
    {
        id: 33, module: "Module 4: Mastery", title: "Interactive Rebase (Theory)",
        icon: "🎾", xp: 150,
        content: "Sometimes you have 10 messy commits like 'fix', 'fix2', 'bug'. You want to 'Squash' them into one clean commit named 'Implement Authentication'.\n\n`git rebase -i` (Interactive) lets you rewrite history like a movie editor. It's the ultimate 'clean code' tool.",
        explanation: "Pro Git 7.6: Rewriting History. Squashing commits keeps the main branch history clean and professional.",
        challenge: {
            type: "quiz", question: "What is 'Squashing' in Git?",
            options: [
                "Deleting a branch",
                "Combining multiple small commits into one large, meaningful commit",
                "Making the file size smaller",
                "Ignoring files"
            ],
            answer: 1, hint: "Think about pressing multiple things into one."
        },
        bonusPractice: {
            type: "terminal",
            prompt: "Start an interactive rebase to clean up messy commits!",
            steps: [
                {
                    instruction: "Start an interactive rebase for the last 2 commits",
                    expectedCommand: "git rebase -i HEAD~2",
                    successMessage: "Interactive rebase started! In a real editor, you\'d see pick/squash/edit options for each commit.",
                    hint: "git rebase -i HEAD~2"
                }
            ]
        },
        initialState: { commits: [{ id: "c1", msg: "fix", branch: "main" }, { id: "c2", msg: "fix2", branch: "main" }], branches: ["main"], head: "main", files: [] },
        resultState: { commits: [{ id: "c1", msg: "Implement feature", branch: "main" }], branches: ["main"], head: "main", files: [] }
    },
    {
        id: 34, module: "Module 4: Mastery", title: "The .gitignore Mastery",
        icon: "🙈", xp: 100,
        content: "Professional repos use `.gitignore` to keep out trash. Secrets, API keys, and temporary logs should never touch GitHub.\n\nSimply list the filenames in `.gitignore`, and Git will pretend they don't exist. You can verify this by running `git status` — ignored files will disappear from the list!",
        explanation: "Ignoring files is critical for security. Never commit `.env` files!",
        challenge: {
            type: "terminal",
            prompt: "Stop tracking the secrets file and verify it's ignored.",
            steps: [
                {
                    instruction: "Remove secrets.txt from Git tracking (keep the file locally)",
                    expectedCommand: "git rm --cached secrets.txt",
                    successMessage: "Removed from tracking! The file still exists locally but Git ignores it now.",
                    hint: "git rm --cached secrets.txt"
                },
                {
                    instruction: "Check the status to see the effect",
                    expectedCommand: "git status",
                    successMessage: "See? secrets.txt is now in the 'deleted from staging' list. Add it to .gitignore to keep it hidden permanently.",
                    hint: "git status"
                }
            ]
        },
        initialState: {
            commits: [{ id: "c1", msg: "Base", branch: "main" }],
            branches: ["main"], head: "main",
            files: [{ name: "secrets.txt", status: "staged" }, { name: ".gitignore", status: "untracked" }]
        },
        resultState: {
            commits: [{ id: "c1", msg: "Base", branch: "main" }],
            branches: ["main"], head: "main",
            files: [{ name: ".gitignore", status: "staged" }]
        }
    },
    {
        id: 35, module: "Module 4: Mastery", title: "Aliases: The Power User",
        icon: "🏎️", xp: 75,
        content: "Tired of typing `git status` 100 times a day? \n\nYou can create **Aliases**. `git config --global alias.st status` turns `git st` into a shortcut. \n\nProfessional developers have shorthand for everything.",
        explanation: "Aliases save time and reduce typos. They are stored in your `.gitconfig` file.",
        challenge: {
            type: "quiz", question: "How do you set up an alias for 'checkout' to be 'co'?",
            options: [
                "git alias co checkout",
                "git config --global alias.co checkout",
                "git checkout alias co",
                "git make shortcut co"
            ],
            answer: 1, hint: "Check the 'config' command."
        },
        bonusPractice: {
            type: "terminal",
            prompt: "Create your first Git alias to save time!",
            steps: [
                {
                    instruction: "Create an alias \'st\' for \'status\'",
                    expectedCommand: "git config --global alias.st status",
                    matchPattern: "git config",
                    successMessage: "Alias created! Now \'git st\' works the same as \'git status\'. Welcome to power-user territory!",
                    hint: "git config --global alias.st status"
                }
            ]
        },
        initialState: { commits: [{ id: "c1", msg: "Base", branch: "main" }], branches: ["main"], head: "main", files: [] }
    },
    {
        id: 36, module: "Module 4: Mastery", title: "The Graduation Roast",
        icon: "🎓", xp: 500,
        content: "You've done it! You know how to track files, branch out, collaborate on the cloud, and clean up your history like a pro. \n\nYour coffee shop is now a global empire. You are a Git Master!",
        explanation: "Version control is the most important skill for a modern developer. Keep practicing, and don't be afraid to break things — because with Git, you can always fix them.",
        challenge: {
            type: "quiz", question: "Now that you've finished, what is your next step?",
            options: [
                "Delete Git and never use it again",
                "Use Git for every project you work on and keep learning!",
                "Only use Git when things break",
                "Tell everyone Git is too hard"
            ],
            answer: 1, hint: "Continue the journey!"
        },
        initialState: { commits: [{ id: "c1", msg: "Final Graduation", branch: "main" }], branches: ["main"], head: "main", files: [] }
    }
];

export const GIT_COMMANDS = [
    "git init", "git status", "git add", "git commit", "git log", "git diff", "git checkout",
    "git branch", "git merge", "git remote", "git push", "git pull", "git fetch", "git clone",
    "git reset", "git revert", "git stash", "git stash pop", "git cherry-pick", "git rebase",
    "git commit --amend", "git config"
];
