# Frontend Application

## Description
Cette application est le frontend d'une solution complète de gestion et d'analyse des données de vente. Elle est construite avec Vue.js 3 et Vite, et utilise plusieurs bibliothèques pour les graphiques, le style et l'expérience utilisateur.

---

## Prérequis
Assurez-vous d'avoir les outils suivants installés sur votre machine :

- **Node.js** (version 18 ou supérieure)
- **npm** (livré avec Node.js)

Pour vérifier si Node.js et npm sont installés :
```bash
node -v
npm -v
```

---

## Installation
Clonez le projet et installez les dépendances :

```bash

cd frontend
npm install
```

---

## Démarrage du serveur de développement
Pour lancer le projet en mode développement :

```bash
npm run dev
```
Le serveur sera disponible à l'adresse suivante : [http://localhost:5173](http://localhost:5173)

---

## Scripts Disponibles
Voici les scripts principaux définis dans le fichier `package.json` :

- **`npm run dev`** : Lance le serveur de développement.
- **`npm run build`** : Génère une version optimisée pour la production.
- **`npm run preview`** : Prévisualise la version de production générée.

---

## Structure du Projet

```
frontend/
├── src/
│   ├── assets/
│   │   └── styles/
│   │       ├── dashboard.css
│   │       └── main.css
│   ├── components/
│   │   └── ProductList.vue
│   ├── services/
│   │   └── salesDataService.js
│   ├── views/
│   │   └── Dashboard.vue
│   ├── App.vue
│   └── main.js
├── package.json
└── vite.config.js
```

- **`assets/`** : Contient les fichiers CSS et autres ressources statiques.
- **`components/`** : Contient les composants Vue réutilisables.
- **`services/`** : Contient les services pour interagir avec l'API backend.
- **`views/`** : Contient les pages principales de l'application.
- **`App.vue`** : Le composant racine de l'application.
- **`main.js`** : Point d'entrée principal pour initialiser Vue.

---

## Fonctionnalités
### Composants
- **`ProductList.vue`** : Liste des produits avec leurs données.

### Pages
- **`Dashboard.vue`** : Affichage des graphiques et des données d'analyse.

### Services
- **`salesDataService.js`** : Fournit des méthodes pour consommer les API du backend.

---

## Bibliothèques Utilisées
Voici les principales dépendances et leur rôle :

- **Vue.js** : Framework principal pour le frontend.
- **Axios** : Pour les requêtes HTTP.
- **Chart.js & vue-chartjs** : Pour les graphiques interactifs.
- **V-Calendar** : Pour la sélection des dates.
- **Flatpickr** : Autre bibliothèque pour le picker de date.
- **Vue-loading-overlay** : Gestion des états de chargement.

---

## API Utilisées
L'application consomme les endpoints du backend. Voici les principales API :

1. **Ventes par catégorie** :
   - **URL** : `/category-sales`
   - **Paramètres** : `startDate` (date de début), `endDate` (date de fin)
   - **Exemple de réponse** :
     ```json
     [
       {
         "Category": "Electronics",
         "TotalSales": 14311605.24,
         "TotalQuantity": 56412,
         "Percentage": "20.38"
       }
     ]
     ```

2. **Produits tendance** :
   - **URL** : `/trending-products`
   - **Paramètres** : `startDate`, `endDate`
   - **Exemple de réponse** :
     ```json
     [
       {
         "ProductName": "Water Bottle",
         "QuantitySold": 3275,
         "TotalSales": 873162.98
       }
     ]
     ```

---

## Construction pour la Production
Pour générer une version optimisée pour la production :

```bash
npm run build
```

Les fichiers générés seront placés dans le dossier `dist/`. Ces fichiers peuvent être servis par un serveur web (par exemple, Nginx ou Apache).

---

## Déploiement

1. **Construisez l'application** :
   ```bash
   npm run build
   ```

2. **Servez le contenu du dossier `dist/`** avec un serveur comme Nginx, Apache ou un service d'hébergement cloud.

---

## Contribution
Si vous souhaitez contribuer :

1. Forkez le dépôt.
2. Créez une branche pour votre fonctionnalité :
   ```bash
   git checkout -b new-feature
   ```
3. Faites vos modifications et effectuez un commit :
   ```bash
   git commit -m "Add new feature"
   ```
4. Poussez vos modifications :
   ```bash
   git push origin new-feature
   ```
5. Créez une Pull Request.

---

## Auteur
Nom : **Barry Sanoussa**

Email : **barrysanoussa19@gmail.com**

---

