# FEST'IUTO

FEST'IUTO est une application web dynamique d'un site  festival, il s'agit d'un festival fictif et fut un projet d'entrainement à la conception d'une BD répondant aux exigences. Développée avec React pour le front-end et Flask pour le back-end, FESTI'UTO simplifie la programmation des festivals, la vente de billets, s'adressant aussi bien aux spectateurs, avec une attention particulière à l'expérience utilisateur qu'à l'association organisatrice, en fournissant un ensemble complet d'outils coté serveur pour la gestion du festival.

## Fonctionnalités

### Pour les internautes:

- Planning : Parcourez l'intégralité du programme du festival par jour, artiste et genres musicaux.
- Achat de billets : Achetez différents types de billets (pass journalier, pass de deux jours, accès complet au festival, etc.) de façon fluide.
- Profils d'artistes : Découvrez des informations détaillées sur chaque groupe comprenant des descriptions, des photos, des liens vers les réseaux sociaux, des vidéos, les membres du groupe et les styles musicaux et les évènement annexes auquel il font part.
- Gestion des favoris : Les participants peuvent enregistrer leurs artistes préférés et commencer à planifier leur propre programme de festival, tout en étant avertit de la possiblité de consulter tel artiste à tel par rapport à ceux déjà ajoutées.

### Pour les administrateurs:


- Activités annexes : Gérez et affichez les activités secondaires des artistes comme les interviews, showcases, etc., et décidez si celles-ci doivent être ajoutées au programme public.
- Ajout d'artistes : Ajoutez les performeurs à votre festival, renseignez leurs infos principales ainsi que leur date de début et de fin, style musical, instruments... avec lune gestion d'erreur pour les créneaux réalisable.


## Installation

Pour exécuter FEST'IUTO sur votre machine locale, veuillez suivre ces étapes : 

1. Assurez-vous d'avoir Python et npm installé sur votre système.
2. Clonez le dépôt 2 fois, une fois coté client, et une fois coté serveur :

https://github.com/sebgrtd/sae-fest-iuto
https://github.com/sebgrtd/sae-fest-iuto/tree/server
git clone 

3. Configurez un environnement virtuel et installez les paquets Python requis sur le dossier cloné serveur :

python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt


4. Exécutez le serveur backend Flask :
cd Code/appli
flask run -p 8080

>Vous pouvez dès lors consultez le portail administrateur, néanmoins si vous voulez lier le coté client au coté serveur continuer :


5. Dans un autre onglet dans le dossier coté client executez :

npm install

6. Démarrez le serveur de développement React :

npm run dev

