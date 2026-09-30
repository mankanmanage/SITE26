# Site Mankan Communication

Site statique (Astro) de **mankancommunication.com** — 4 pages : Accueil, Projets, About, Contact.
Hébergement : LWS (Apache + PHP pour le formulaire).

## Démarrer

```bash
npm install
npm run dev      # aperçu local sur http://localhost:4321
npm run build    # génère le site final dans dist/
```

## Où modifier quoi

| À modifier | Fichier |
|---|---|
| Coordonnées, réseaux sociaux, vidéo de fond de l'accueil | `src/data/site.ts` |
| Expertises | `src/data/site.ts` |
| Projets (titres, textes, identifiants Vimeo, projets mis en avant) | `src/data/projects.ts` |
| Textes des pages | `src/pages/*.astro` |
| Couleurs, polices, animations | `src/styles/global.css`, `src/scripts/motion.ts` |
| Destinataire du formulaire | `public/contact.php` |
| Redirections, HTTPS, cache | `public/.htaccess` |

**Vidéos :** hébergées sur Vimeo. Pour relier un film, coller l'identifiant (les chiffres de
`vimeo.com/123456789`) dans le champ `vimeoId` du projet. La miniature Vimeo sert de couverture
tant qu'aucune image `cover` n'est fournie.

## Mise en ligne sur LWS

1. `npm run build`
2. Envoyer **tout le contenu** de `dist/` (y compris `.htaccess` et `contact.php`) dans le dossier
   `www/` de l'hébergement, via le gestionnaire de fichiers LWS ou un client FTP.
3. Tester : les 4 pages, l'ouverture des projets, l'envoi du formulaire (vérifier la réception
   sur la boîte `team@`), HTTPS.

Avant la première mise en ligne : sauvegarder l'ancien site et sa base de données.

## En attente

- Polices Costa Mala et Amsterdamer-Garamont (WOFF2 + licence web) → `public/fonts/`
- Logo SVG officiel, illustrations et « highlighters » de la charte
- Liens Vimeo des films, portraits et biographies de l'équipe
- Liens officiels des réseaux sociaux, informations des mentions légales
