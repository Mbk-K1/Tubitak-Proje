# Osmanlı Kelimeleri ve Koşu

10–14 yaş için: Osmanlı dönemi yapı ve kurum adlarını öğreten web sayfaları ve Phaser 3 ile yazılmış kısa bir platform koşusu.

## Gereksinimler

- Node.js 20+ ve npm (geliştirme ve derleme için)
- IDE’de `Cannot find module 'phaser'` görürseniz depo kökünde `npm install` çalıştırın; `phaser` paketi `node_modules` altına iner ve türler paketle birlikte gelir.

## Komutlar

> Not: Bazı ortamlarda yalnızca Node bulunup npm bulunmayabilir; klonladıktan sonra `npm run build` ile derlemeyi yerelde doğrulayın.

```bash
npm install
npm run dev
npm run build
npm run preview
```

`npm run build` çıktısı `dist/` klasöründedir; statik barındırma (GitHub Pages, Netlify vb.) için bu klasörü yayınlayın. `vite.config.ts` içinde `base: './'` kullanıldığından alt klasörden de açılabilir.

## Proje yapısı

- `src/main.ts` — Ana sayfa, Öğren, Oyun kabuğu
- `src/data/terms.json` — Kelime verisi ([osmanlı-kelimeler.md](osmanlı-kelimeler.md) ile uyumlu)
- `src/data/levels/` — Seviye JSON dosyaları
- `src/game/` — Phaser sahne ve oyun fabrikası
- `docs/` — Vizyon, içerik süreci, Git, yol haritası
- `public/nasil-oynanir.md` — Oyuncu yönergesi

## Git sürümü

İlk sürüm için yerelde:

```bash
git tag -a v0.1.0 -m "İlk oynanabilir sürüm"
git push origin v0.1.0
```

Dal ve commit kuralları için [docs/04-git-is-akisi.md](docs/04-git-is-akisi.md) dosyasına bakın.
