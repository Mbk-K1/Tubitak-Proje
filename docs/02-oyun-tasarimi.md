# Oyun tasarımı

## İlham

Geometry Dash tarzı: sabit yatay hız, zıplama, engellere çarpınca seviye başı, bitiş çizgisine ulaşınca sonuç ekranı.

## Mekanikler

- **Hareket:** Otomatik sağa kayma; oyuncu yalnızca zıplama (tek tuş).
- **Çarpışma:** Diken ve düşme (harita altı) ölüm sayılır; platformlara iniş güvenli.
- **Yeniden başlatma:** Ölümde kısa gecikme veya anında aynı checkpoint’ten (MVP: seviye başı).
- **Bitiş:** Bitiş bandına temas → sonuç sahnesi + o seviyeye bağlı 1–2 kelime kartı.

## Seviyeler

- Hedef: en az 3 hazır JSON seviye (`level_01`, `level_02`, `level_03`).
- Her seviye `relatedTermSlugs` ile [terms.json](../src/data/terms.json) terimlerine bağlanır.

## Zorluk ve ritim

- İlk sürüm: engeller eşit veya neredeyse eşit aralıklarla “akış” hissi; arka plan müziği oynatılır.
- İleride: BPM bilgisi seviye JSON’unda tutulabilir; engeller beat’e göre hizalanır.

## Telif

Müzik dosyası yalnızca uygun lisansla eklenir; kaynak [docs/03-mimari-teknoloji.md](03-mimari-teknoloji.md) veya kök README’de listelenir.
