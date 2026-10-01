// Informations publiques de l'agence (maquette V3 + brief du site).

export const site = {
  name: 'MANKAN Communication',
  url: 'https://mankancommunication.com',
  email: 'team@mankancommunication.com',
  phone: '+223 77 09 14 09',
  phoneHref: '+22377091409',
  address: 'Hamdallaye ACI 2000, Bamako',
  country: 'Mali',
  signature: 'bɛ ka ye, bɛ ka fɔ',
  social: [
    { label: 'Instagram', url: 'https://www.instagram.com/mankancomm' },
    { label: 'TikTok', url: 'https://www.tiktok.com/@mankancommunication' },
    { label: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61577939252211' },
  ],
};

// Défile sur l'accueil (« Ils nous font confiance »).
export const clients = [
  'AGM',
  'Matrix',
  'Mobilité Verte',
  'Sanu',
  'HAMINA1FILS',
  'Afrisends',
  'Sitilog',
  'BEC Group',
  'B Concepte',
];

export const verbs = [
  {
    n: '01',
    bm: 'bɛ ka ye',
    fr: 'Rendre visible',
    text: 'Stratégie de marque, branding, identité visuelle, direction artistique',
  },
  {
    n: '02',
    bm: 'bɛ ka fɔ',
    fr: 'Faire entendre',
    text: 'Storytelling, films et spots, campagnes 360°, réseaux sociaux',
  },
];

export const expertises = [
  { title: 'Storytelling & recherche culturelle', text: 'Nous fouillons les récits, les codes et les mémoires pour trouver l’histoire juste de votre marque.' },
  { title: 'Stratégie de marque & accompagnement', text: 'Positionnement, plateforme de marque et conseil dans la durée.' },
  { title: 'Direction artistique & identité visuelle', text: 'Logos, chartes graphiques et univers visuels qui vous ressemblent.' },
  { title: 'Films, spots & mini-documentaires', text: 'De l’écriture au tournage et au montage, à Bamako et au-delà.' },
  { title: 'Contenus créatifs & narration', text: 'Photos, textes et formats courts pour faire vivre votre histoire.' },
  { title: 'Communication digitale & réseaux sociaux', text: 'Lignes éditoriales, calendriers et animation de vos communautés.' },
  { title: 'Campagnes publicitaires', text: 'Campagnes 360° pensées pour vos publics, du terrain au digital.' },
  { title: 'Terrain & lieux de communication', text: 'Activations, événements et présence là où vivent vos publics.' },
  { title: 'Conseil & projets spéciaux', text: 'ONG, institutions et projets sur mesure.' },
];

/** Manifeste audio (page À propos). Laisser vide pour masquer la section. */
export const manifestoAudio = {
  bm: '/audio/manifeste-bm.mp3',
  fr: '/audio/manifeste-fr.mp3',
};
