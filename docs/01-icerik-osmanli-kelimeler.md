# İçerik: Osmanlı kelimeleri

## Kaynak dosya

Tek doğruluk kaynağı (kürasyon): proje kökündeki [osmanlı-kelimeler.md](../osmanlı-kelimeler.md) (tablo: Eski Kelime | Anlam | Günümüz karşılığı).

## Uygulama verisi: `src/data/terms.json`

Build ve çalışma zamanında site bu JSON dosyasını okur. Markdown tablosu güncellendiğinde JSON’un elle veya script ile senkronize edilmesi gerekir.

### Şema (her öğe)

| Alan | Tip | Açıklama |
|------|-----|----------|
| `slug` | string | URL ve dosya adları için ASCII (`kuliye`, `sifahane-darussifa`). |
| `title` | string | Görünen başlık (ör. “Şifahane / Darüşşifa”). |
| `meaning` | string | Kısa açıklama (markdown kaynağındaki anlam sütunu). |
| `modern` | string | Günümüzdeki karşılık. |
| `tags` | string[] | İsteğe bağlı gruplama: `sosyal`, `egitim`, `ticaret`, `saray`, `dini-mimari` vb. |

### Yeni kelime ekleme süreci

1. [osmanlı-kelimeler.md](../osmanlı-kelimeler.md) tablosuna satır ekle.
2. [src/data/terms.json](../src/data/terms.json) içine aynı içeriği şemaya uygun nesne olarak ekle.
3. İlgili seviye teması varsa [src/data/levels/](../src/data/levels/) altındaki seviye meta alanlarını güncelle.

### Doğrulama

- Terim sayısı markdown satır sayısı ile uyumlu olmalı (şu an 26 terim).
