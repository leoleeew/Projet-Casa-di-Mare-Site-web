# Casa di Mare — Site web

Site vitrine pour la location de vacances Casa di Mare, Palombaggia, Corse du Sud.

---

## Démarrage rapide

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## Remplacer les photos

Toutes les photos sont dans le dossier `public/images/`, organisées par pièce :

| Dossier               | Pièce                         |
|-----------------------|-------------------------------|
| `piscine/`            | La piscine                    |
| `terrasse/`           | Les terrasses                 |
| `exterieur/`          | Extérieurs et jardin          |
| `drone/`              | Vues aériennes drone          |
| `salon/`              | Salon maison principale       |
| `cuisine/`            | Cuisine maison principale     |
| `chambre1/`           | Chambre 1 maison principale   |
| `chambre2/`           | Chambre 2 maison principale   |
| `chambre-parentale/`  | Suite parentale gîte          |
| `dortoir/`            | Dortoir gîte                  |
| `sdb1/`               | Salle de bain maison 1        |
| `sdb2/`               | Salle de bain gîte            |
| `coin-repas/`         | Coin repas extérieur          |

Pour remplacer une photo, copiez le nouveau fichier dans le bon dossier et mettez à jour le nom dans `components/RoomTour.tsx`.

---

## Mettre à jour les informations de contact

Ouvrez `components/Contact.tsx` et modifiez les valeurs `value` et `href` dans le tableau `contacts` :

```typescript
{ value: 'votre@email.com', href: 'mailto:votre@email.com' }
{ value: '+33 6 XX XX XX XX', href: 'tel:+336XXXXXXXX' }
{ value: '@votrecompte', href: 'https://instagram.com/votrecompte' }
```

Pour ajouter un lien WhatsApp, modifiez le `href` du téléphone :
```typescript
href: 'https://wa.me/336XXXXXXXX'
```

---

## Ajouter ou renommer une pièce dans la visite

Ouvrez `components/RoomTour.tsx` et modifiez le tableau `categories`.

Chaque pièce a cette structure :
```typescript
{
  id: 'identifiant-unique',
  name: 'Nom affiché',
  description: 'Description de la pièce...',
  images: [
    '/images/dossier/photo1.jpg',
    '/images/dossier/photo2.jpg',
  ],
  imageAlts: [
    'Description photo 1',
    'Description photo 2',
  ],
}
```

---

## Changer le titre du héro

Dans `app/page.tsx`, modifiez la prop `title` du composant `ScrollExpandMedia` :

```tsx
title="Casa di Mare"         // Version française
// title="A Corsican Summer" // Version anglaise (décommenter pour utiliser)
```

---

## Intégrer Google Maps

Dans `components/Palombaggia.tsx`, remplacez le bloc `div` avec le commentaire `Carte :` par :

```tsx
<iframe
  src="https://www.google.com/maps/embed?pb=..."
  width="100%"
  height="192"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
/>
```

---

## Déployer sur Netlify (gratuit, 3 minutes)

**Méthode 1 — Glisser-déposer :**
1. Lancez `npm run build` dans ce dossier
2. Allez sur [netlify.com](https://netlify.com) et créez un compte
3. Dans le dashboard, glissez le dossier entier du projet
4. Netlify détecte Next.js et déploie automatiquement

**Méthode 2 — Via GitHub (recommandé pour les mises à jour) :**
1. Créez un dépôt sur [github.com](https://github.com)
2. Poussez ce dossier sur GitHub
3. Sur Netlify : "Add new site" > "Import from Git"
4. Chaque modification sur GitHub sera déployée automatiquement

---

## Structure du projet

```
app/
  page.tsx          — Page principale
  layout.tsx        — Mise en page globale, polices
  globals.css       — Styles globaux, couleurs
components/
  ui/
    scroll-expansion-hero.tsx  — Animation héro
  Navigation.tsx    — Barre de navigation flottante
  Introduction.tsx  — Section d'introduction
  Features.tsx      — Barre d'équipements
  RoomTour.tsx      — Visite immersive pièce par pièce
  Palombaggia.tsx   — Section plage et environs
  Contact.tsx       — Informations de contact
  Footer.tsx        — Pied de page
public/
  images/           — Toutes les photos de la propriété
```
