// Projets (films, campagnes…). Chaque projet a sa page : /projets/<slug>/
//
// Vidéos hébergées chez LWS (dossier /videos/ du site) :
//   - `video`   : le film complet, ex. '/videos/daibin-la-natte.mp4'
//   - `preview` : l'extrait muet en boucle de l'accueil, ex. '/videos/daibin-la-natte-extrait.mp4'
// Autre possibilité : `vimeoId` (les chiffres de vimeo.com/123456789). Un champ vide n'est pas affiché.

export type FilmType = 'film' | 'pub' | 'campagne' | 'branding' | 'photo';

export const filmTypes: Record<FilmType, { label: string; plural: string }> = {
  film: { label: 'Film', plural: 'Films' },
  pub: { label: 'Publicité', plural: 'Publicité' },
  campagne: { label: 'Campagne', plural: 'Campagnes' },
  branding: { label: 'Branding', plural: 'Branding' },
  photo: { label: 'Photographie', plural: 'Photo' },
};

export interface Film {
  slug: string;
  /** Nom affiché en capitales (client ou production). */
  client: string;
  /** Titre affiché en italique. */
  title: string;
  type: FilmType;
  /** Production MANKAN (fichiers _INTERNE) ou travail client (_CLIENT). */
  internal: boolean;
  /** Mis en avant dans « Nos récits » sur l'accueil (4 maximum). */
  featured?: boolean;
  cover?: string;
  coverAlt?: string;
  preview?: string;
  video?: string;
  /** Vidéo au format téléphone (9:16) : affichée en priorité sur mobile. */
  vertical?: boolean;
  vimeoId?: string;
  duration?: string;
  tags?: string[];
  description?: string;
  brief?: string;
  response?: string;
  result?: string;
  direction?: string;
  image?: string;
  gallery?: { src: string; alt: string }[];
}

export const films: Film[] = [
  {
    slug: 'paps-soda-le-frigo',
    client: 'Pap’s Soda',
    title: 'Le Frigo',
    type: 'pub',
    internal: false,
    featured: true,
    // À confirmer : image issue de la maquette (spot Pap’s Soda).
    cover: '/images/films/paps-soda.jpg',
    coverAlt: 'Plan du spot Pap’s Soda : homme en tenue jaune devant un étal de citrons',
    vimeoId: '',
    tags: ['Spot', 'Direction artistique', 'Production'],
    description:
      'Pour Pap’s Soda, un spot qui fait pétiller le goût du pays : couleurs de marché, énergie de la rue, fraîcheur à chaque plan.',
  },
  {
    slug: 'daibin-la-natte',
    client: 'Daibin',
    title: 'La natte',
    type: 'film',
    internal: true,
    featured: true,
    cover: '/images/films/daibin-la-natte.jpg',
    coverAlt: 'Plan-titre du film Daibin — La natte',
    vimeoId: '',
    tags: ['Film', 'Narration'],
    description:
      'Un film qui déroule la natte comme on déroule une mémoire : lentement, avec respect.',
  },
  {
    slug: 'mankan-22-septembre',
    client: 'MANKAN',
    title: '66 ans. Et toujours à raconter.',
    type: 'film',
    internal: true,
    featured: true,
    vimeoId: '',
    tags: ['Film de marque', 'Écriture', 'Réalisation'],
    description:
      'Film de marque autour de l’indépendance du Mali et de la transmission culturelle.',
  },
  {
    slug: 'mobilite-verte-lancement',
    client: 'Mobilité Verte',
    title: 'Lancement',
    type: 'campagne',
    internal: false,
    featured: true,
    vimeoId: '',
    tags: ['Campagne'],
    description: 'Communication autour des engins électriques et de leurs usages à Bamako.',
  },
  {
    slug: 'paps-soda-ramadan',
    client: 'Pap’s Soda',
    title: 'Ramadan',
    type: 'pub',
    internal: false,
    vimeoId: '',
  },
  {
    slug: 'leila',
    client: 'Leila',
    title: '[Titre du film]',
    type: 'film',
    internal: false,
    vimeoId: '',
  },
  {
    slug: 'sanu-edito',
    client: 'Sanu',
    title: 'Édito',
    type: 'film',
    internal: false,
    vimeoId: '',
  },
  {
    slug: 'awale',
    client: 'MANKAN',
    title: 'Awalé',
    type: 'film',
    internal: true,
    vimeoId: '',
  },
  {
    slug: 'bamako',
    client: 'MANKAN',
    title: 'Bamako',
    type: 'film',
    internal: true,
    vimeoId: '',
  },
];

export const featuredFilms = films.filter((f) => f.featured).slice(0, 4);

export const usedTypes = (Object.keys(filmTypes) as FilmType[]).filter((t) =>
  films.some((f) => f.type === t),
);

export const pad = (n: number) => String(n).padStart(2, '0');
