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

INSERT INTO USER (pseudoUser, mdpUser, emailUser, statutUser)
VALUES
    ('irvyncsm', 'abc', 'irvyncsm@gmail.com', 'user'),
    ('admin', 'admin', '', 'admin');

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
    (1, 'Vladimir Cauchemar', 'Desc'),
    (1, 'Booba', 'Desc'),
    (1, 'Freeze Corleone', 'Desc'),
    (2, 'Damso', 'Desc'),
    (2, 'Ashe 22', 'Desc'),
    (2, "Heuss l'Enfoiré", 'Desc'),
    (3, 'Zola', 'Desc'),
    (3, 'Sch', 'Desc'),
    (3, 'H Jeunecrack', 'Desc'),
    (3, 'Luther', 'Desc');
    

-- Insérer des données dans la table MEMBRE_GROUPE
INSERT INTO MEMBRE_GROUPE (idG, nomMG, prenomMG, nomDeSceneMG) VALUES
    (1, 'Vlad', 'Cauchemar', 'Vladimir Cauchemar'),
    (2, 'Booba', 'Elie', 'Booba'),
    (3, 'Freeze', 'Hugo', 'Freeze Corleone'),
    (4, 'Damso', 'William', 'Damso'),
    (5, 'Ashe', 'Achille', 'Ashe 22'),
    (6, 'Heuss', 'Karim', "Heuss l'Enfoiré"),
    (7, 'Zola', 'Evans', 'Zola'),
    (8, 'Sch', 'Julien', 'Sch'),
    (9, 'H', 'Hugo', 'H Jeunecrack'),
    (10, 'Luther', 'Luther', 'Luther');

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
    (1, 'Réseau 1'),
    (1, 'Réseau 2'),
    (2, 'Réseau 1'),
    (3, 'Réseau 1'),
    (3, 'Réseau 2'),
    (3, 'Réseau 3'),
    (4, 'Réseau 1'),
    (5, 'Réseau 1'),
    (6, 'Réseau 1'),
    (7, 'Réseau 1'),
    (8, 'Réseau 1'),
    (9, 'Réseau 1'),
    (10, 'Réseau 1');

-- Insérer des données dans la table SPECTATEUR
INSERT INTO SPECTATEUR (nomS, prenomS, adresseS, emailS, mdpS) VALUES
    ('Spectateur 1', 'Prénom 1', 'Adresse 1', 'email1@example.com', 'mdp1'),
    ('Spectateur 2', 'Prénom 2', 'Adresse 2', 'email2@example.com', 'mdp2'),
    ('Spectateur 3', 'Prénom 3', 'Adresse 3', 'email3@example.com', 'mdp3'),
    ('Spectateur 4', 'Prénom 4', 'Adresse 4', 'email4@example.com', 'mdp4'),
    ('Spectateur 5', 'Prénom 5', 'Adresse 5', 'email5@example.com', 'mdp5');

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
