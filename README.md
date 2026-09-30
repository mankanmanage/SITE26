# Site Mankan Communication

Site statique (Astro) de **mankancommunication.com**, construit sur la maquette « V3 — Lotumn » :
Accueil, Films (index + une page par film), À propos, Contact.
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
| Coordonnées, réseaux, équipe, clients, expertises, manifeste audio | `src/data/site.ts` |
| Films (titres, textes, images, identifiants Vimeo, extraits de l'accueil) | `src/data/films.ts` |
| Textes des pages | `src/pages/*.astro` |
| Couleurs, polices, animations | `src/styles/global.css`, `src/scripts/site.ts` |
| Destinataire du formulaire | `public/contact.php` |
| Redirections, HTTPS, cache | `public/.htaccess` |

**Vidéos :** hébergées sur Vimeo. Pour relier un film, coller l'identifiant (les chiffres de
`vimeo.com/123456789`) dans le champ `vimeoId`. La miniature Vimeo sert de couverture tant
qu'aucune image `cover` n'est fournie. Pour l'extrait muet en boucle de l'accueil, déposer un MP4
court (5–10 s, sans son, ~2–4 Mo) dans `public/videos/` et le renseigner dans `preview`.

## Mise en ligne sur LWS

1. `npm run build`
2. Envoyer **tout le contenu** de `dist/` (y compris `.htaccess` et `contact.php`) dans le dossier
   `www/` de l'hébergement, via le gestionnaire de fichiers LWS ou un client FTP.
3. Tester : les 4 pages, l'ouverture des projets, l'envoi du formulaire (vérifier la réception
   sur la boîte `team@`), HTTPS.

Avant la première mise en ligne : sauvegarder l'ancien site et sa base de données.

## En attente

- Licence web de la police Costa Mala (fichier repris de la maquette)
- Liens Vimeo des films, extraits MP4 pour l'accueil, images en haute définition
- Correspondance des photos restantes avec leurs films, titres et descriptions manquants
- Portraits de l'équipe, fichiers audio du manifeste (bamanankan / français)
- Informations des mentions légales
