import './style.css';
import termsData from './data/terms.json';
import { LEVEL_ORDER, getLevel } from './data/levels';
import { createPhaserGame } from './game/createGame';
import type { Term } from './game/types';

const terms = termsData as Term[];

let activeGame: import('phaser').Game | null = null;

function destroyGame(): void {
  if (activeGame) {
    activeGame.destroy(true);
    activeGame = null;
  }
}

function showView(id: 'home' | 'learn' | 'game'): void {
  document.querySelectorAll<HTMLElement>('[data-view]').forEach((el) => {
    el.hidden = el.dataset.view !== id;
  });
  document.querySelectorAll<HTMLElement>('[data-nav]').forEach((btn) => {
    btn.setAttribute(
      'aria-current',
      btn.dataset.nav === id ? 'page' : 'false',
    );
  });
  if (id !== 'game') {
    destroyGame();
  }
}

function renderLearn(): void {
  const list = document.getElementById('term-list');
  const detail = document.getElementById('term-detail');
  if (!list || !detail) return;

  list.innerHTML = '';
  for (const t of terms) {
    const li = document.createElement('li');
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'term-pill';
    b.textContent = t.title;
    b.addEventListener('click', () => {
      list.querySelectorAll('button').forEach((x) => x.classList.remove('is-active'));
      b.classList.add('is-active');
      detail.innerHTML = `
        <h3>${escapeHtml(t.title)}</h3>
        <p class="muted">Günümüzde: <strong>${escapeHtml(t.modern)}</strong></p>
        <p>${escapeHtml(t.meaning)}</p>
        <p class="tags">${t.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join(' ')}</p>
      `;
    });
    li.appendChild(b);
    list.appendChild(li);
  }

  if (terms[0]) {
    list.querySelector('button')?.dispatchEvent(new Event('click'));
  }
}

function escapeHtml(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function renderLevelCards(): void {
  const wrap = document.getElementById('level-cards');
  if (!wrap) return;
  wrap.innerHTML = '';
  for (const id of LEVEL_ORDER) {
    const lv = getLevel(id);
    if (!lv) continue;
    const card = document.createElement('article');
    card.className = 'level-card';
    card.innerHTML = `
      <h3>${escapeHtml(lv.name)}</h3>
      <p class="muted">${escapeHtml(lv.description ?? '')}</p>
      <p class="small">BPM (tasarım): ${lv.musicBpm ?? '—'}</p>
      <button type="button" class="btn primary js-start" data-level="${escapeHtml(id)}">Başlat</button>
    `;
    wrap.appendChild(card);
  }

  wrap.querySelectorAll<HTMLButtonElement>('.js-start').forEach((btn) => {
    btn.addEventListener('click', () => {
      const levelId = btn.dataset.level;
      if (levelId) startLevel(levelId);
    });
  });
}

function startLevel(levelId: string): void {
  destroyGame();
  const host = document.getElementById('game-canvas-host');
  if (!host) return;
  host.innerHTML = '';

  activeGame = createPhaserGame(host, {
    levelId,
    onGameExit: () => {
      destroyGame();
      showView('game');
    },
  });
}

function mountApp(): void {
  const root = document.getElementById('app');
  if (!root) return;

  root.innerHTML = `
    <div class="shell">
      <header class="top">
        <div class="brand">
          <span class="logo" aria-hidden="true">◇</span>
          <div>
            <div class="brand-title">Osmanlı Kelimeleri</div>
            <div class="brand-sub">Eski yapılar, bugünün karşılıkları</div>
          </div>
        </div>
        <nav class="nav" aria-label="Ana menü">
          <button type="button" class="nav-btn" data-nav="home" aria-current="page">Ana sayfa</button>
          <button type="button" class="nav-btn" data-nav="learn">Öğren</button>
          <button type="button" class="nav-btn" data-nav="game">Oyun</button>
        </nav>
      </header>

      <main class="content">
        <section data-view="home" class="panel hero">
          <h1>Merhaba, küçük kaşif</h1>
          <p class="lead">
            Bu sitede Osmanlı döneminde kullanılan yapı ve kurum isimlerini öğrenebilir,
            ardından kısa bir koşu oyununda reflekslerini deneyebilirsin.
          </p>
          <div class="hero-actions">
            <button type="button" class="btn primary" data-goto="learn">Kelimelere bak</button>
            <button type="button" class="btn ghost" data-goto="game">Oyuna geç</button>
          </div>
          <p class="fineprint">
            10–14 yaş için tasarlandı. Oyun için yönergeler:
            <a href="${import.meta.env.BASE_URL}nasil-oynanir.md">Nasıl oynanır</a>
          </p>
        </section>

        <section data-view="learn" class="panel" hidden>
          <h2>Terimler</h2>
          <p class="muted">Listeden bir başlık seç; sağda kısa açıklama görünür.</p>
          <div class="learn-grid">
            <ul id="term-list" class="term-list"></ul>
            <article id="term-detail" class="term-detail card"></article>
          </div>
        </section>

        <section data-view="game" class="panel" hidden>
          <h2>Koşu parkuru</h2>
          <p class="muted">Bir seviye seç; bitirdiğinde o temaya ait kelimeler özetlenir.</p>
          <div id="level-cards" class="level-grid"></div>
          <div id="game-canvas-host" class="game-host" aria-live="polite"></div>
        </section>
      </main>

      <footer class="foot">
        <span>TÜBİTAK proje çalışması için eğitim amaçlı içerik.</span>
      </footer>
    </div>
  `;

  root.querySelectorAll<HTMLButtonElement>('[data-nav]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const v = btn.dataset.nav as 'home' | 'learn' | 'game' | undefined;
      if (v) showView(v);
    });
  });

  root.querySelectorAll<HTMLButtonElement>('[data-goto]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const v = btn.dataset.goto as 'home' | 'learn' | 'game' | undefined;
      if (v) showView(v);
    });
  });

  renderLearn();
  renderLevelCards();
}

mountApp();
