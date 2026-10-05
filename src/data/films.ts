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

// L'ordre ci-dessous est l'ordre d'affichage (accueil, carrousel, page Projets) :
// projets clients d'abord, puis productions internes.
export const films: Film[] = [
  {
    slug: 'paps-soda-le-frigo',
    client: 'Pap’s Soda',
    title: 'Le Frigo',
    type: 'pub',
    internal: false,
    featured: true,
    cover: '/images/films/paps-soda-le-frigo.jpg',
    video: '/videos/paps-soda-le-frigo.mp4',
    preview: '/videos/paps-soda-le-frigo-extrait.mp4',
    tags: ['Spot', 'Direction artistique', 'Production'],
    description:
      'Pour Pap’s Soda, un spot qui fait pétiller le goût du pays : couleurs de marché, énergie de la rue, fraîcheur à chaque plan.',
  },
  {
    slug: 'sanu-edito',
    client: 'SÀNU',
    title: 'Vidéo éditoriale',
    type: 'film',
    internal: false,
    featured: true,
    cover: '/images/films/sanu-edito.jpg',
    video: '/videos/sanu-edito.mp4',
    preview: '/videos/sanu-edito-extrait.mp4',
    tags: ['Film éditorial', 'Direction artistique'],
    description:
      'Un voyage sensoriel dans l’univers de SÀNU, où l’encens raconte une culture autant qu’une senteur. Gestes, matières et fumée révèlent les savoir-faire qui font vivre cet héritage.',
    brief: 'Traduire l’univers de la marque en images et mettre en lumière sa dimension culturelle.',
    response:
      'Une approche poétique et sensorielle, attentive aux mains, aux matières et aux rituels qui entourent l’encens.',
  },
  {
    slug: 'leila',
    client: 'Leila',
    title: 'Film artistique pour un vernissage',
    type: 'film',
    internal: false,
    vertical: true,
    cover: '/images/films/leila.jpg',
    video: '/videos/leila.mp4',
    preview: '/videos/leila-extrait.mp4',
    tags: ['Film artistique', 'Éducation'],
    description:
      'Une vidéo artistique autour de la scolarisation des filles, conçue pour accompagner le vernissage de Leila. Un prolongement de son propos, qui invite à réfléchir à la place de l’éducation dans la vie et l’avenir des jeunes filles.',
    brief:
      'Accompagner le vernissage avec une création audiovisuelle en résonance avec le thème de la scolarisation des filles.',
    response:
      'Aborder le sujet par une écriture sensible et artistique, pour ouvrir la réflexion et nourrir le dialogue avec le public.',
  },
  {
    slug: 'mobilite-verte-lancement',
    client: 'Mobilité Verte',
    title: 'Lancement',
    type: 'campagne',
    internal: false,
    featured: true,
    cover: '/images/films/mobilite-verte-lancement.jpg',
    video: '/videos/mobilite-verte-lancement.mp4',
    preview: '/videos/mobilite-verte-lancement-extrait.mp4',
    tags: ['Campagne'],
    description: 'Communication autour des engins électriques et de leurs usages à Bamako.',
  },
  {
    slug: 'paps-soda-ramadan',
    client: 'Pap’s Soda',
    title: 'Ramadan',
    type: 'pub',
    internal: false,
    cover: '/images/films/paps-soda-ramadan.jpg',
    video: '/videos/paps-soda-ramadan.mp4',
    preview: '/videos/paps-soda-ramadan-extrait.mp4',
  },
  {
    slug: 'mankan-22-septembre',
    client: 'MANKAN',
    title: '66 ans. Et toujours à raconter.',
    type: 'film',
    internal: true,
    featured: true,
    cover: '/images/films/mankan-22-septembre.jpg',
    video: '/videos/mankan-22-septembre.mp4',
    preview: '/videos/mankan-22-septembre-extrait.mp4',
    tags: ['Film de marque', 'Écriture', 'Réalisation'],
    description:
      'Film de marque autour de l’indépendance du Mali et de la transmission culturelle.',
  },
  {
    slug: 'mankan-campagne-decembre',
    client: 'MANKAN',
    title: 'Campagne de décembre — Lancement',
    type: 'campagne',
    internal: true,
    vertical: true,
    cover: '/images/films/mankan-campagne-decembre.jpg',
    video: '/videos/mankan-campagne-decembre.mp4',
    preview: '/videos/mankan-campagne-decembre-extrait.mp4',
    tags: ['Campagne', 'Lancement'],
  },
  {
    slug: 'awale',
    client: 'MANKAN',
    title: 'Awalé — L’art de vivre, au quotidien',
    type: 'campagne',
    internal: true,
    cover: '/images/films/awale.jpg',
    video: '/videos/awale.mp4',
    preview: '/videos/awale-extrait.mp4',
    tags: ['Campagne interne', 'Storytelling'],
    description:
      'Le quotidien a ses rituels, ses histoires et ses leçons. Avec Awalé, Mankan porte un regard sur ces scènes familières qui nous apprennent à vivre ensemble et transmettent, presque sans le dire, une manière d’être au monde.',
    brief: 'Créer une campagne interne qui exprime notre regard sur la culture et l’art de vivre.',
    response:
      'Faire des situations du quotidien le point de départ de récits où chaque geste peut révéler une leçon.',
  },
  {
    slug: 'bamako',
    client: 'MANKAN',
    title: 'Bamako — Une ville en mouvement',
    type: 'film',
    internal: true,
    vertical: true,
    cover: '/images/films/bamako.jpg',
    video: '/videos/bamako.mp4',
    preview: '/videos/bamako-extrait.mp4',
    tags: ['Film', 'Storytelling'],
    description:
      'Bamako se raconte dans le bruit, les gestes et les mouvements de ceux qui l’habitent. Un portrait vivant de la ville, porté par cette effervescence collective qui façonne notre identité.',
    brief: 'Donner à ressentir l’énergie de Bamako et ce qui fait sa singularité.',
    response:
      'Composer un récit à partir des rythmes de la rue, des sons et des gestes du quotidien, pour faire de la ville une expérience autant qu’un paysage.',
  },
  {
    slug: 'daibin-la-natte',
    client: 'Daibin',
    title: 'La natte',
    type: 'film',
    internal: true,
    vertical: true,
    cover: '/images/films/daibin-la-natte.jpg',
    coverAlt: 'Vue du dessus : des enfants assis sur une natte rayée',
    video: '/videos/daibin-la-natte.mp4',
    preview: '/videos/daibin-la-natte-extrait.mp4',
    tags: ['Film', 'Narration'],
    description:
      'Un film qui déroule la natte comme on déroule une mémoire : lentement, avec respect.',
  },
];

export const featuredFilms = films.filter((f) => f.featured).slice(0, 4);

export const usedTypes = (Object.keys(filmTypes) as FilmType[]).filter((t) =>
  films.some((f) => f.type === t),
);

export const pad = (n: number) => String(n).padStart(2, '0');
