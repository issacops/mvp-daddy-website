# Deployment Guide for MVP Daddy

This guide will help you deploy your cinematic website to the web.

## Option 1: Vercel (Recommended)

Vercel is the easiest way to deploy Vite/React applications.

1.  **Create a GitHub Repository**:
    *   Initialize a git repo if you haven't already:
        ```bash
        git init
        git add .
        git commit -m "Initial commit"
        ```
    *   Push your code to a new repository on GitHub.

2.  **Deploy to Vercel**:
    *   Go to [Vercel.com](https://vercel.com) and sign up/login.
    *   Click **"Add New..."** -> **"Project"**.
    *   Import your GitHub repository.
    *   Vercel will automatically detect that it's a **Vite** project.
    *   Click **"Deploy"**.

3.  **Configuration**:
    *   We have already included a `vercel.json` file in your project root. This ensures that refreshing the page on a sub-route (like `/team/issac_jacob`) works correctly (Single Page Application routing).

## Option 2: Netlify

1.  **Deploy to Netlify**:
    *   Go to [Netlify.com](https://netlify.com) and sign up/login.
    *   Click **"Add new site"** -> **"Import an existing project"**.
    *   Connect to GitHub and select your repository.
    *   **Build settings**:
        *   **Build command**: `npm run build`
        *   **Publish directory**: `dist`
    *   Click **"Deploy site"**.

2.  **SPA Routing**:
    *   If you encounter 404 errors on refresh, create a file named `_redirects` in the `public` folder with the following content:
        ```
        /*  /index.html  200
        ```

## Option 3: Manual Build

If you want to host this on a traditional server (Apache/Nginx):

1.  **Run the build command**:
    ```bash
    npm run build
    ```
    *   *Note: If you see a PowerShell error about scripts being disabled, try running this in Command Prompt (cmd) or Git Bash, or run `npx vite build`.*

2.  **Locate the output**:
    *   The build files will be in the `dist` folder.

3.  **Upload**:
    *   Upload the **contents** of the `dist` folder to your server's public html directory.
    *   Configure your server to redirect all 404 requests to `index.html` for client-side routing to work.

## Troubleshooting

*   **"Command not found"**: Ensure you have Node.js installed.
*   **"Script disabled"**: On Windows, try running commands in a standard Command Prompt (cmd.exe) instead of PowerShell if you have permission issues.
*   **Blank page after deploy**: Check the browser console (F12) for errors. Usually, this is due to missing assets or incorrect base paths.
