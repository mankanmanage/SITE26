// Informations publiques de l'agence. Source : brief du site (Drive, 30/09/2026).
// Ne publier ici que des informations confirmées.

export const site = {
  name: 'Mankan Communication',
  url: 'https://mankancommunication.com',
  email: 'team@mankancommunication.com',
  phone: '+223 77 09 14 09',
  phoneHref: '+22377091409',
  // Adresse précise à confirmer avant publication.
  locality: 'ACI 2000, Bamako',
  country: 'Mali',
  signature: 'Bɛ ka ye, bɛ ka fɔ',
  signatureTranslation: 'Tout le monde voit, puis en parle.',
  // Vidéo de fond de la page d'accueil : identifiant Vimeo (ex. "123456789").
  // Laisser vide tant que la vidéo n'est pas en ligne.
  heroVimeoId: '',
  // URL officielles uniquement. Ne pas deviner les comptes.
  social: [] as { label: string; url: string }[],
};

export const nav = [
  { label: 'Accueil', href: '/' },
  { label: 'Projets', href: '/projets/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

export const expertises = [
  {
    title: 'Stratégie de marque',
    text: 'Positionnement, plateforme de marque et accompagnement dans la durée.',
  },
  {
    title: 'Direction artistique & identité visuelle',
    text: 'Logos, chartes graphiques et univers visuels qui appartiennent à votre marque.',
  },
  {
    title: 'Contenus créatifs & narration',
    text: 'Films, photos et récits ancrés dans nos codes culturels.',
  },
  {
    title: 'Digital & réseaux sociaux',
    text: 'Lignes éditoriales, formats et présence en ligne pensés pour vos publics.',
  },
  {
    title: 'Conseil & projets spéciaux',
    text: 'Événements, campagnes d’intérêt général et projets sur mesure.',
  },
];
