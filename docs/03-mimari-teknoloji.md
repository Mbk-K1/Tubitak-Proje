# Mimari ve teknoloji

## Stack

- **Vite** + **TypeScript**: derleme ve geliştirme sunucusu.
- **Phaser 3**: 2D oyun sahneleri (önyükleme, menü, seviye seçimi, oyun, sonuç).

## Klasör yapısı (özet)

```
src/
  main.ts              # Vite girişi, Phaser oyun örneği
  style.css            # Site genel stilleri
  data/
    terms.json         # Terimler
    levels/
      level_01.json    # Platform / diken / bitiş
      ...
  game/
    main.ts            # Phaser config ve sahne kaydı
    scenes/            # Boot, Menu, LevelSelect, Play, GameOver/Win
    types.ts           # Seviye JSON tipleri
```

## Komutlar

- `npm install` — bağımlılıklar.
- `npm run dev` — geliştirme.
- `npm run build` — `dist/` üretimi (statik barındırma).

## Ortam

Şu an zorunlu ortam değişkeni yok. İleride analitik veya API eklenirse `.env.example` eklenebilir.

## Varlıklar

- `public/assets/` — müzik (ör. `bgm.ogg`), isteğe bağlı görseller.
- Placeholder görseller kodla çizilebilir (MVP).
