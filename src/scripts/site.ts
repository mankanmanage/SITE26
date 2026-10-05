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

/* ---------- Intro (logo animé + rideau) à chaque arrivée sur l'accueil ---------- */
// Les films du hero ne démarrent qu'une fois le rideau levé.
let introDone: Promise<void> = Promise.resolve();
function initIntro() {
  const intro = document.querySelector<HTMLElement>('[data-intro]');
  if (!intro || document.documentElement.classList.contains('no-intro')) return;
  introDone = new Promise((resolve) => {
    const done = () => {
      intro.remove();
      resolve();
    };
    intro.addEventListener('animationend', (e) => {
      if (e.animationName.includes('curtain')) done();
    });
    intro.addEventListener('click', done);
  });
}

/* ---------- Hero : les films s'enchaînent en plein écran ---------- */
function initHero() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;
  const all = [...hero.querySelectorAll<HTMLElement>('[data-slide]')];
  // Toutes les vidéos s'enchaînent, quel que soit leur format (voir .hero__bg).
  const slides = all;
  all.forEach((s) => s.classList.toggle('is-active', false));
  const soundBtn = hero.querySelector<HTMLButtonElement>('[data-sound]');
  const DURATION = 7000;
  let current = 0;
  let sound = false;

  const show = (index: number) => {
    current = index;
    slides.forEach((s, i) => {
      const on = i === index;
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
  };

  const setSound = (on: boolean) => {
    sound = on;
    soundBtn?.setAttribute('aria-pressed', String(sound));
    if (soundBtn) soundBtn.textContent = sound ? '( Son activé )' : '( Son coupé )';
    const video = slides[current]?.querySelector('video');
    if (video) video.muted = !sound;
  };
  soundBtn?.addEventListener('click', () => setSound(!sound));

  // Le son se coupe dès qu'on fait défiler la page au-delà des films.
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && sound) setSound(false);
      },
      { threshold: 0.6 },
    ).observe(hero);
  }

  slides[0]?.classList.add('is-active');
  introDone.then(() => {
    show(0);
    if (reduceMotion || slides.length < 2) return;
    setInterval(() => {
      if (!document.hidden) show((current + 1) % slides.length);
    }, DURATION);
  });
}

/* ---------- Carrousel « Nos récits » ---------- */
function initCarousel() {
  const track = document.querySelector<HTMLElement>('[data-carousel]');
  if (!track) return;
  const slides = [...track.querySelectorAll<HTMLElement>('.slide')];
  const count = document.querySelector<HTMLElement>('[data-carousel-count]');
  const total = pad(slides.length);

  const currentIndex = () => {
    const left = track.scrollLeft;
    let best = 0;
    slides.forEach((s, i) => {
      if (Math.abs(s.offsetLeft - track.offsetLeft - left) < Math.abs(slides[best].offsetLeft - track.offsetLeft - left)) best = i;
    });
    return best;
  };
  const goTo = (i: number) => {
    const target = slides[(i + slides.length) % slides.length];
    track.scrollTo({ left: target.offsetLeft - track.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft), behavior: reduceMotion ? 'auto' : 'smooth' });
  };
  document.querySelector('[data-carousel-prev]')?.addEventListener('click', () => goTo(currentIndex() - 1));
  document.querySelector('[data-carousel-next]')?.addEventListener('click', () => goTo(currentIndex() + 1));
  track.addEventListener(
    'scroll',
    () => {
      if (count) count.textContent = `${pad(currentIndex() + 1)} / ${total}`;
    },
    { passive: true },
  );

  // Glisser à la souris
  let startX = 0;
  let startScroll = 0;
  let down = false;
  track.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return;
    down = true;
    startX = e.clientX;
    startScroll = track.scrollLeft;
  });
  window.addEventListener('pointermove', (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 6) track.classList.add('is-dragging');
    if (track.classList.contains('is-dragging')) track.scrollLeft = startScroll - dx;
  });
  window.addEventListener('pointerup', () => {
    down = false;
    window.setTimeout(() => track.classList.remove('is-dragging'), 0);
  });

  // L'extrait se lance au survol
  if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
    slides.forEach((slide) => {
      const video = slide.querySelector('video');
      if (!video) return;
      slide.addEventListener('mouseenter', () => {
        if (!video.src && video.dataset.src) video.src = video.dataset.src;
        video.play().then(() => slide.classList.add('is-playing')).catch(() => {});
      });
      slide.addEventListener('mouseleave', () => {
        video.pause();
        slide.classList.remove('is-playing');
      });
    });
  }

  // Fenêtres de descriptif : lancer / arrêter l'extrait
  document.querySelectorAll<HTMLDialogElement>('.recit-dialog').forEach((dialog) => {
    const video = dialog.querySelector('video');
    new MutationObserver(() => {
      if (!video) return;
      if (dialog.open) {
        if (!video.src && video.dataset.src) video.src = video.dataset.src;
        if (!reduceMotion) video.play().catch(() => {});
      } else video.pause();
    }).observe(dialog, { attributes: true, attributeFilter: ['open'] });
  });
}

/* ---------- Menu « 3 traits » ---------- */
function initMenu() {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  if (!toggle || !menu) return;
  const setOpen = (open: boolean) => {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.visually-hidden')!.textContent = open ? 'Fermer le menu' : 'Menu';
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) menu.querySelector<HTMLElement>('a')?.focus();
  };
  toggle.addEventListener('click', () => setOpen(menu.hidden));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });
}

/* ---------- Page Projets : plein écran + bande des projets (façon Lotumn) ---------- */
function initReel() {
  const reel = document.querySelector<HTMLElement>('[data-reel]');
  if (!reel) return;
  const slides = [...reel.querySelectorAll<HTMLElement>('[data-slide]')];
  const rows = [...reel.querySelectorAll<HTMLElement>('[data-row]')];
  const strip = reel.querySelector<HTMLElement>('[data-strip]');
  const link = reel.querySelector<HTMLAnchorElement>('[data-now-link]');
  const client = reel.querySelector<HTMLElement>('[data-now-client]');
  const title = reel.querySelector<HTMLElement>('[data-now-title]');
  const type = reel.querySelector<HTMLElement>('[data-now-type]');
  const timecode = reel.querySelector<HTMLElement>('[data-timecode]');
  const gridItems = document.querySelectorAll<HTMLElement>('.all__grid [data-type]');
  const DURATION = 6;
  let current = 0;
  let t = 0;
  let hover = false;

  const visibleRows = () => rows.filter((r) => !r.hidden);

  const show = (index: number) => {
    if (index === current && t > 0) return;
    current = index;
    t = 0;
    rows.forEach((r) => {
      r.classList.toggle('is-active', Number(r.dataset.row) === index);
      r.style.setProperty('--progress', '0%');
    });
    slides.forEach((s) => {
      const on = Number(s.dataset.slide) === index;
      s.classList.toggle('is-active', on);
      const video = s.querySelector('video');
      if (!video) return;
      if (on) {
        if (!video.src && video.dataset.src) video.src = video.dataset.src;
        video.play().catch(() => {});
      } else video.pause();
    });
    const a = rows[index]?.querySelector<HTMLAnchorElement>('a');
    if (a) {
      reel.classList.add('is-switching');
      window.setTimeout(() => {
        if (link) link.href = a.href;
        if (client) client.textContent = a.dataset.client ?? '';
        if (title) title.textContent = a.dataset.title ?? '';
        if (type) type.textContent = a.dataset.typeLabel ?? '';
        reel.classList.remove('is-switching');
      }, reduceMotion ? 0 : 250);
      // Garde la vignette active visible dans la bande
      if (strip) {
        const li = rows[index];
        const left = li.offsetLeft - strip.clientWidth / 2 + li.clientWidth / 2;
        strip.scrollTo({ left, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    }
    if (timecode) timecode.textContent = '00:00:00';
  };

  rows.forEach((row) => {
    const pick = () => {
      hover = true;
      show(Number(row.dataset.row));
    };
    row.addEventListener('mouseenter', pick);
    row.addEventListener('focusin', pick);
    row.addEventListener('mouseleave', () => (hover = false));
    row.addEventListener('focusout', () => (hover = false));
  });

  reel.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      reel
        .querySelectorAll<HTMLButtonElement>('[data-filter]')
        .forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      rows.forEach((r) => (r.hidden = f !== 'all' && r.dataset.type !== f));
      gridItems.forEach((g) => {
        g.hidden = f !== 'all' && g.dataset.type !== f;
        if (!g.hidden) g.classList.add('is-visible');
      });
      const first = visibleRows()[0];
      if (first) {
        t = 0;
        current = -1;
        show(Number(first.dataset.row));
      }
    });
  });

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
      if (nextRow) {
        t = 0;
        show(Number(nextRow.dataset.row));
      }
    }
  }, 1000);
}

/* ---------- Page film : lecteur Vimeo + panneau « Le projet » ---------- */
function initFilmPage() {
  const page = document.querySelector<HTMLElement>('[data-film]');
  if (!page) return;
  const player = page.querySelector<HTMLElement>('[data-player]');
  const panel = page.querySelector<HTMLElement>('[data-panel]');
  const toggles = page.querySelectorAll<HTMLButtonElement>('[data-panel-toggle]');

  page.querySelector('[data-play]')?.addEventListener('click', () => {
    if (!player) return;
    // Film hébergé sur le site (LWS)
    if (player.dataset.video) {
      const video = document.createElement('video');
      video.src = player.dataset.video;
      if (player.dataset.poster) video.poster = player.dataset.poster;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.preload = 'auto';
      video.setAttribute('aria-label', player.dataset.title ?? 'Film');
      player.replaceChildren(video);
      page.classList.add('is-playing');
      video.play().catch(() => {});
      return;
    }
    // Film hébergé sur Vimeo
    const id = player.dataset.player;
    if (!id) return;
    const params = new URLSearchParams({ autoplay: '1', dnt: '1', color: 'FAD02C', title: '0', byline: '0', portrait: '0' });
    const iframe = document.createElement('iframe');
    iframe.src = `https://player.vimeo.com/video/${id}?${params}`;
    iframe.title = player.dataset.title ?? 'Film';
    iframe.allow = 'autoplay; fullscreen; picture-in-picture';
    iframe.allowFullscreen = true;
    player.replaceChildren(iframe);
    page.classList.add('is-playing');
  });

  // Film complet : mis en pause quand on fait défiler la page au-delà du lecteur.
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) player?.querySelector('video')?.pause();
      },
      { threshold: 0.4 },
    ).observe(page);
  }

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
  const seek = section.querySelector<HTMLInputElement>('[data-audio-seek]');
  const time = section.querySelector<HTMLElement>('[data-audio-time]');
  const fmt = (sec: number) => `${pad(Math.floor(sec / 60))}:${pad(Math.floor(sec % 60))}`;
  let seeking = false;

  section.querySelector('[data-audio-toggle]')?.addEventListener('click', () => {
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  });
  audio.addEventListener('play', () => section.classList.add('is-playing'));
  audio.addEventListener('pause', () => section.classList.remove('is-playing'));
  audio.addEventListener('ended', () => section.classList.remove('is-playing'));
  audio.addEventListener('loadedmetadata', () => {
    if (time) time.textContent = `00:00 / ${fmt(audio.duration)}`;
  });
  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    if (seek && !seeking) seek.value = String((audio.currentTime / audio.duration) * 100);
    if (time) time.textContent = `${fmt(audio.currentTime)} / ${fmt(audio.duration)}`;
  });
  seek?.addEventListener('input', () => {
    seeking = true;
    if (audio.duration) audio.currentTime = (Number(seek.value) / 100) * audio.duration;
  });
  seek?.addEventListener('change', () => (seeking = false));

  section.querySelectorAll<HTMLButtonElement>('[data-audio-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      section
        .querySelectorAll('[data-audio-lang]')
        .forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      const wasPlaying = !audio.paused;
      audio.src = btn.dataset.audioLang!;
      if (seek) seek.value = '0';
      if (wasPlaying) audio.play().catch(() => {});
    });
  });
}

/* ---------- Mots qui s'allument au défilement ---------- */
function initWords() {
  const blocks = [...document.querySelectorAll<HTMLElement>('[data-words]')];
  if (!blocks.length) return;
  const all = blocks.map((b) => [...b.querySelectorAll<HTMLElement>('.w')]);
  if (reduceMotion) {
    all.flat().forEach((w) => w.classList.add('is-lit'));
    return;
  }
  let ticking = false;
  const update = () => {
    const vh = window.innerHeight;
    blocks.forEach((block, i) => {
      const r = block.getBoundingClientRect();
      // 0 quand le bloc entre par le bas (à 85 % de l'écran), 1 quand il atteint 35 %.
      const progress = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.5)));
      const lit = Math.round(progress * all[i].length * 1.15);
      all[i].forEach((w, k) => w.classList.toggle('is-lit', k < lit));
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

/* ---------- Panneaux qui défilent à l'horizontale ---------- */
function initPanels() {
  const section = document.querySelector<HTMLElement>('[data-panels]');
  const track = section?.querySelector<HTMLElement>('[data-panels-track]');
  const bar = section?.querySelector<HTMLElement>('[data-panels-bar]');
  if (!section || !track || reduceMotion) return;
  let ticking = false;
  const update = () => {
    const r = section.getBoundingClientRect();
    const total = section.offsetHeight - window.innerHeight;
    const progress = Math.min(1, Math.max(0, -r.top / total));
    const max = track.scrollWidth - window.innerWidth;
    track.style.transform = `translate3d(${(-progress * max).toFixed(1)}px, 0, 0)`;
    bar?.style.setProperty('--p', `${(progress * 100).toFixed(1)}%`);
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
  window.addEventListener('resize', update);
  update();
}

/* ---------- Cartes qui se retournent (au toucher sur mobile) ---------- */
function initFlip() {
  document.querySelectorAll<HTMLButtonElement>('[data-flip]').forEach((card) => {
    card.addEventListener('click', () => {
      card.setAttribute('aria-pressed', String(card.getAttribute('aria-pressed') !== 'true'));
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

/* ---------- Curseur d'inactivité ---------- */
function initIdleCursor() {
  const el = document.querySelector<HTMLElement>('[data-idle-cursor]');
  if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const IDLE = 3000;
  let timer = 0;
  const onMove = (e: PointerEvent) => {
    el.classList.remove('is-visible');
    // Les rayons se posent juste au-dessus à droite de la flèche de la souris.
    el.style.setProperty('--x', `${e.clientX + 6}px`);
    el.style.setProperty('--y', `${e.clientY - 40}px`);
    window.clearTimeout(timer);
    timer = window.setTimeout(() => el.classList.add('is-visible'), IDLE);
  };
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerdown', () => el.classList.remove('is-visible'));
  document.addEventListener('mouseleave', () => {
    window.clearTimeout(timer);
    el.classList.remove('is-visible');
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
initCarousel();
initMenu();
initReel();
initFilmPage();
initAudio();
initWords();
initPanels();
initFlip();
initVimeoThumbs();
initDialogs();
initIdleCursor();
initFormStatus();
