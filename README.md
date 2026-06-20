# Logo Workshop — Deploy Steps

## 1. App icons venum (mandatory before deploy)
`public/icon-192.png` and `public/icon-512.png` — Play Store/PWA-ku app icon venum.
Canva-la or any tool-la 512x512 square icon design pannunga, andha 2 files-ah
`public` folder-la podunga (same name: icon-192.png, icon-512.png).

## 2. Local-la test pannunga (optional, terminal venum)
```
npm install
npm run dev
```
Browser-la localhost link open aagum — app work aaguthu nu check pannunga.

## 3. GitHub-ku upload pannunga
1. github.com-la account create pannunga (illa irundha)
2. New repository create pannunga — name: `logo-workshop`
3. Idhu folder full-ah (package.json, index.html, src/, public/, vite.config.js, .gitignore)
   andha repo-ku upload pannunga (GitHub website-laye drag-drop pannalam, illa git command use pannalam)

## 4. Vercel-la deploy pannunga (free)
1. vercel.com-ku poi, GitHub account-oda sign in pannunga
2. "Add New Project" → unga `logo-workshop` repo select pannunga
3. Framework auto-detect aagum (Vite) — "Deploy" click pannunga
4. 1-2 mins-la live URL kedaikum: `https://logo-workshop-yourname.vercel.app`

## 5. PWABuilder use panni Android app (.aab) generate pannunga
1. pwabuilder.com-ku poi
2. Step 4-la kedaicha live URL paste pannunga
3. "Package for Stores" → Android select pannunga
4. .aab file download aagum

## 6. Play Console-la upload pannunga
1. play.google.com/console — $25 one-time fee pay pannunga
2. New app create pannunga, details fill pannunga (name, description, screenshots)
3. Step 5 .aab file upload pannunga
4. Privacy policy URL kudukanum (termly.io-la free-a generate pannalam)
5. Content rating form fill pannunga
6. Submit for review (1-3 days usually)

---
Doubt irundha eppovume kelunga.
