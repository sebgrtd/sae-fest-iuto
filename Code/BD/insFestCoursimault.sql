-- Table USER

INSERT INTO FAQ (question, reponse) VALUES
    ('Quand aura lieu le festival ?', "Le festival aura lieu le 30 juillet 2024."),
    ('Où aura lieu le festival ?', "Le festival aura lieu à Nantes."),
    ('Quelles sont les horaires de chaque jour du festival ?', "Le festival aura lieu de 18h à 23h."),
    ('Y a-t-il un camping sur place ?', "Oui, un camping sera disponible à proximité du site du festival pour offrir aux festivaliers une expérience pratique et agréable."),
    ('Les enfants sont-ils admis ?', "Le festival est ouvert à tous les âges. Cependant, veuillez noter que certaines zones ou activités peuvent être réservées aux personnes de plus de 18 ans."),
    ('Peut-on acheter des billets sur place ?', "Il est fortement recommandé d'acheter vos billets à l'avance. Cependant, selon la disponibilité, des billets pourraient être vendus à l'entrée du festival."),
    ('Y aura-t-il une restauration sur place ?', "Oui, il y aura une variété de stands de restauration offrant une large sélection de plats pour satisfaire tous les goûts et régimes alimentaires."),
    ('Les animaux de compagnie sont-ils autorisés ?', "Malheureusement, les animaux de compagnie ne seront pas autorisés à l'intérieur du festival pour des raisons de sécurité et de confort de tous les participants."),
    ("Est-il possible d'y accéder en transports en commun ?", "Oui, le site du festival est facilement accessible en transport en commun. Des navettes spéciales pourront également être mises en place pour faciliter les déplacements."),
    ('Est-il possible de sortir et de revenir une fois entré dans le festival ?', "Oui, les festivaliers pourront sortir et entrer à nouveau dans le festival en présentant leur bracelet d'entrée valide."),
    ('Quels sont les moyens de paiement acceptés ?', "Les paiements en espèces et par carte bancaire seront acceptés sur le site du festival."),
    ('Est-il possible de payer avec des espèces sur place ?', "Oui, des points de vente acceptant les espèces seront disponibles sur le site du festival. Cependant, nous encourageons également l'utilisation de cartes de débit ou de crédit pour plus de commodité."),
    ('Comment puis-je me porter volontaire pour travailler au festival ?', "Nous sommes toujours à la recherche de bénévoles enthousiastes pour rejoindre notre équipe. Veuillez consulter la section 'Bénévolat' sur notre site web pour plus d'informations sur la manière de postuler."),
    ('Y a-t-il des parkings disponibles près du site du festival ?', "Oui, plusieurs parkings seront disponibles aux alentours du parc des expositions de la Beaujoire pour les véhicules des festivaliers."),
    ("Les billets sont-ils remboursables en cas d'annulation ?", "Les billets ne sont généralement pas remboursables. Cependant, veuillez consulter nos politiques d'annulation pour toute information spécifique sur les remboursements."),
    ('Proposez-vous des activités pour les personnes à mobilité réduite ?', "Oui, nous nous efforçons de rendre le festival accessible à tous. Des installations spéciales seront mises en place pour garantir une expérience agréable aux personnes à mobilité réduite.");

INSERT INTO USER (pseudoUser, mdpUser, emailUser, statutUser) VALUES
    ('admin', 'admin', '', 'admin'),
    ('irvyncsm', 'abc', 'irvyncsm@gmail.com', 'user');

-- Insérer des données dans la table FESTIVAL
INSERT INTO FESTIVAL (nomF, villeF, dateDebutF, dateFinF) VALUES
    ('Festival 1', 'Ville 1', '2024-08-01', '2024-08-05'),
    ('Festival 2', 'Ville 2', '2024-07-15', '2024-07-20'),
    ('Festival 3', 'Ville 3', '2024-08-01', '2024-08-03');

-- Insérer des données dans la table LIEU
INSERT INTO LIEU (idF, nomL, adresseL, jaugeL) VALUES
    (1, 'Lieu 1', 'Adresse Lieu 1', 1000),
    (1, 'Lieu 2', 'Adresse Lieu 2', 1500),
    (1, 'Lieu 3', 'Adresse Lieu 3', 500),

    (2, 'Lieu 1', 'Adresse Lieu 1', 1000),
    (2, 'Lieu 2', 'Adresse Lieu 2', 1500),
    (2, 'Lieu 3', 'Adresse Lieu 3', 500);

-- Insérer des données dans la table HEBERGEMENT
INSERT INTO HEBERGEMENT (nomH, limitePlacesH, adresseH) VALUES
    ('Hébergement 1', 100, 'Adresse Hébergement 1'),
    ('Hébergement 2', 200, 'Adresse Hébergement 2'),
    ('Hébergement 3', 500, 'Adresse Hébergement 3');

-- Insérer des données dans la table GROUPE
INSERT INTO GROUPE (idH, nomG, descriptionG) VALUES
    (1, 'Saturn Citizen', 'Saturn Citizen est un groupe de rap français originaire de La Réunion et basé à Lyon, composé de Bushi et Mussy.
    Créé durant les années de collège de ces deux derniers, le groupe a fait partie intégrante du collectif Lyonzon de 2018 à 2023. 
    Il a également intégré le troisième membre Azur de 2018 à 2020 qui avait déjà collaboré avec Bushi en 2016 sous le nom Cool Kids pour un projet éponyme.'),

    (1, 'Opium', "Opium est un label américain et une agence de création fondée par le rappeur et chanteur américain Playboi Carti. Le label compte actuellement parmi ses membres Carti, les rappeurs américains Ken Carson et Destroy Lonely, ainsi que le duo de hip-hop Homixide Gang.
    Musicalement, le collectif Opium partageait un son similaire, avec des synthés sombres, grinçants et avant-gardistes mélangés à un beat rageur rappelant l'ère du punk rock des années 70 et 80. 
    Ce son expérimental s'éloignait du genre hip-hop trap actuel et s'était attiré les faveurs d'un groupe culte."),


    (1, 'New Wave', 'La Fève, Khali, J9ueve, Sonbest, 99 ou encore DMS : tous composent cette scène avant-gardiste du rap français souvent surnommée « nouvelle vague ». Mais ici, pas question de faire du cinéma : avec une spontanéité criante, ces jeunes rappeurs construisent une musique propre à leur inspirations personnelles, 
    et bâtissent ensemble une dynamique artistique pleine d’expérimentations précieuses pour le rap français.'),

-- Insérer des données dans la table MEMBRE_GROUPE
INSERT INTO MEMBRE_GROUPE (idG, nomMG, prenomMG, nomDeSceneMG, descriptionA) VALUES
    (1, 'Bushi', 'Bushi', 'Bushi', 'BUSHI, jeune rappeur de Lyon, fait énormément parler de lui ces derniers temps par rapport à ses diverses apparitions aux quatre coins du monde ainsi que sa productivité et 
    sa communication qui font tourner beaucoup de mystère autour de ce personnage.L’artiste peut paraître des plus underground. Egotrip monstre, placements particuliers, ces éléments font sa force. Il se démarque par sa prestance, 
    sa nonchalance et ses placements sortis de nulle part. Un vrai rappeur US en somme.'),


    (1, 'Mussy', 'Mussy', 'Mussy', "Mussy est un rappeur français d'origine Tutsi (Rwanda) ayant grandi à La Réunion. Il est membre du groupe Saturn Citizen et du collectif Lyonzon. Le rappeur crée Saturn Citizen avec son ami Bushi durant ses années de collège et rejoint Lyonzon en 2017. Cependant, il reste très discret et c'est réellement lors du “Freestyle Arah #3” que Mussy officialise son appartenance et signe son grand retour au sein des deux groupes, 
    avant de s'envoler à Lyon (69). L'artiste dévoile en 2020 son premier projet en solo, intitulé Jig."),

    (2, 'Playboi', 'Jordan', 'Playboi Carti', "Jordan Terrell Carter, plus connu sous le nom de Playboi Carti, est un rappeur, chanteur et compositeur américain. Il est né le 13 septembre 1996 à Atlanta, en Géorgie. 
    Reconnu pour son style musical expérimental, passant volontiers de sonorités douces et vaporeuses à des ambiances trash et gothiques, il se démarque aussi par la rareté de ses apparitions médiatiques."),

    (2, 'Ken', 'Ken', 'Ken Carson', 'Kenyatta Lee Frazier Jr. (né le 11 avril 2000), connu professionnellement sous le nom de Ken Carson est un rappeur, auteur-compositeur et producteur de disques américain. Il est connu pour son album studio X qui a culminé au numéro 115 du Billboard 2003.
    Son style de musique est appelée de la Rage Music ou Opium Music en réference avec le label du meme nom dans lequel il est signé. Son style est comparable a des artistes tel que Destroy Lonely, Yeat, Playboi Carti, le groupe Homixide Gang , ou encore Lancey Foux.'),
        
    (2, 'Destroy', 'Destroy', 'Destroy Lonely', "Bobby Wardell Sandimanie, connu professionnellement sous le nom de Destroy Lonely, est un rappeur et auteur-compositeur-interprète américain. Son premier album studio, If Looks Could Kill (2023), a débuté à la 18e place du Billboard 200 américain. Auparavant, sa cinquième mixtape, 
        No Stylist (2022), a marqué sa première entrée dans le classement en se classant à la 91e place."),

    (2, 'Homixide', 'Homixide', 'Homixide Gang', "Tous deux âgés de 22 ans, Homixide Meechie et Homixide Beno forme le duo Homixide Gang. Avec leur premier EP Snotty World, les deux rappeurs originaires d’Atlanta se font rapidement remarquer en 2021 avec le titre SSN. Un succès qui leur permet de passer à la vitesse supérieure en signant avec Opium, le label de Playboi Carti. S’en suit un premier album Homixide Lifestyle, puis SNOT OR NOT, leur deuxième opus fraichement dévoilé en avril dernier. Directement classé dans le top 10 des nouveaux albums sur Spotify après la sortie, 
    Homixide Beno et Homixide Meechie continuent leur ascension, prouvant qu’avec de la persévérance, rien n’est impossible !"),

    (3, 'La Fève', 'La Fève', 'La Fève', "La Fève, de son vrai nom Louis Ambroise Germain1, est un rappeur et producteur français.
Il est un membre du mouvement musical new wave du hip-hop français. Sa musique est jugée innovante, utilisant une sélection éclectique de flows, productions et refrains."),


    (3, 'Khali', 'Khali', 'Khali', "Khali, né à Lyon le 20 novembre 1999 et de son vrai nom Khalil Lakbir, est un rappeur, producteur et chanteur franco-marocain. Il fait partie du mouvement musical new wave du hip-hop français."),

    (3, 'J9ueve', 'J9ueve', 'J9ueve', "J9ueve, de son vrai nom Jules Vincent est un rappeur et producteur français. Il est un membre clé du mouvement New Wave au sein du rap français.
     l'instar de nombreux rappeurs du mouvement New Wave, J9ueve se fait connaître via la plateforme Soundcloud, dès 2019. Il est réputé pour son style mélancolique, ses ambiances romantiques, sa voix atypique et sa musicalité novatrice. Il est signé chez le label ALSO/A+LSO3"),

    (3, 'DMS', 'DMS', 'DMS', "DMS est un rappeur français originaire des Hauts-de-Seine (92). Affilié au studio 99 à ses débuts, il créé en 2021 le label Ciel.
De 2019 à 2021, il travaille sur son premier projet Rideaux bleus, qu'il sort en décembre de cette dernière année. Sept mois plus tard, il dévoile l'EP YEYEYE, comprenant des collaborations avec EDGE et Malo.
En mars 2023, il dévoile son deuxième projet, VAGALAME, où J9ueve, Khali et Rounhaa y sont présents.");







    -- (1, 'Vlad', 'Cauchemar', 'Vladimir Cauchemar', 'Description pour Vladimir Cauchemar'),
    -- (2, 'Booba', 'Elie', 'Booba', 'Description pour Booba'),
    -- (3, 'Freeze', 'Hugo', 'Freeze Corleone', 'Description pour Freeze Corleone'),
    -- (4, 'Damso', 'William', 'Damso', 'Description pour Damso'),
    -- (5, 'Ashe', 'Achille', 'Ashe 22', 'Description pour Ashe 22'),
    -- (6, 'Heuss', 'Karim', "Heuss l'Enfoiré", 'Description pour Heuss lEnfoiré'),
    -- (7, 'Zola', 'Evans', 'Zola', 'Description pour Zola'),
    -- (8, 'Sch', 'Julien', 'Sch', 'Description pour Sch'),
    -- (9, 'H', 'Hugo', 'H Jeunecrack', 'Description pour H Jeunecrack'),
    -- (10, 'Luther', 'Luther', 'Luther', 'Description pour Luther');

-- Insérer des données dans la table INSTRUMENT
INSERT INTO INSTRUMENT (idMG, nomI) VALUES
    (1, 'DJ'),
    (2, 'Chanteur'),
    (3, 'Chanteur'),
    (4, 'Chanteur'),
    (5, 'Chanteur'),
    (6, 'Chanteur'),
    (7, 'Chanteur'),
    (8, 'Chanteur'),
    (9, 'Chanteur'),
    (10, 'Chanteur');

-- Insérer des données dans la table LIEN_VIDEO
INSERT INTO LIEN_VIDEO (idG, video) VALUES
    (1, 'Video 1'),
    (1, 'Video 2'),
    (2, 'Video 1'),
    (3, 'Video 1'),
    (3, 'Video 2'),
    (3, 'Video 3'),
    (4, 'Video 1'),
    (5, 'Video 1'),
    (6, 'Video 1'),
    (7, 'Video 1'),
    (8, 'Video 1'),
    (9, 'Video 1'),
    (10, 'Video 1');

-- Insérer des données dans la table LIEN_RESEAUX_SOCIAUX
INSERT INTO LIEN_RESEAUX_SOCIAUX (idG, reseau) VALUES
    (1, 'https://www.youtube.com/channel/UCQxeWQ_K8aQ0KOXMDi03H5Q'),
    (1, 'https://www.instagram.com/saturnciti/'),
    (1, 'https://open.spotify.com/intl-fr/artist/7siKy5Wrq7TwvyJ21KushJ'),
    (2, 'Réseau 1'),
    (3, 'Réseau 1'),
    (3, 'Réseau 2'),
    (3, 'Réseau 3'),

-- Insérer des données dans la table SPECTATEUR
INSERT INTO SPECTATEUR (nomS, prenomS, idUser) VALUES
    ('Spectateur 1', 'Prénom 1', 2),
    ('Spectateur 2', 'Prénom 2', 2),
    ('Spectateur 3', 'Prénom 3', 2),
    ('Spectateur 4', 'Prénom 4', 2),
    ('Spectateur 5', 'Prénom 5', 2);

-- Insérer des données dans la table STYLE_MUSICAL
INSERT INTO STYLE_MUSICAL (nomSt) VALUES
    ('Style 1'),
    ('Style 2'),
    ('Style 3');


-- Insérer des données dans la table EVENEMENT
INSERT INTO EVENEMENT (idG, nomE, heureDebutE, heureFinE, dateDebutE, dateFinE) VALUES
    (1, 'Concert Groupe 1', '9:00:00', '10:00:00', '2024-07-21', '2024-07-21'),
    (2, 'Concert Groupe 2', '13:00:00', '14:00:00', '2024-07-21', '2024-07-21'),
    (3, 'Concert Groupe 3', '17:00:00', '18:00:00', '2024-07-21', '2024-07-21'),
    (4, 'Concert Groupe 4', '9:00:00', '10:00:00', '2024-07-22', '2024-07-22'),
    (5, 'Concert Groupe 5', '13:00:00', '14:00:00', '2024-07-22', '2024-07-22'),
    (6, 'Concert Groupe 6', '17:00:00', '18:00:00', '2024-07-22', '2024-07-22'),
    (7, 'Concert Groupe 7', '8:00:00', '9:00:00', '2024-07-23', '2024-07-23'),
    (8, 'Concert Groupe 8', '11:00:00', '12:00:00', '2024-07-23', '2024-07-23'),
    (9, 'Concert Groupe 9', '14:00:00', '15:00:00', '2024-07-23', '2024-07-23'),
    (10, 'Concert Groupe 10', '17:00:00', '18:00:00', '2024-07-23', '2024-07-23');

INSERT INTO TYPE_BILLET(duree) VALUES
    (1),
    (2),
    (3);

-- Insérer des données dans la table CONCERT
INSERT INTO CONCERT (idE, tempsMontage, tempsDemontage) VALUES
    (1, '01:00:00', '01:00:00'),
    (2, '01:00:00', '01:00:00'),
    (3, '01:00:00', '01:00:00'),
    (4, '01:00:00', '01:00:00'),
    (5, '01:00:00', '01:00:00'),
    (6, '01:00:00', '01:00:00'),
    (7, '01:00:00', '01:00:00'),
    (8, '01:00:00', '01:00:00'),
    (9, '01:00:00', '01:00:00'),
    (10, '01:00:00', '01:00:00');

INSERT INTO GROUPE_STYLE (idG, idSt) VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 1),
    (5, 2),
    (6, 3),
    (7, 1),
    (8, 2),
    (9, 3),
    (10, 1);

-- Insérer des données dans la table PROGRAMMER
INSERT INTO PROGRAMMER (idF, idG, idH, dateArrivee, heureArrivee, dateDepart, heureDepart) VALUES
    (1, 1, 1, '2024-08-06', '08:00:00', '2024-08-07', '16:00:00');

-- test des triggers

-- Impossible d'acheter un billet pour un événement qui a déjà eu lieu
INSERT INTO BILLET (idF, idType, idS, prix, dateAchat, dateDebutB, dateFinB) VALUES
    (1, 1, 1, 50, '2024-10-01', '2024-07-21', '2024-07-21');

-- La durée du billet est trop grande par rapport à celle du festival
INSERT INTO BILLET (idF, idType, idS, prix, dateAchat, dateDebutB, dateFinB) VALUES
    (3, 1, 1, 50, '2024-08-01', '2024-08-01', '2024-08-06');

-- Le groupe ne peut pas arriver avant le début du festival
INSERT INTO PROGRAMMER (idF, idG, idH, dateArrivee, heureArrivee, dateDepart, heureDepart) VALUES
    (1, 1, 1, '2024-05-06', '08:00:00', '2024-05-07', '16:00:00');

-- Le groupe ne peut pas arriver après la fin du festival
INSERT INTO PROGRAMMER (idF, idG, idH, dateArrivee, heureArrivee, dateDepart, heureDepart) VALUES
    (1, 1, 1, '2024-10-06', '08:00:00', '2024-10-07', '16:00:00');
