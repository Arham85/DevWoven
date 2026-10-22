# DevWoven — Web Dev Roadmap

> **Weave Your Way From Total Beginner to Full-Stack Web Developer.**  
> Curated & Architected by **[Muhammad Arham Munir](https://github.com/arham85)**  
> LinkedIn: [in/arham85](https://www.linkedin.com/in/arham85/) • GitHub: [@arham85](https://github.com/arham85)

DevWoven is a polished, opinionated educational web application designed to guide aspiring developers from HTML foundations to full-stack deployment using only peer-reviewed, 100% free video resources and hands-on milestone projects.

---

## 🔒 Security & Privacy Posture

- **100% Client-Side Architecture**: Zero backend servers storing personal data, cookies, or user sessions.
- **Zero-Tracking Guarantee**: No Google Analytics, tracking pixels, or third-party telemetry.
- **Local-First Persistence**: Learning checkpoints and bookmarks remain private inside your browser's LocalStorage.
- **Cryptographic Whitelist Defense**: All local data and JSON imports are strictly validated against valid technology IDs.
- **Content Security Policy (CSP)**: Hardened headers mitigating XSS and reverse tabnabbing.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Clone the repository
git clone https://github.com/arham85/devwoven.git
cd devwoven

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 📦 Building for Production

```bash
# Build production bundle to /dist
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deploying to GitHub Pages

DevWoven includes an automated GitHub Actions deployment workflow (`.github/workflows/deploy.yml`):

1. Push this repository to GitHub.
2. In your GitHub repository, navigate to **Settings > Pages**.
3. Under **Build and deployment > Source**, select **GitHub Actions**.
4. Every push to the `main` branch will automatically compile and publish your live website with HTTPS.

---

## 📄 License

Distributed under the **MIT License**. Free for all aspiring developers and educators.
