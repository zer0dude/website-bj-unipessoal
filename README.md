# Brian Jin - Portfolio Website

Professional portfolio website for **Brian Jin**, Applied AI Engineer and founder of **Brian Jin Unipessoal** freelancing company.

🌐 **Live Site:** [brianjin.eu](https://brianjin.eu)

## About

This website showcases the work and expertise of Brian Jin, an Applied AI Engineer specializing in backend development, cloud architecture, and AI/ML solutions. The site also represents Brian Jin Unipessoal, a freelancing company offering consulting and development services.

## Technology Stack

- **Framework:** [Astro](https://astro.build/) - Static Site Generation
- **Hosting:** GitHub Pages with custom domain
- **Domain:** brianjin.eu with SSL/HTTPS
- **CI/CD:** GitHub Actions for automatic deployment

## Development

### Prerequisites
- Node.js 18+ 
- npm

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:4321

# Build for production
npm run build
```

### Branch Workflow
- **`dev`** - Development branch for ongoing work
- **`main`** - Production branch (auto-deploys to brianjin.eu)

## CI/CD Pipeline

**Automatic Deployment Process:**
1. Develop and test on `dev` branch
2. Merge changes to `main` branch  
3. GitHub Actions automatically builds and deploys
4. Site updates live at brianjin.eu within 5-10 minutes

**Deployment Stack:**
- GitHub Actions workflow (`.github/workflows/deploy.yml`)
- Astro build process (`npm run build`)
- GitHub Pages hosting
- Custom domain with automatic SSL

## Template

Built upon the [Codefolio](https://github.com/danielunited/codefolio) template by danielunited. Customized and configured for Brian Jin's professional portfolio with:
- Personalized content and branding
- Custom domain setup (brianjin.eu)
- Professional CI/CD pipeline
- Dual remote setup for template updates

## Repository Setup

**Dual Remote Configuration:**
- `origin` → Personal repository (zer0dude/website-bj-unipessoal)
- `template` → Original template (danielunited/codefolio) for updates

## Contact

**Brian Jin**  
Applied AI Engineer | Brian Jin Unipessoal  
📧 [brian@brianjin.eu](mailto:brian@brianjin.eu)  
🌐 [brianjin.eu](https://brianjin.eu)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

*Professional portfolio powered by Astro and deployed via GitHub Actions*
