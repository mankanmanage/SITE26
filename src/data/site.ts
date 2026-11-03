// Informations publiques de l'agence (maquette V3 + brief du site).

export const site = {
  name: 'MANKAN Communication',
  url: 'https://mankancommunication.com',
  email: 'team@mankancommunication.com',
  phone: '+223 77 09 14 09',
  phoneHref: '+22377091409',
  /** Ouvre directement la discussion WhatsApp avec ce numéro, message déjà écrit (bouton sur toutes les pages). */
  whatsapp: `https://wa.me/22377091409?text=${encodeURIComponent('Bonjour MANKAN, j’aimerais discuter d’un projet.')}`,
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
  'Hamnia&fils',
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
    text: 'Storytelling, marketing culturel, films et spots, campagnes',
  },
];

export const expertises = [
  { title: 'Storytelling & recherche culturelle', text: 'Nous fouillons les récits, les codes et les mémoires pour trouver l’histoire juste de votre marque.' },
  { title: 'Stratégie de marque & accompagnement', text: 'Positionnement, plateforme de marque et conseil dans la durée.' },
  { title: 'Direction artistique & identité visuelle', text: 'Logos, chartes graphiques et univers visuels qui vous ressemblent.' },
  { title: 'Films, spots & mini-documentaires', text: 'De l’écriture au tournage et au montage, à Bamako et au-delà.' },
  { title: 'Contenus créatifs & narration', text: 'Photos, textes et formats courts pour faire vivre votre histoire.' },
  { title: 'Marketing culturel', text: 'Faire de la culture un levier pour votre marque : des codes, des récits et des gestes qui parlent vraiment à vos publics.' },
  { title: 'Campagnes publicitaires', text: 'Campagnes 360° pensées pour vos publics, du terrain à l’écran.' },
  { title: 'Terrain & lieux de communication', text: 'Activations, événements et présence là où vivent vos publics.' },
  { title: 'Consulting & projets spéciaux', text: 'Conseil stratégique pour les marques, les ONG et les institutions, et projets sur mesure.' },
];

/** Manifeste audio (page À propos). Laisser vide pour masquer la section. */
export const manifestoAudio = {
  bm: '/audio/manifeste-bm.mp3',
  fr: '/audio/manifeste-fr.mp3',
};
