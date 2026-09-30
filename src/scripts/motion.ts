// Interactions et animations du site.
// Tout reste utilisable sans JavaScript ; les animations respectent
// la préférence système « réduire les animations ».

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Apparition au défilement */
function initReveal() {
  const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
  );
  items.forEach((el) => io.observe(el));
}

/* En-tête : se masque en descendant, réapparaît en remontant */
function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  let lastY = window.scrollY;
  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 10);
    const menuOpen = document.querySelector('[data-menu].is-open');
    header.classList.toggle('is-hidden', !menuOpen && y > 200 && y > lastY);
    lastY = y;
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true },
  );
  update();
}

/* Menu mobile */
function initMenu() {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  if (!toggle || !menu) return;
  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  toggle.addEventListener('click', () => setOpen(!menu.classList.contains('is-open')));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
}

/* Lecteur Vimeo */
function vimeoSrc(id: string, opts: Record<string, string> = {}) {
  const params = new URLSearchParams({ dnt: '1', color: '8E1717', title: '0', byline: '0', ...opts });
  return `https://player.vimeo.com/video/${id}?${params}`;
}

/* Fenêtres (détail projet, mentions légales) */
function initDialogs() {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const opener = target.closest<HTMLElement>('[data-open-dialog]');
    if (opener) {
      const dialog = document.getElementById(opener.dataset.openDialog!) as HTMLDialogElement | null;
      if (dialog) {
        e.preventDefault();
        openDialog(dialog);
      }
      return;
    }
    if (target.closest('[data-close-dialog]')) {
      target.closest('dialog')?.close();
      return;
    }
    // Clic sur le fond : fermer
    if (target instanceof HTMLDialogElement) target.close();
  });

  document.querySelectorAll('dialog').forEach((dialog) => {
    dialog.addEventListener('close', () => {
      // Arrête la vidéo en retirant le lecteur
      dialog.querySelectorAll<HTMLElement>('[data-vimeo-player]').forEach((slot) => {
        slot.innerHTML = '';
      });
      if (dialog.dataset.hash && location.hash === `#${dialog.dataset.hash}`) {
        history.replaceState(null, '', location.pathname + location.search);
      }
    });
  });

  // Ouverture directe via l'adresse (ex. /projets/#mobilite-verte)
  const openFromHash = () => {
    const hash = location.hash.slice(1);
    if (!hash) return;
    const dialog = document.querySelector<HTMLDialogElement>(`dialog[data-hash="${CSS.escape(hash)}"]`);
    if (dialog && !dialog.open) openDialog(dialog);
  };
  openFromHash();
  window.addEventListener('hashchange', openFromHash);
}

function openDialog(dialog: HTMLDialogElement) {
  dialog.querySelectorAll<HTMLElement>('[data-vimeo-player]').forEach((slot) => {
    const id = slot.dataset.vimeoPlayer;
    if (!id) return;
    const iframe = document.createElement('iframe');
    iframe.src = vimeoSrc(id);
    iframe.title = slot.dataset.title ?? 'Vidéo';
    iframe.allow = 'autoplay; fullscreen; picture-in-picture';
    iframe.allowFullscreen = true;
    slot.append(iframe);
  });
  dialog.showModal();
  if (dialog.dataset.hash) history.replaceState(null, '', `#${dialog.dataset.hash}`);
}

/* Miniatures Vimeo pour les projets sans image de couverture */
function initVimeoThumbs() {
  document.querySelectorAll<HTMLImageElement>('img[data-vimeo-thumb]').forEach(async (img) => {
    const id = img.dataset.vimeoThumb;
    if (!id) return;
    try {
      const res = await fetch(
        `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(`https://vimeo.com/${id}`)}&width=1280`,
      );
      if (!res.ok) return;
      const data = await res.json();
      if (data.thumbnail_url) {
        img.src = data.thumbnail_url;
        img.hidden = false;
        img.closest('.card')?.classList.add('has-thumb');
      }
    } catch {
      /* la couverture graphique reste affichée */
    }
  });
}

/* Vidéo de fond de l'accueil : seulement sur grand écran, sans économie de données */
function initHeroVideo() {
  const slot = document.querySelector<HTMLElement>('[data-hero-video]');
  const id = slot?.dataset.heroVideo;
  if (!slot || !id || reduceMotion) return;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (conn?.saveData || window.innerWidth < 768) return;
  const iframe = document.createElement('iframe');
  iframe.src = vimeoSrc(id, { background: '1', muted: '1', autoplay: '1', loop: '1' });
  iframe.title = 'Showreel Mankan Communication';
  iframe.allow = 'autoplay; fullscreen';
  iframe.tabIndex = -1;
  iframe.setAttribute('aria-hidden', 'true');
  iframe.addEventListener('load', () => slot.classList.add('is-playing'), { once: true });
  slot.append(iframe);
}

/* Filtres de la page Projets */
function initFilters() {
  const bar = document.querySelector<HTMLElement>('[data-filters]');
  if (!bar) return;
  const cards = document.querySelectorAll<HTMLElement>('[data-category]');
  bar.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-filter]');
    if (!btn) return;
    const filter = btn.dataset.filter!;
    bar.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    cards.forEach((card) => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.hidden = !show;
      if (show && !reduceMotion) {
        card.classList.remove('is-visible');
        requestAnimationFrame(() => card.classList.add('is-visible'));
      }
    });
  });
}

/* Confirmation du formulaire de contact (retour de contact.php) */
function initFormStatus() {
  const params = new URLSearchParams(location.search);
  const status = params.get('envoye') ? 'ok' : params.get('erreur') ? 'erreur' : null;
  if (!status) return;
  const el = document.querySelector<HTMLElement>(`[data-form-status="${status}"]`);
  if (el) {
    el.hidden = false;
    el.focus();
  }
}

initReveal();
initHeader();
initMenu();
initDialogs();
initVimeoThumbs();
initHeroVideo();
initFilters();
initFormStatus();
