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

`npm run build` çıktısı `dist/` klasöründedir; statik barındırma için **yayınlanması gereken bu klasördür**, proje kökündeki `index.html` + `/src/main.ts` GitHub Pages’te çalışmaz (beyaz ekran).

### GitHub Pages (beyaz ekran olmaması için)

1. GitHub’da repo → **Settings** → **Pages**.
2. **Build and deployment** → Source: **GitHub Actions** (branch’ten “Deploy from branch / root” kullanmayın; o zaman derlenmemiş kaynak gider).
3. `main`e push edince [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml) `dist` üretir ve yayınlar.
4. Adres genelde `https://<kullanıcı>.github.io/<depo-adı>/` olur; `vite.config.ts` GitHub Actions ortamında `GITHUB_REPOSITORY` ile `base` yolunu buna göre ayarlar.

Özel alan adı veya `kullanici.github.io` kök deposu kullanıyorsanız `base` için `vite.config.ts` içinde kendi kuralınızı eklemeniz gerekebilir.

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
