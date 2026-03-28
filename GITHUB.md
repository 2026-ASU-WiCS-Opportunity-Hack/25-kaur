# Pushing AidBridge to GitHub

1. Create a new, blank repository on GitHub.
2. In your terminal, verify you are inside the `aidbridge` folder:
   ```bash
   cd ~/.gemini/antigravity/scratch/aidbridge
   ```
3. Run the following commands, replacing `YOUR_USERNAME` and `YOUR_REPO` with your actual info:
   ```bash
   git add .
   git commit -m "Initial commit of AidBridge MVP with AI Setup"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```
