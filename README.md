# FEST'IUTO

FEST'IUTO est une application web dynamique d'un site  festival, il s'agit d'un festival fictif et fut un projet d'entrainement à la conception d'une BD répondant aux exigences. Développée avec React pour le front-end et Flask pour le back-end, FESTI'UTO simplifie la programmation des festivals, la vente de billets, s'adressant aussi bien aux spectateurs, avec une attention particulière à l'expérience utilisateur qu'à l'association organisatrice, en fournissant un ensemble complet d'outils coté serveur pour la gestion du festival.

## Fonctionnalités

### Pour les internautes:

- Planning : Parcourez l'intégralité du programme du festival par jour, artiste et genres musicaux.
- Achat de billets : Achetez différents types de billets (pass journalier, pass de deux jours, accès complet au festival, etc.) de façon fluide.
- Profils d'artistes : Découvrez des informations détaillées sur chaque groupe comprenant des descriptions, des photos, des liens vers les réseaux sociaux, des vidéos, les membres du groupe et les styles musicaux et les évènement annexes auquel il font part.
- Gestion des favoris : Les participants peuvent enregistrer leurs artistes préférés et commencer à planifier leur propre programme de festival, tout en étant avertit de la possiblité de consulter tel artiste à tel par rapport à ceux déjà ajoutées.
- Consulter vos billets 

### Pour les administrateurs:

- Consultez et modifier les évènements : Gérez et affichez les évènements aussi bien les concerts que ceux secondaires des artistes comme les interviews, showcases, etc., vous pouvez en ajouter au programme public.
- Ajout d'artistes : Ajoutez les performeurs à votre festival, renseignez leurs infos principales ainsi que leur date de début et de fin, style musical, instruments... avec lune gestion d'erreur pour les créneaux réalisable.
- Gestion d'hébergement : Modifier, Supprimez ou ajouter les hébèrgements avec leur nom, la jauge de place (pour toute la durée du concert) et l'adresse associé.
- Gestion des billets : Consultez les billets achetées avec les informations des utilisateurs associées.Vous pouvez également supprimé la commande dans le cas ou un client fait une demande spéciale.
- Gestion des lieux : Ajouter ou modifier les lieux (scène) présent au sein du festival, en indiquand par ailleurs leur jauge.
- Ajout de style musicaux : Ajouter ou supprimer un nouveau genre encore non référencé dans la base de données.
- Ajout d'instrument : Ajouter ou supprimer de nouveaux instruments encore non référencé dans la base de données.
- Consultation des comptes : Consulter les informations des comptes connecté tel que le pseudo, l'adresse mail, le mot de passe, avec possibilité de modification ou de suppression.

# Accéder au site depuis internet

pour acceder au site depuis internet vous pouvez consulter ce lien : [festiuto](https://www.festiuto.sebastien-gratade.fr)

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

