-- Insérer des données dans la table FESTIVAL
INSERT INTO FESTIVAL (nomF, villeF, dateDebutF, dateFinF) VALUES
    ('Festival 1', 'Ville 1', '2023-08-01', '2023-08-05'),
    ('Festival 2', 'Ville 2', '2023-07-15', '2023-07-20'),
    ('Festival 3', 'Ville 3', '2023-08-01', '2023-08-03');

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
    (1, 'Groupe 1', 'Description Groupe 1'),
    (2, 'Groupe 2', 'Description Groupe 2'),
    (3, 'Groupe 3', 'Description Groupe 3');

-- Insérer des données dans la table MEMBRE_GROUPE
INSERT INTO MEMBRE_GROUPE (idG, nomMG, prenomMG) VALUES
    (1, 'Membre 1', 'Prénom Membre 1'),
    (1, 'Membre 2', 'Prénom Membre 2'),

    (2, 'Membre 1', 'Prénom Membre 1'),

    (3, 'Membre 1', 'Prénom Membre 1'),
    (3, 'Membre 2', 'Prénom Membre 2'),
    (3, 'Membre 3', 'Prénom Membre 3');

-- Insérer des données dans la table INSTRUMENT
INSERT INTO INSTRUMENT (idMG, nomI) VALUES
    (1, 'Instrument 1'),
    (2, 'Instrument 2'),
    (3, 'Instrument 3'),
    (4, 'Instrument 2'),
    (5, 'Instrument 1'),
    (6, 'Instrument 3');

-- Insérer des données dans la table LIEN_VIDEO
INSERT INTO LIEN_VIDEO (idG, video) VALUES
    (1, 'Video 1'),
    (1, 'Video 2'),

    (2, 'Video 1'),

    (3, 'Video 1'),
    (3, 'Video 2'),
    (3, 'Video 3');

-- Insérer des données dans la table LIEN_RESEAUX_SOCIAUX
INSERT INTO LIEN_RESEAUX_SOCIAUX (idG, reseau) VALUES
    (1, 'Réseau 1'),
    (1, 'Réseau 2'),

    (2, 'Réseau 1'),

    (3, 'Réseau 1'),
    (3, 'Réseau 2'),
    (3, 'Réseau 3');

-- Insérer des données dans la table PHOTO
INSERT INTO PHOTO (idG, photo) VALUES
    (1, 'Photo 1'),
    (1, 'Photo 2'),

    (2, 'Photo 1'),

    (3, 'Photo 1'),
    (3, 'Photo 2'),
    (3, 'Photo 3');

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

-- Insérer des données dans la table TYPE_BILLET
INSERT INTO TYPE_BILLET (duree) VALUES
    (3),
    (2);

-- Insérer des données dans la table BILLET
INSERT INTO BILLET (idF, idType, idS, prix, dateAchat) VALUES
    (1, 1, 1, 50, '2023-08-01'),
    (1, 1, 2, 50, '2023-08-02'),
    (2, 2, 3, 75, '2023-07-15'),
    (2, 1, 4, 50, '2023-07-16');

-- Insérer des données dans la table EVENEMENT
INSERT INTO EVENEMENT (nomE, heureDebutE, heureFinE) VALUES
    ('Événement 1', '18:00:00', '23:00:00'),
    ('Événement 2', '16:00:00', '22:00:00');

-- Insérer des données dans la table ACTIVITES_ANNEXES
INSERT INTO ACTIVITES_ANNEXES (typeA, ouvertAuPublic) VALUES
    ('Activité 1', TRUE),
    ('Activité 2', TRUE);

-- Insérer des données dans la table CONCERT
INSERT INTO CONCERT (tempsMontage, tempsDemontage) VALUES
    ('10:00:00', '12:00:00'),
    ('09:00:00', '11:00:00');

-- Insérer des données dans la table PROGRAMMER
INSERT INTO PROGRAMMER (idF, idL, idH, dateArrivee, heureArrivee, dateDepart, heureDepart) VALUES
    (1, 1, 1, '2023-08-06', '08:00:00', '2023-08-07', '16:00:00');




-- test des triggers

-- Impossible d'acheter un billet pour un événement qui a déjà eu lieu
INSERT INTO BILLET (idF, idType, idS, prix, dateAchat) VALUES
    (1, 1, 1, 50, '2023-10-01');

-- La durée du billet est trop grande par rapport à celle du festival
INSERT INTO BILLET (idF, idType, idS, prix, dateAchat) VALUES
    (3, 1, 1, 50, '2023-08-01');

-- Le groupe ne peut pas arriver avant le début du festival
INSERT INTO PROGRAMMER (idF, idL, idH, dateArrivee, heureArrivee, dateDepart, heureDepart) VALUES
    (1, 1, 1, '2023-05-06', '08:00:00', '2023-05-07', '16:00:00');

-- Le groupe ne peut pas arriver après la fin du festival
INSERT INTO PROGRAMMER (idF, idL, idH, dateArrivee, heureArrivee, dateDepart, heureDepart) VALUES
    (1, 1, 1, '2023-10-06', '08:00:00', '2023-10-07', '16:00:00');