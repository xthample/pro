# Clipper Pro — Deploy Guide

## Struktur Project
```
clipper-pro/
├── api/
│   └── chat.js          ← Backend proxy (API key aman di server)
├── public/
│   └── index.html       ← Frontend app
├── vercel.json          ← Konfigurasi Vercel
├── package.json
└── README.md
```

## Deploy ke Vercel (5 menit)

### Cara 1 — Via GitHub (Recommended)

1. Upload folder ini ke GitHub repo baru
2. Buka https://vercel.com → New Project → Import repo
3. Di **Environment Variables**, tambahkan:
   ```
   OPENROUTER_API_KEY = sk-or-v1-xxxxxxxx
   ```
4. Klik Deploy → selesai! URL otomatis tersedia.

### Cara 2 — Via CLI

```bash
npm i -g vercel
cd clipper-pro
vercel login
vercel --prod
```

Saat ditanya environment variable, masukkan:
```
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxx
```

## Pakai Lokal (tanpa deploy)

Buka `public/index.html` langsung di browser.
App akan auto-detect mode lokal dan panggil OpenRouter langsung.
API key tersimpan otomatis di localStorage + cookie.

## Fitur Auto Session / Cookie

- API key disimpan di `localStorage` + cookie (365 hari)
- Clips, riwayat URL, dan pengaturan dipulihkan otomatis
- Tidak perlu input ulang setiap buka browser
- Tombol "Hapus Sesi" untuk reset total

## Environment Variables (Vercel)

| Key | Value |
|-----|-------|
| `OPENROUTER_API_KEY` | API key dari openrouter.ai |
| `SITE_URL` | (opsional) URL domain kamu |

## Catatan Penting

- Di mode Vercel: API key tersimpan di server (aman), frontend tidak tahu key-nya
- Di mode lokal: API key tersimpan di browser (hanya untuk pemakaian pribadi)
