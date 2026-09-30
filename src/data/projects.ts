// Portfolio. Pour ajouter un projet : copier un bloc, remplir les champs,
// puis coller l'identifiant Vimeo (les chiffres à la fin du lien vimeo.com/123456789).
// Un champ vide n'est pas affiché. Ne publier aucun résultat chiffré sans source.

export type Category = 'identite' | 'campagnes' | 'films';

export const categories: { id: Category; label: string }[] = [
  { id: 'identite', label: 'Identité' },
  { id: 'campagnes', label: 'Campagnes' },
  { id: 'films', label: 'Photo et vidéo' },
];

export interface Project {
  slug: string;
  title: string;
  client: string;
  category: Category;
  /** Production Mankan (fichiers _INTERNE) ou travail client (_CLIENT). */
  internal: boolean;
  /** Mis en avant sur la page d'accueil (3 projets maximum). */
  featured?: boolean;
  vimeoId?: string;
  /** Image de couverture dans /public/images/projets/ (sinon miniature Vimeo). */
  cover?: string;
  tagline?: string;
  context?: string;
  response?: string;
  deliverables?: string[];
  credits?: string;
}

export const projects: Project[] = [
  {
    slug: 'mankan-22-septembre',
    title: '66 ans. Et toujours à raconter.',
    client: 'Mankan Communication',
    category: 'films',
    internal: true,
    featured: true,
    vimeoId: '',
    tagline: 'Film du 22 septembre',
    context:
      'Film de marque autour de l’indépendance du Mali et de la transmission culturelle.',
    deliverables: ['Concept', 'Écriture', 'Réalisation'],
  },
  {
    slug: 'mobilite-verte',
    title: 'Mobilité Verte',
    client: 'Mobilité Verte',
    category: 'campagnes',
    internal: false,
    featured: true,
    vimeoId: '',
    tagline: 'Lancement',
    context:
      'Communication autour des engins électriques et de leurs usages à Bamako.',
  },
  {
    slug: 'paps-le-frigo',
    title: 'PAP’S — Le Frigo',
    client: 'PAP’S',
    category: 'campagnes',
    internal: false,
    featured: true,
    vimeoId: '',
  },
  {
    slug: 'paps-ramadan',
    title: 'PAP’S — Ramadan',
    client: 'PAP’S',
    category: 'campagnes',
    internal: false,
    vimeoId: '',
  },
  {
    slug: 'leila',
    title: 'Leila',
    client: 'Leila',
    category: 'films',
    internal: false,
    vimeoId: '',
  },
  {
    slug: 'sanu',
    title: 'Sanu — Édito',
    client: 'Sanu',
    category: 'films',
    internal: false,
    vimeoId: '',
  },
  {
    slug: 'awale',
    title: 'Awalé',
    client: 'Mankan Communication',
    category: 'films',
    internal: true,
    vimeoId: '',
  },
  {
    slug: 'bamako',
    title: 'Bamako',
    client: 'Mankan Communication',
    category: 'films',
    internal: true,
    vimeoId: '',
  },
  {
    slug: 'daibin',
    title: 'Daibin',
    client: 'Mankan Communication',
    category: 'films',
    internal: true,
    vimeoId: '',
  },
];

export const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
