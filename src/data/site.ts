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

// `photo` : chemin d'un portrait dans /public/images/equipe/ (facultatif, rien n'est affiché sinon).
export const team = [
  { name: 'Aïssa Sidibé', role: 'Directrice de la stratégie créative & co-gérante', photo: '' },
  { name: 'Assitan Sidibé', role: 'Co-gérante, directrice de la stratégie opérationnelle', photo: '' },
];

export const clients = [
  'AGM',
  'GMS',
  'Matrix',
  'Mobilité Verte',
  'Sanu',
  'Pap’s',
  'Sotraka',
  'Afrisends',
  'Sitilog',
  'BEC Group',
  'B Concepte',
  'FARO',
  'The Brunch',
];

export const verbs = [
  { n: '01', bm: 'bɛ ka ye', fr: 'Rendre visible', text: 'Branding, identité visuelle, direction artistique' },
  { n: '02', bm: 'bɛ ka fɔ', fr: 'Faire entendre', text: 'Films, spots, mini-docs, réseaux sociaux' },
  { n: '03', bm: 'bɛ ka kɛ', fr: 'Faire advenir', text: 'Stratégie, campagnes 360°, conseil' },
];

export const expertises = [
  'Stratégie de marque & accompagnement',
  'Direction artistique & identité visuelle',
  'Contenus créatifs & narration',
  'Films, spots & mini-documentaires',
  'Communication digitale & réseaux sociaux',
  'Campagnes publicitaires',
  'Terrain & lieux de communication',
  'UX/UI design, web & mobile',
  'Conseil & projets spéciaux',
];

/** Manifeste audio (page À propos). Laisser vide pour masquer la section. */
export const manifestoAudio = {
  bm: '', // ex. '/audio/manifeste-bm.mp3'
  fr: '',
};
