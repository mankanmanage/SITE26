// Interactions du site MANKAN (maquette V3).
// Le site reste lisible sans JavaScript ; les animations respectent
// la préférence « réduire les animations ».

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const pad = (n: number) => String(n).padStart(2, '0');

/* ---------- Apparition au défilement ---------- */
function initReveal() {
  const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  items.forEach((el) => io.observe(el));
}

/* ---------- Léger parallaxe des photos du manifeste ---------- */
function initParallax() {
  const items = document.querySelectorAll<HTMLElement>('[data-parallax]');
  if (!items.length || reduceMotion) return;
  let ticking = false;
  const update = () => {
    const vh = window.innerHeight;
    items.forEach((el) => {
      const r = el.getBoundingClientRect();
      const raw = (r.top + r.height / 2 - vh / 2) * Number(el.dataset.parallax);
      const offset = Math.max(-40, Math.min(40, raw));
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    });
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
}

/* ---------- Intro (logo animé + rideau), une fois par visite ---------- */
function initIntro() {
  const intro = document.querySelector<HTMLElement>('[data-intro]');
  if (!intro || document.documentElement.classList.contains('no-intro')) return;
  try {
    sessionStorage.setItem('mankan-intro', '1');
  } catch {
    /* navigation privée */
  }
  const done = () => intro.remove();
  intro.addEventListener('animationend', (e) => {
    if (e.animationName.includes('curtain')) done();
  });
  intro.addEventListener('click', done);
}

/* ---------- Hero : index des films qui défile ---------- */
function initHero() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;
  const slides = [...hero.querySelectorAll<HTMLElement>('[data-slide]')];
  const rows = [...hero.querySelectorAll<HTMLElement>('[data-row]')];
  const timecode = hero.querySelector<HTMLElement>('[data-timecode]');
  const nowType = hero.querySelector<HTMLElement>('[data-now-type]');
  const nowLink = hero.querySelector<HTMLAnchorElement>('[data-now-link]');
  const soundBtn = hero.querySelector<HTMLButtonElement>('[data-sound]');
  const DURATION = 6;
  let current = 0;
  let t = 0;
  let hover = false;
  let sound = false;

  const visibleRows = () => rows.filter((r) => !r.hidden);

  const show = (index: number) => {
    current = index;
    t = 0;
    rows.forEach((r) => {
      const on = Number(r.dataset.row) === index;
      r.classList.toggle('is-active', on);
      r.style.setProperty('--progress', '0%');
    });
    slides.forEach((s) => {
      const on = Number(s.dataset.slide) === index;
      s.classList.toggle('is-active', on);
      const video = s.querySelector('video');
      if (!video) return;
      if (on) {
        if (!video.src && video.dataset.src) video.src = video.dataset.src;
        video.muted = !sound;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
    const row = rows[index];
    const link = row?.querySelector('a');
    if (nowLink && link) nowLink.href = link.href;
    if (nowType && row) nowType.textContent = row.dataset.typeLabel ?? nowType.textContent;
    if (timecode) timecode.textContent = '00:00:00';
  };

  rows.forEach((row) => {
    const type = row.dataset.type;
    const labels: Record<string, string> = {
      film: 'Film',
      pub: 'Publicité',
      campagne: 'Campagne',
      branding: 'Branding',
      photo: 'Photographie',
    };
    row.dataset.typeLabel = labels[type ?? ''] ?? '';
    const pick = () => {
      hover = true;
      if (Number(row.dataset.row) !== current) show(Number(row.dataset.row));
    };
    row.addEventListener('mouseenter', pick);
    row.addEventListener('focusin', pick);
    row.addEventListener('mouseleave', () => (hover = false));
    row.addEventListener('focusout', () => (hover = false));
  });

  hero.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      hero
        .querySelectorAll<HTMLButtonElement>('[data-filter]')
        .forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      rows.forEach((r) => (r.hidden = f !== 'all' && r.dataset.type !== f));
      const first = visibleRows()[0];
      if (first) show(Number(first.dataset.row));
    });
  });

  soundBtn?.addEventListener('click', () => {
    sound = !sound;
    soundBtn.setAttribute('aria-pressed', String(sound));
    soundBtn.textContent = sound ? '( Son activé )' : '( Son coupé )';
    const video = slides[current]?.querySelector('video');
    if (video) video.muted = !sound;
  });

  show(0);
  if (reduceMotion) return;

  setInterval(() => {
    if (document.hidden) return;
    t = Math.min(t + 1, DURATION);
    if (timecode) timecode.textContent = `00:00:${pad(t)}`;
    rows[current]?.style.setProperty('--progress', `${Math.round((t / DURATION) * 100)}%`);
    if (t >= DURATION && !hover) {
      const list = visibleRows();
      const pos = list.findIndex((r) => Number(r.dataset.row) === current);
      const nextRow = list[(pos + 1) % list.length];
      if (nextRow) show(Number(nextRow.dataset.row));
    }
  }, 1000);
}

/* ---------- Page Films : filtres (?type=film) ---------- */
function initFilmsFilters() {
  const bar = document.querySelector<HTMLElement>('[data-films-filters]');
  if (!bar) return;
  const items = document.querySelectorAll<HTMLElement>('.films-list [data-type]');
  const apply = (filter: string) => {
    bar
      .querySelectorAll<HTMLButtonElement>('[data-filter]')
      .forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === filter)));
    items.forEach((el) => {
      el.hidden = filter !== 'all' && el.dataset.type !== filter;
      if (!el.hidden) el.classList.add('is-visible');
    });
  };
  bar.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-filter]');
    if (!btn) return;
    const f = btn.dataset.filter!;
    apply(f);
    const url = new URL(location.href);
    if (f === 'all') url.searchParams.delete('type');
    else url.searchParams.set('type', f);
    history.replaceState(null, '', url);
  });
  const initial = new URLSearchParams(location.search).get('type');
  if (initial && bar.querySelector(`[data-filter="${CSS.escape(initial)}"]`)) apply(initial);
}

/* ---------- Page film : lecteur Vimeo + panneau « Le projet » ---------- */
function initFilmPage() {
  const page = document.querySelector<HTMLElement>('[data-film]');
  if (!page) return;
  const player = page.querySelector<HTMLElement>('[data-player]');
  const panel = page.querySelector<HTMLElement>('[data-panel]');
  const toggles = page.querySelectorAll<HTMLButtonElement>('[data-panel-toggle]');

  page.querySelector('[data-play]')?.addEventListener('click', () => {
    const id = player?.dataset.player;
    if (!player || !id) return;
    const params = new URLSearchParams({ autoplay: '1', dnt: '1', color: 'FAD02C', title: '0', byline: '0', portrait: '0' });
    const iframe = document.createElement('iframe');
    iframe.src = `https://player.vimeo.com/video/${id}?${params}`;
    iframe.title = player.dataset.title ?? 'Film';
    iframe.allow = 'autoplay; fullscreen; picture-in-picture';
    iframe.allowFullscreen = true;
    player.replaceChildren(iframe);
    page.classList.add('is-playing');
  });

  const setPanel = (open: boolean) => {
    if (!panel) return;
    panel.hidden = !open;
    toggles.forEach((b) => b.setAttribute('aria-expanded', String(open)));
    if (open) panel.querySelector<HTMLElement>('button')?.focus();
  };
  toggles.forEach((b) => b.addEventListener('click', () => setPanel(Boolean(panel?.hidden))));

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (panel && !panel.hidden) {
      setPanel(false);
      return;
    }
    if (page.classList.contains('is-playing')) {
      page.classList.remove('is-playing');
      player?.replaceChildren();
    }
  });
}

/* ---------- Manifeste audio (page À propos) ---------- */
function initAudio() {
  const section = document.querySelector<HTMLElement>('[data-audio]');
  const audio = section?.querySelector<HTMLAudioElement>('[data-audio-el]');
  if (!section || !audio) return;
  const bar = section.querySelector<HTMLElement>('[data-audio-progress]');
  section.querySelector('[data-audio-toggle]')?.addEventListener('click', () => {
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  });
  audio.addEventListener('play', () => section.classList.add('is-playing'));
  audio.addEventListener('pause', () => section.classList.remove('is-playing'));
  audio.addEventListener('timeupdate', () => {
    if (bar && audio.duration) bar.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
  });
  section.querySelectorAll<HTMLButtonElement>('[data-audio-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      section
        .querySelectorAll('[data-audio-lang]')
        .forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      const wasPlaying = !audio.paused;
      audio.src = btn.dataset.audioLang!;
      if (wasPlaying) audio.play().catch(() => {});
    });
  });
}

/* ---------- Miniatures Vimeo pour les films sans image ---------- */
function initVimeoThumbs() {
  document.querySelectorAll<HTMLImageElement>('img[data-vimeo-thumb]').forEach(async (img) => {
    const id = img.dataset.vimeoThumb;
    if (!id) return;
    try {
      const res = await fetch(
        `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(`https://vimeo.com/${id}`)}&width=1920`,
      );
      if (!res.ok) return;
      const data = await res.json();
      if (!data.thumbnail_url) return;
      img.src = data.thumbnail_url;
      img.hidden = false;
      img.parentElement?.querySelector('.recit__blank, .films-list__blank, .hero__blank, .film__blank')?.remove();
    } catch {
      /* le visuel de remplacement reste affiché */
    }
  });
}

/* ---------- Fenêtres (mentions légales) ---------- */
function initDialogs() {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const opener = target.closest<HTMLElement>('[data-open-dialog]');
    if (opener) {
      (document.getElementById(opener.dataset.openDialog!) as HTMLDialogElement | null)?.showModal();
      return;
    }
    if (target.closest('[data-close-dialog]')) target.closest('dialog')?.close();
    else if (target instanceof HTMLDialogElement) target.close();
  });
}

/* ---------- Retour du formulaire de contact ---------- */
function initFormStatus() {
  const params = new URLSearchParams(location.search);
  const status = params.has('envoye') ? 'ok' : params.has('erreur') ? 'erreur' : null;
  if (!status) return;
  const el = document.querySelector<HTMLElement>(`[data-form-status="${status}"]`);
  if (el) {
    el.hidden = false;
    el.focus();
  }
}

initIntro();
initReveal();
initParallax();
initHero();
initFilmsFilters();
initFilmPage();
initAudio();
initVimeoThumbs();
initDialogs();
initFormStatus();
