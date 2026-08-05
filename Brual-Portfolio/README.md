# John Emmanuelle Brual — Portfolio

Static portfolio for John Emmanuelle Brual showcasing QA, automation, and workflow projects.

Contents
- `index.html` — main site
- `css/` — styles
- `js/` — scripts
- `assets/` — images, resume, project assets

How to publish to GitHub

1. Create a new repository on GitHub (e.g. `brual-portfolio`).
2. Run the commands below from this project folder locally.

Commands to run locally:

```bash
git init
git add .
git commit -m "Initial portfolio import"
# replace USER and REPO with your GitHub details
git remote add origin git@github.com:USER/REPO.git
git branch -M main
git push -u origin main
```

If you prefer HTTPS remote, use:

```bash
git remote add origin https://github.com/USER/REPO.git
``` 

Or create the repo from the command line using GitHub CLI:

```bash
gh repo create USER/REPO --public --source=. --push
```

Notes
- If you don't have `git` or `gh` installed, install them first or create the repo via github.com and follow the instructions there.
- I can help craft a `README` description, add a license, or prepare a `package.json` if you plan to use workflows.
