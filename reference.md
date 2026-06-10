Role: You are a world-class Creative Developer and UI/UX Designer specializing in Awwwards-winning luxury travel websites. You are an expert in React, Tailwind CSS, GSAP, and Framer Motion.
Objective: Build a complete, production-ready, high-performance website for "Travel Co.", a ultra-luxury travel concierge. The site must feel expensive, cinematic, and seamless.
Tech Stack:
Framework: Vite + React (SWC)
Styling: Tailwind CSS (v3 or v4), standard CSS variables for complex gradients.
Animation: GSAP (ScrollTrigger), Framer Motion (Interactions), React Lenis (Smooth Scroll).
Routing: React Router DOM (v6).
Deployment: Netlify (Static Adapter).

1. Design & Aesthetic System
Theme: "Condé Nast Traveler meets Apple". Dark mode default (#0c0c0c).
Typography: Playfair Display (Serif, Headlines) & Inter (Sans, UI), Space Mono (Data/Tags).
Colors:
Background: #0c0c0c (Rich Black)
Accents: #D4AF37 (Travel Gold), #FEFEFE (Off-white), Glassmorphism (White/5 with Blur).
Visuals: Full-screen video backgrounds, parallax image sequences, glassmorphism cards, text gradients.

2. File Structure & Implementation
A. Configuration
tailwind.config.js Extend the theme with these specific colors and fonts:
javascript
export default {
 content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
 theme: {
   extend: {
     fontFamily: {
       sans: ['Inter', 'sans-serif'],
       serif: ['Playfair Display', 'serif'],
       mono: ['Space Mono', 'monospace'],
     },
     colors: {
       'brand-gold': '#d4af37',
       'travel-gold': '#D4AF37',
       'travel-white': '#FEFEFE',
     },
      // Add animations for float, drift, bubble-rise
   },
 },
 plugins: [],
}
src/index.css Define base variables and utilities:
css
@import "tailwindcss";
:root { --bg-color: #0c0c0c; --text-color: #ffffff; }
body { background-color: var(--bg-color); color: var(--text-color); font-family: 'Inter', sans-serif; overflow-x: hidden; }
.glass-panel { @apply backdrop-blur-md bg-white/5 border border-white/10; }
.text-gradient-gold { background: linear-gradient(to right, #D4AF37, #FF6B35); -webkit-background-clip: text; color: transparent; }
B. Core Components
src/App.jsx
Wrap in <ReactLenis root> for smooth scrolling.
Use react-router-dom for valid SPA routing.
Routes: / (Home), /journal (Journal), /travel (Travel), /gallery (Gallery), /contact (Contact), /private-jets to /concierge (Services).
Important: Import useEffect from 'react' for 
ScrollToTop component to avoid ReferenceError.
src/components/Header.jsx
Fixed position, glassmorphic pill shape.
Links: Home, Travel, Journal, Gallery, Contact.
"Reserve" button toggles a global reservation modal.
src/components/HeroCanvas.jsx
Critical Quality: Use a <canvas> element to render an image sequence (
ezgif-frame-001.jpg to 278).
Styles: Apply filter: contrast(1.05) saturate(1.05) to the canvas for "4K/8K" perceived sharpness.
Logic: Use gsap.ScrollTrigger to scrub through frames based on scroll position.
Text Layer: Overlay "EXPLORE PARADISE", "We have financing plans", "YOU DESERVE IT" with GSAP animations.
src/hooks/useCanvasVideo.js (The Engine)
Critical Fix: Define const savedImages = useRef([]) outside/before the useEffect to avoid scope errors.
High-DPI: Handle window.devicePixelRatio for Retina displays.
Color Space: Use canvas.getContext('2d', { alpha: false, colorSpace: 'display-p3' }) for maximum vibrancy on Macs.
src/components/BentoGrid.jsx
A high-end masonry grid placed below the Pricing section.
Cards: Use <video autoPlay loop muted> for backgrounds.
Design: "Penthouse" card (id: 'penthouse') gets special gold borders and shadow.
Interaction: Hover scales video, reveals text overlay.
src/components/GalleryPage.jsx
Layout: Masonry grid (columns-1 md:columns-3).
Interaction: Double-click an image to expand it into a full-screen lightbox using framer-motion layout animations (layoutId).
Data: Use high-res Unsplash images.
src/components/ContactPage.jsx
Layout: Split screen. Left = Contact Info (Email, Phone, Address). Right = Glassmorphic Form.
Form: Fields for Name, Email, Subject, Message. Real-time validation visual feedback (focus states).
src/components/JournalPage.jsx
Layout: Editorial list style.
Content: SEO-optimized mock articles with "Read Time", Date, and large Serif headlines.
Visuals: High-quality thumbnails (aspect-[4/3]).
src/components/Footer.jsx
Aesthetic: "Raj's Coffee" style – Black background, thin borders.
Columns: Services, Get in Touch, Connect, Pay Safely (VISA/MC badges).
Typography: Massive "TRAVEL CO." serif text spanning the bottom width (opacity 90%).
C. Data Files
src/data/travelData.js
Export bentoCards array with luxury destinations (Santorini, Aspen, Kyoto, etc.) and video paths.
src/data/galleryData.js
Export galleryData array with 
id, src, alt, category, caption.
src/data/blogData.js
Export blogData array with 
id, title, excerpt, 
date, readTime, image, content.

3. Deployment Configuration
netlify.toml
toml
[build]
 command = "npm run build"
 publish = "dist"
[[redirects]]
 from = "/*"
 to = "/index.html"
 status = 200
public/_redirects /* /index.html 200

Execution Instructions
Scaffold: Run npm create vite@latest app -- --template react.
Install: npm install gsap framer-motion react-router-dom @studio-freight/react-lenis clsx tailwind-merge.
Assets: Place frame sequence (001-278) in public/frames/.
Code: Generate all files listed above with specific attention to the "Critical Fixes" in 
HeroCanvas and 
useCanvasVideo.
Build: npm run build.
