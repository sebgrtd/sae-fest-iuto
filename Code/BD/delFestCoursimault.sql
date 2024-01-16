-- Suppression des tables
DROP TABLE FAQ;
DROP TABLE IF EXISTS LIEN_VIDEO;
DROP TABLE IF EXISTS LIEN_RESEAUX_SOCIAUX;
DROP TABLE IF EXISTS INSTRUMENT;
DROP TABLE IF EXISTS MEMBRE_GROUPE;
DROP TABLE IF EXISTS GROUPE_STYLE;
DROP TABLE IF EXISTS CONCERT;
DROP TABLE IF EXISTS ACTIVITES_ANNEXES;
DROP TABLE IF EXISTS EVENEMENT;
DROP TABLE IF EXISTS PROGRAMMER;
DROP TABLE IF EXISTS LIEU;
DROP TABLE IF EXISTS BILLET;
DROP TABLE IF EXISTS TYPE_BILLET;
DROP TABLE IF EXISTS SPECTATEUR;
DROP TABLE IF EXISTS FESTIVAL;
DROP TABLE IF EXISTS HEBERGEMENT;
DROP TABLE IF EXISTS USER;
DROP TABLE IF EXISTS ACTIVITE_ANNEXE;
DROP TABLE IF EXISTS LIEN_RESEAUX_SOCIAUX_MEMBRE;
DROP TABLE IF EXISTS MEMBRE_GROUPE;
DROP TABLE IF EXISTS GROUPE;
DROP TABLE IF EXISTS STYLE_MUSICAL;

-- Suppression des triggers
DROP TRIGGER IF EXISTS billetAchetable;
DROP TRIGGER IF EXISTS jaugeLieuDepassee;
DROP TRIGGER IF EXISTS placeDisponibleHebergement;
DROP TRIGGER IF EXISTS dureeTypeBillet;
DROP TRIGGER IF EXISTS dateArriveeHebergement;
DROP TRIGGER IF EXISTS groupeArriveTropTardHebergement;
DROP TRIGGER IF EXISTS lieuDejaUtiliseDurantHoraire;
DROP TRIGGER IF EXISTS verifDisponibiliteGroupe;