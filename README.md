# Site Mankan Communication

Site statique (Astro) de **mankancommunication.com**, construit sur la maquette « V3 — Lotumn » :
Accueil, Projets (plein écran + une page par projet), À propos, Contact.
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
| Coordonnées, réseaux, clients, verbes, expertises, manifeste audio | `src/data/site.ts` |
| Projets (titres, textes, images, vidéos, extraits de l'accueil) | `src/data/films.ts` |
| Images cliquables « On fait du bruit pour vous » | `src/pages/index.astro` (`manifestoTiles`) |
| Textes des pages | `src/pages/*.astro` |
| Couleurs, polices, animations | `src/styles/global.css`, `src/scripts/site.ts` |
| Destinataire du formulaire | `public/contact.php` |
| Redirections, HTTPS, cache | `public/.htaccess` |

**Vidéos :** hébergées directement chez LWS, dans le dossier `videos/` du site (voir `public/videos/`).
Dans `src/data/films.ts` : `video` pour le film complet (MP4 compressé, ~20–60 Mo) et `preview` pour
l'extrait muet en boucle de l'accueil et de la page Projets (5–10 s, sans son, ~2–4 Mo).
`vimeoId` reste possible si un film est un jour hébergé sur Vimeo.

## Mise en ligne sur LWS

1. `npm run build`
2. Envoyer **tout le contenu** de `dist/` (y compris `.htaccess` et `contact.php`) dans le dossier
   `www/` de l'hébergement, via le gestionnaire de fichiers LWS ou un client FTP.
3. Tester : les 4 pages, l'ouverture des projets, l'envoi du formulaire (vérifier la réception
   sur la boîte `team@`), HTTPS.

Avant la première mise en ligne : sauvegarder l'ancien site et sa base de données.

## En attente

- Licence web de la police Costa Mala (fichier repris de la maquette)
- Vidéos compressées (films + extraits), images en haute définition
- Images et liens des 6 vignettes « On fait du bruit pour vous »
- Illustrations de la maquette Canva en fichiers séparés (panneaux de la page À propos)
- Titres et descriptions manquants des projets
