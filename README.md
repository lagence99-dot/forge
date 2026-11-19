# FORGE™ — outil de pilotage de stratégie UX

Application web qui guide un projet UX étape par étape selon la méthode FORGE™
(FOCUS → ORGANIZE → REVEAL → GENERATE → ENGAGE), avec validation de chaque étape,
retour arrière maîtrisé et livrables graphiques exportables en PDF.

## Application Mac (usage local, sans serveur ni compte)

```bash
npm install
npm run package:mac      # → release/FORGE-mac-arm64.zip (Apple Silicon) et FORGE-mac-x64.zip (Intel)
```

Chaque zip contient `FORGE.app`, `Installer FORGE.command` et un LISEZ-MOI. Les projets sont stockés dans
`~/Library/Application Support/FORGE/projets`, la clé API dans `~/Library/Application Support/FORGE/forge-settings.json`.
Pour tester l'application de bureau sans la fabriquer : `npm run desktop`.

## Analyse IA par étape

Chaque étape propose un panneau « Analyse IA » (Claude, API Anthropic) :
- **critères explicites par étape** (ex. Irritants : fréquence, gravité, portée, diversité des sources), chacun noté de 1 à 5 avec un constat chiffré ;
- **preuves** : chaque proposition cite les observations / irritants / personas qui la justifient ; les références inventées sont écartées par le serveur ;
- **niveau de preuve calculé par FORGE** (nombre d'observations et de sources reliées), pas par l'IA ;
- ajout au projet en un clic, rien n'est ajouté sans validation.
Les lentilles (objectif, critères, données envoyées, format de réponse) sont dans `server/ai.mjs` ; l'application des propositions dans `src/ai/apply.ts`.

## Démarrer (mode web / serveur)

```bash
npm install
npm run dev        # API sur :3001 + interface sur http://localhost:5173
```

Production : `npm run build && npm start` (sert l'interface et l'API sur `PORT`, 3001 par défaut).
Les projets sont stockés en JSON dans `data/` (modifiable via `FORGE_DATA_DIR`).

## Ce que fait la V1 « essentielle »

- **Stepper** : 5 phases, 15 étapes clés + 2 briques optionnelles (Service Blueprint, Performance),
  activées selon l'envergure (Essentiel / Grand projet) ou à la carte dans les paramètres.
- **Point de validation** par étape (checklist de sortie, statuts À faire / En cours / En revue / Validée / À revoir).
  Une étape validée est verrouillée ; la rouvrir passe les étapes validées en aval en « À revoir ».
- **Données** : import Excel (.xlsx) / CSV, collage d'interviews, audits de sites → observations reliées à leur source.
- **Traçabilité** : observations → irritants → personas → parcours → fonctionnalités → lots.
- **Livrables graphiques** : tableau des valeurs, benchmark, irritants, affinity map, personas (fiche, grille atelier,
  planche comparative), matrice impact/effort, vision & Value Proposition Canvas, Customer Journey,
  Service Blueprint, KPI, fonctionnalités, allotissement, arborescence + filtres.
- **Synthèses** par phase et **rapport final** ; export PDF A4 paysage en un clic.
- **Invités** : lien d'invitation personnel, commentaires par étape, journal du projet, fusion des modifications concurrentes.

## Architecture

- `src/model/method.ts` — référentiel FORGE (phases, étapes, conseils, checklists, briques).
- `src/model/types.ts` — modèle de données (un projet = un document JSON).
- `src/steps/` — éditeurs de chaque étape.
- `src/visuals/` — livrables graphiques (slides A4) et registre des livrables.
- `src/styles.css` — **toutes les couleurs/typos passent par les variables `:root`** : le design final s'applique ici.
- `server/index.mjs` — API Express (accès par jeton d'invitation, pas encore de comptes).

## Limites connues / prochaines étapes

- Pas d'authentification par compte : l'accès repose sur le lien d'invitation (jeton). Droits différenciés à venir.
- Fusion des modifications concurrentes au niveau des grandes rubriques du projet (dernier écrit gagne sur une même rubrique).
- Génération des wireframes dans Figma, assistance IA (extraction d'irritants, clustering) et prototype fonctionnel : versions suivantes.
