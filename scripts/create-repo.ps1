# Creates the GitHub repo for this project, pushes the code, and lets GitHub Pages deploy it.
# Usage (from the project root):
#   .\scripts\create-repo.ps1 -Owner <your-github-username>
# Requires: git and the GitHub CLI (gh), with "gh auth login" already done.
param(
  [Parameter(Mandatory = $true)] [string] $Owner,
  [string] $RepoName = 'html-css-learning-lab',
  [switch] $Private
)

$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $Root

gh auth status
if ($LASTEXITCODE -ne 0) { throw 'Run "gh auth login" first.' }

if (-not (Test-Path -LiteralPath '.git')) {
  git init -b main
  if ($LASTEXITCODE -ne 0) { throw 'git init failed.' }
}

git add -A
git diff --cached --quiet
if ($LASTEXITCODE -ne 0) {
  git commit -m 'Initial commit: HTML and CSS learning lab'
  if ($LASTEXITCODE -ne 0) { throw 'git commit failed. Check git user.name and user.email.' }
}

$visibility = if ($Private) { '--private' } else { '--public' }
gh repo create "$Owner/$RepoName" $visibility --source . --remote origin --push
if ($LASTEXITCODE -ne 0) { throw 'gh repo create failed. The repo may already exist.' }

Write-Host "Pushed to https://github.com/$Owner/$RepoName"
Write-Host 'Next: Settings > Pages > Build and deployment > Source: GitHub Actions.'
