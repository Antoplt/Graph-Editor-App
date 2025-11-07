# Graph Editor - Éditeur de Graphiques

Ce projet implémente une application complète d'édition de graphiques en React, permettant de créer et visualiser des données sous différentes formes de graphiques. L'objectif principal est de fournir une interface intuitive pour manipuler des données tabulaires et générer automatiquement des visualisations interactives.

L'application développée permet de créer, éditer et visualiser des données sous forme de graphiques 2D avec une interface divisée en deux panneaux redimensionnables. Elle offre une expérience utilisateur fluide pour la création rapide de visualisations professionnelles.

---

## 🚀 Fonctionnalités

L'application d'édition de graphiques implémente les fonctionnalités suivantes :

* **Table de Données Dynamique :** Interface tabulaire permettant de :
    * Éditer les valeurs des cellules en temps réel
    * Ajouter/supprimer des lignes et colonnes dynamiquement
    * Renommer les en-têtes de colonnes (séries de données)
    * Manipulation fluide
* **Configuration des Graphiques :** Panneau de configuration permettant de personnaliser :
    * Titre du graphique
    * Label de l'axe X
    * Label de l'axe Y
* **Types de Graphiques :** Barre d'outils avec 5 types de visualisations :
    * Graphique en Ligne (Line Chart)
    * Graphique à Barres (Bar Chart)
    * Graphique à Barres Empilées (Stacked Bar Chart)
    * Graphique en Aire (Area Chart)
    * Graphique Circulaire (Pie Chart)
* **Panneaux Redimensionnables :** Interface divisée en deux sections ajustables :
    * Panneau gauche pour la table de données
    * Panneau droit pour la visualisation du graphique
    * Barre de redimensionnement centrale permettant d'ajuster la largeur des panneaux
* **Exportation PNG :** Bouton dédié pour exporter le graphique généré en image PNG
* **Synchronisation Automatique :** Les modifications de données ou de configuration sont immédiatement reflétées dans la visualisation
* **Responsive Design :** Interface adaptative maintenant sa structure à différents niveaux de zoom

---

## 🎨 Architecture de l'Application

L'application utilise une architecture basée sur des composants React modulaires :

* **App.tsx :** Composant principal orchestrant l'ensemble de l'application. Gère l'état global (données, configuration, type de graphique) et coordonne les interactions entre les différents composants.
* **DataTable :** Composant gérant la table éditable avec gestion locale de l'état d'édition des colonnes pour éviter les pertes de focus.
* **ChartDisplay :** Composant de rendu des graphiques utilisant la librairie Recharts pour générer les visualisations selon le type sélectionné.
* **ChartTypeSelector :** Barre d'outils horizontale permettant la sélection du type de graphique avec icônes illustratives.
* **ConfigPanel :** Panneau de configuration des paramètres du graphique (titre et labels des axes).

La bibliothèque **re-resizable** est utilisée pour implémenter les panneaux redimensionnables, tandis que **html-to-image** permet l'exportation en PNG.

---

## 📁 Structure du dépôt

```sh
└── Graph-Editor/
    ├── components/
    │   ├── ui/                     # Composants UI de base (shadcn/ui)
    │   │   ├── button.tsx
    │   │   ├── input.tsx
    │   │   └── label.tsx
    │   ├── ChartDisplay.tsx        # Affichage des graphiques
    │   ├── ChartTypeSelector.tsx   # Sélecteur de type de graphique
    │   ├── ConfigPanel.tsx         # Panneau de configuration
    │   └── DataTable.tsx           # Table de données éditable
    ├── styles/
    │   └── globals.css             # Styles globaux
    ├── App.tsx                     # Composant principal
    ├── package.json                # Dépendances et scripts
    ├── README.md                   # Documentation du projet
    └── vite.config.ts              # Configuration vite
```

---

## 🛠️ Technologies Utilisées

* **React 18** - Framework JavaScript pour l'interface utilisateur
* **TypeScript** - Typage statique pour plus de robustesse
* **Recharts** - Bibliothèque de graphiques pour React
* **re-resizable** - Composants redimensionnables
* **html-to-image** - Export d'éléments HTML en PNG
* **Lucide React** - Icônes modernes pour l'interface
* **Tailwind CSS** - Framework CSS utilitaire
* **shadcn/ui** - Composants UI accessibles et personnalisables

---

## 🛠️ Installation et Utilisation

### 1. Installation

1.  **Clonez le dépôt :**
    ```sh
    git clone <repository-url>
    ```
2.  **Accédez au répertoire du projet :**
    ```sh
    cd Graph-Editor
    ```
3.  **Installez les dépendances :**
    ```sh
    npm install
    ```

### 2. Lancement

1.  **Démarrer le serveur de développement :**
    ```sh
    npm run dev
    ```
2.  **Accédez à l'application dans votre navigateur :**
    L'application sera accessible à l'adresse indiquée dans le terminal (par défaut `http://localhost:5173`)

---

## 📖 Guide d'Utilisation

### Édition des Données

1. **Modifier une cellule :** Cliquez sur une cellule de la table et saisissez la nouvelle valeur
2. **Ajouter une ligne :** Cliquez sur le bouton "Add Row" sous la table
3. **Ajouter une colonne :** Cliquez sur le bouton "Add Column" sous la table
4. **Renommer une colonne :** Cliquez sur l'en-tête de colonne, modifiez le nom et appuyez sur Entrée ou cliquez ailleurs
5. **Supprimer une ligne :** Cliquez sur l'icône de corbeille à droite de la ligne
6. **Supprimer une colonne :** Cliquez sur l'icône de corbeille dans l'en-tête de colonne

### Configuration du Graphique

1. Modifiez le titre du graphique dans le champ "Chart Title"
2. Personnalisez les labels des axes X et Y dans les champs correspondants
3. Les modifications sont appliquées en temps réel sur le graphique

### Visualisation

1. **Changer le type de graphique :** Cliquez sur l'un des 5 boutons dans la barre d'outils en bas de l'écran
2. **Redimensionner les panneaux :** Positionnez le curseur sur la barre verticale entre les panneaux, puis glissez-déposez
3. **Exporter le graphique :** Cliquez sur le bouton "Export PNG" pour télécharger une image haute résolution

---

## 🔧 Améliorations Potentielles

* **Import/Export de données** : Prise en charge des formats CSV, JSON et Excel
* **Thèmes personnalisés** : Système de personnalisation des couleurs des graphiques
* **Formules calculées** : Support de formules pour les colonnes dérivées
* **Historique d'annulation** : Implémentation d'un système undo/redo
* **Templates prédéfinis** : Bibliothèque de modèles de graphiques pour différents cas d'usage
* **Export multi-formats** : Support de SVG et PDF en plus du PNG

---

## 🧑‍💻 Auteur

* **Étudiant :** Polette Antonin
* **Cours :** UE Ingénierie des Systèmes Interactifs
* **Professeur :** Cédric Fleury (cedric.fleury@imt-atlantique.fr)
