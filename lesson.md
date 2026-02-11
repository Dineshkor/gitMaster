Module 1: Core Concepts & Setup
Lesson 1: Git vs. GitHub & Architecture
• Objective: Understand the fundamental difference between the version control tool and the hosting service, and grasp the three-stage architecture of Git.
• Key Concepts:
    ◦ Git: A local tool ("the coffee") that tracks changes (who, when, where) day and night. It works offline and is a career-long skill.
    ◦ GitHub: A cloud-based service ("the coffee shop") for remote storage and collaboration.
    ◦ The Three Stages:
        1. Working Directory: Where you actively edit and create files.
        2. Staging Area: A "middle ground" where you prepare specific files to be saved.
        3. Local Repository: The digital cabinet where committed history is permanently stored.
    ◦ Hidden .git folder: The directory where Git stores all tracking data.
Lesson 2: Installation & Configuration
• Objective: Successfully install Git and configure user identity.
• Key Concepts:
    ◦ Installation: downloading from the official site for Windows (32/64-bit), macOS (Homebrew), or Linux.
    ◦ Verification: Using git --version to check installation.
    ◦ Identity Setup: Configuring user details is mandatory for tracking.
        ▪ git config --global user.email "email".
        ▪ git config --global user.name "name".
Module 2: The Local Workflow
Lesson 3: Starting a Project & Basic Tracking
• Objective: Initialize a repository and master the add-commit cycle.
• Commands:
    ◦ git init: Initializes tracking in a folder.
    ◦ git status: Checks the state of files (modified, staged, untracked).
    ◦ git add: Moves changes to the staging area.
        ▪ git add .: Stages current directory and subdirectories.
        ▪ git add --all or git add -A: Stages entire project.
        ▪ git add [filename]: Stages specific files.
    ◦ git commit -m "message": Saves staged changes to the local repository permanently.
Lesson 4: File Management & Deletion
• Objective: Manage file removal and understand how to unstaging files.
• Commands:
    ◦ git rm [file]: Deletes a file and stages the deletion simultaneously.
    ◦ git rm --cached [file]: Removes a file from the staging area (stops tracking) but keeps the actual file in the working directory.
    ◦ git rm -r [folder]: Recursively removes a folder and its contents.
    ◦ git rm -f [file]: Force deletes a file even if it has uncommitted changes.
Lesson 5: Viewing History & Differences
• Objective: Navigate project history and compare versions.
• Commands:
    ◦ git log: Shows full commit history (IDs, authors, messages).
    ◦ git log --oneline: Shows a summarized history.
    ◦ git diff [id1] [id2]: Compares two commits to see line-by-line changes (red for removed, green for added).
Module 3: Fixing Mistakes
Lesson 6: Undoing Changes
• Objective: Learn how to revert files to previous states safely or forcefully.
• Commands:
    ◦ git restore [file]: Discards local changes in a file, reverting it to the last committed state.
    ◦ git restore --staged [file]: Unstages a file without changing its content.
    ◦ git reset: Unstages all files (moves them back to working directory).
    ◦ git reset --hard: Dangerous. Deletes all local changes and restores the project to the last commit.
    ◦ git revert [commit ID]: Creates a new commit that reverses the changes of a previous one (safest for public history).
Module 4: Parallel Development
Lesson 7: Branching
• Objective: Create isolated environments for new features.
• Key Concepts: The "Kitchen" analogy—experimenting in a side kitchen without ruining the main menu.
• Commands:
    ◦ git branch: Lists all branches.
    ◦ git branch [name]: Creates a new branch inheriting the current state.
    ◦ git checkout [name]: Switches to a specific branch.
    ◦ git checkout [commit ID]: Switches to a specific point in history (Detached HEAD state).
Lesson 8: Merging & Conflicts
• Objective: Combine branches and resolve code clashes.
• Commands:
    ◦ git merge [branch name]: Combines the specified branch into the current branch.
• Conflict Resolution:
    ◦ Occurs when the same line is modified differently in two branches.
    ◦ Requires manual editing of the file to choose the correct code, followed by an add and commit.
Module 5: Remote Collaboration
Lesson 9: Syncing with GitHub
• Objective: Connect local work to the cloud.
• Commands:
    ◦ git clone [url]: Downloads a remote repository to the local machine.
    ◦ git push origin [branch]: Uploads local commits to the remote server.
    ◦ git fetch: Downloads remote updates but does not merge them into files.
    ◦ git pull: Fetches and immediately merges remote changes (Fetch + Merge).
Lesson 10: Pull Requests (PRs)
• Objective: Understand the team workflow for code review.
• Process:
    1. Push a feature branch to GitHub.
    2. Open a "New Pull Request" on GitHub.
    3. Compare the "Base" branch (e.g., main) with the "Compare" branch (feature).
    4. Review changes and click "Merge Pull Request".
Module 6: Advanced Tools
Lesson 11: Stashing
• Objective: Save unfinished work temporarily to switch contexts.
• Commands:
    ◦ git stash: Temporarily shelves uncommitted changes so you can switch branches.
    ◦ git stash pop: Restores the most recent stash and removes it from the list.
    ◦ git stash apply: Restores the stash but keeps a copy in the list.
    ◦ git stash list: View saved stashes.
    ◦ git stash drop: Deletes a specific stash.
Lesson 12: Rebasing
• Objective: Maintain a clean, linear history.
• Key Concepts:
    ◦ git rebase [branch]: Moves the current branch's changes to apply on top of the target branch, eliminating merge commits.
    ◦ Warning: Do not rebase on public/shared branches as it rewrites history.