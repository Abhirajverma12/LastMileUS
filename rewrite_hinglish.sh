#!/bin/bash
set -e

# Create a temporary branch 10 commits ago
git checkout -b temp-hinglish HEAD~10

# Commit 10
git cherry-pick 90fad0e
git commit --amend -m "login page pe unverified accounts ke liye OTP screen add ki"

# Commit 9
git cherry-pick 46eee6b
git commit --amend -m "email verification configuration update ki"

# Commit 8
git cherry-pick b380127
git commit --amend -m "render blueprint mein RESEND_API_KEY add ki"

# Commit 7
git cherry-pick 247bae5
git commit --amend -m "email sender ko verified custom domain pe update kiya"

# Commit 6
git cherry-pick c3f2e49
git commit --amend -m "codebase mein RESEND_API_KEY expose kiya"

# Commit 5
git cherry-pick 9e9f213
git commit --amend -m "landing page design ko completely naya aur attractive bana diya"

# Commit 4
git cherry-pick f2cf098
git commit --amend -m "mock UI ke liye mobile layout perfect kar diya"

# Commit 3
git cherry-pick add7769
git commit --amend -m "mobile navbar ki alignment theek ki"

# Commit 2
git cherry-pick 9c92560
git commit --amend -m "dashboard mockup ko desktop aur mobile ke liye finalize kar diya"

# Commit 1
git cherry-pick 304f36d
git commit --amend -m "create order form mein dropdowns aur review step add kar diya"

# Replace main branch with this new history
git checkout main
git reset --hard temp-hinglish
git branch -D temp-hinglish

# Force push to update GitHub
git push origin main --force
git push origin main:master --force

echo "Successfully rewritten history to Hinglish!"
