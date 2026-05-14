# Git iş akışı

## Dallar

- **`main`**: Her zaman çalışır build; yayına aday.
- **`feature/*`**: Yeni özellik (ör. `feature/ogren-filtre`, `feature/seviye-3`).
- **`content/*`**: Sadece içerik/JSON (ör. `content/terms-guncelleme`).
- **`fix/*`**: Hata düzeltmeleri.

İsteğe bağlı: ekip büyürse `develop` dalı açılıp `main`e release merge edilebilir.

## Commit mesajları

**Öneri:** Conventional Commits (İngilizce kısa önek + açıklama):

- `feat:` yeni özellik
- `fix:` hata düzeltmesi
- `docs:` yalnız dokümantasyon
- `chore:` araç, bağımlılık, format

Örnek: `feat: add level select scene`

Türkçe kısa mesaj da kabul edilebilir; ekip içinde tek stil seçilip korunur.

## Etiketleme

- Sürüm etiketleri: `v0.1.0`, `v0.2.0` (semver).
- TÜBİTAK teslimi için ilgili etiket commit’i not edin.

## `.gitignore` özeti

Şunlar repoya girmez:

- `node_modules/`
- `dist/`
- `.env` (gelecekte kullanılırsa)
- Editör klasörleri (`.idea/`, `.vscode/` isteğe bağlı — genelde kişisel ayarlar ignore edilir)

## Birleştirme

- Mümkünse `main`e doğrudan push yerine PR + kısa gözden geçirme.
- Büyük içerik değişikliklerinde diff’i okuyun (özellikle `terms.json`).
